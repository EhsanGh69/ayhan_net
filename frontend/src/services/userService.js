import axiosInstance from "./axiosConfig";

export const userService = {
    getCurrentUser: async () => {
        try {
            const { data } = await axiosInstance.get('/auth/me/')
            return data
        } catch (error) {
            throw error
        }
    },
    changePassword: async (oldPassword, newPassword) => {
        try {
            const { data } = await axiosInstance.post('/auth/change-password/', {
                old_password: oldPassword,
                new_password: newPassword
            })
            return data
        } catch (error) {
            throw error
        }
    }
}