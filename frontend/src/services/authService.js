import axios from 'axios';
import axiosInstance from './axiosConfig';

import { API_URL } from '../configUrl'

export const authService = {
    login: async (credentials) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, credentials)
            return data
        } catch (error) {
            throw error
        }
    },
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token')

            if (refreshToken) {
                await axios.post(`${API_URL}/auth/logout`, {}, {
                    headers: { "Authorization": `Bearer ${refreshToken}` }
                })
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
    },
    getCurrentUser: async () => {
        try {
            const { data } = await axiosInstance.get('/auth/me')
            return data
        } catch (error) {
            throw error
        }
    },
    changePassword: async (oldPassword, newPassword) => {
        try {
            const { data } = await axiosInstance.post('/auth/change-password', {
                old_password: oldPassword,
                new_password: newPassword
            })
            return data
        } catch (error) {
            throw error
        }
    },
    resetPassword: async (userId, password) => {
        try {
            const { data } = await axiosInstance.post(`/admin/reset-password/${userId}`, { password })
            return data
        } catch (error) {
            throw error
        }
    },
    subscriberRegister: async (subsData) => {
        try {
            const { data } = await axios.post(`${API_URL}/subscribers/register`, subsData)
            return data
        } catch (error) {
            console.log(error.response?.data?.detail)
            throw error
        }
    },
}