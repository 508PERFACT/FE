import { useCallback } from 'react';

function generateState(length = 16) {
  const byteLength = Math.ceil((length * 3) / 4);
  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  const base64Url = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  return base64Url.slice(0, length);
}

export function useAuthNaver() {
  return useCallback(() => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI;

    const state = generateState(16);
    sessionStorage.setItem('naver_oauth_state', state);

    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}`;

    window.location.href = naverURL;
  }, []);
}

export { generateState };
