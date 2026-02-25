import axiosInstance from "./axiosConfig";

export const staffService = {
    getStaffUsers: async () => {
        try {
            const { data } = await axiosInstance.get('/staff')
            return data
        } catch (error) {
            throw error
        }
    },
    getStaffUser: async (userId) => {
        try {
            const { data } = await axiosInstance.get(`/staff/${userId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    addStaffUser: async (staffData) => {
        try {
            const { data } = await axiosInstance.post('/staff/', staffData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return data
        } catch (error) {
            throw error
        }
    },
    updateStaffUser: async (userId, staffData) => {
        try {
            const { data } = await axiosInstance.put(`/staff/${userId}`, staffData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return data
        } catch (error) {
            console.log(error.response.data)
            throw error
        }
    },
    changeStaffActivate: async (userId) => {
        try {
            const { data } = await axiosInstance.get(`/staff/activate/${userId}`)
            return data
        } catch (error) {
            console.log(error.response.data)
            throw error
        }
    },
}