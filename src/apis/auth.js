import api from '@/apis/axiosInstance';

export async function exchangeNaverCode({ code, state }) {
  return api.get(`/auth/social-login/naver?code=${code}&state=${state}`);
}
