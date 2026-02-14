import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error))

axiosInstance.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const isLoginRoute = originalRequest.url.includes('/login/')
    const isRefreshRoute = originalRequest.url.includes('/token/refresh/')

    if(error.response?.status === 401 && !isRefreshRoute && !isLoginRoute) {
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if(!refreshToken) {
                throw new Error('No refresh token')
            }

            const { data } = await axiosInstance.post('/token/refresh/', { refresh: refreshToken })
            localStorage.setItem('access_token', data.access)

            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return axiosInstance(originalRequest)
        } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
})

export default axiosInstance;