// axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        refreshToken: refreshToken,
      },
    );

    if (response.data.isSuccess) {
      localStorage.setItem('access_token', response.data.result.accessToken);
      return response.data.result.accessToken;
    } else {
      throw new Error('Token refresh failed');
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    // 토큰 갱신 실패 시 로그아웃 처리
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    throw error;
  }
};

// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/소셜로그인/회원가입/토큰발급 등 인증 엔드포인트에는 Authorization 헤더를 제거합니다.
api.interceptors.request.use((config) => {
  const accessToken = (() => {
    try {
      return localStorage.getItem('access_token');
    } catch {
      return null;
    }
  })();

  const url = config.url || '';
  const isAuthEndpoint =
    url.includes('/auth/social-login') ||
    url.includes('/auth/refresh') ||
    url.includes('/guest-login');

  if (!config.headers) config.headers = {};

  if (accessToken && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

// 응답 인터셉터 추가 - 토큰 만료 시 자동 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 토큰 갱신을 시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
