// axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  timeout: 5000, // 요청 제한 시간 설정 (밀리초 단위), 5초
  headers: { 'Content-Type': 'application/json' }, // 공통 헤더 설정
});

export default api;
