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
    },
    getStaffUsers: async () => {
        try {
            const { data } = await axiosInstance.get('/users/staff/list/')
            return data.results
        } catch (error) {
            throw error
        }
    },
    addStaffUser: async (staffData) => {
        try {
            const { data } = await axiosInstance.post('/users/staff/create/', staffData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return data
        } catch (error) {
            console.log(error.response.data)
            throw error
        }
    }
}