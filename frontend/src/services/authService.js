import axiosInstance from './axiosConfig';

export const authService = {
    login: async (credentials) => {
        try {
            const { data } = await axiosInstance.post('/login/', credentials)
            return data
        } catch (error) {
            throw error
        }
    },
    refreshToken: async (refresh) => {
        try {
            const { data } = await axiosInstance.post('/token/refresh/', { refresh })
            return data
        } catch (error) {
            throw error
        }
    },
    verifyToken: async (token) => {
        try {
            const { data } = await axiosInstance.post('/token/verify/', { token })
            return data
        } catch (error) {
            throw error
        }
    },
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token')

            if (refreshToken) {
                await axiosInstance.post('/logout/', { refresh: refreshToken })
            }

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            delete axiosInstance.defaults.headers.common['Authorization'];

            return { success: true, message: 'با موفقیت خارج شدید' }
        } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_data');
            delete axiosInstance.defaults.headers.common['Authorization'];

            throw error;
        }
    }
}