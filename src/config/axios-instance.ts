import axios from 'axios';

// Axios instance oluştur
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // .env'den baseURL al
    timeout: 10000, // 10 saniye zaman aşımı
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Token ekleme
axiosInstance.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: Hata yönetimi
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error?.response?.data || 'Something went wrong');
    }
);

export default axiosInstance;
