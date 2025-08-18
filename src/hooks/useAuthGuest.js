import api from '@/apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function useAuthGuest() {
  const navigate = useNavigate();

  const handleGuest = async () => {
    try {
      const res = await api.post('/auth/guest-login');
      if (res.data.isSuccess) {
        localStorage.setItem('access_token', res.data.result.accessToken);
        localStorage.setItem('refresh_token', res.data.result.refreshToken);
        const redirectPath =
          sessionStorage.getItem('post_login_redirect') || '/';
        sessionStorage.removeItem('post_login_redirect');
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleGuest };
}
