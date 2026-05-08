import axios from "axios";

// Railway 서버 URL을 환경 변수 등에서 관리하는 것이 좋으나, 초기 설정을 위해 상수로 둡니다.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://vibe-trail-server.railway.app";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Firebase Auth 토큰 등을 주입하기 위한 인터셉터 설정 (추후 구현)
apiClient.interceptors.request.use(
  async (config) => {
    // const token = await getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
