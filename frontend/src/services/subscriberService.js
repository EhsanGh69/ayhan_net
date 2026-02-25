import axiosInstance from './axiosConfig';

export const subscriberService = {
    addSubscriber: async (subsData) => {
        try {
            const { data } = await axiosInstance.post('/subscribers', subsData)
            return data
        } catch (error) {
            console.log(error.response.data)
            throw error
        }
    },
    updateSubscriber: async (subsId, subsData) => {
        try {
            const { data } = await axiosInstance.put(`/subscribers/${subsId}`, subsData)
            return data
        } catch (error) {
            throw error
        }
    },
    getSubscribers: async () => {
        try {
            const { data } = await axiosInstance.get('/subscribers')
            return data
        } catch (error) {
            throw error
        }
    },
    getSubscriber: async (subsId) => {
        try {
            const { data } = await axiosInstance.get(`/subscribers/${subsId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    getProvinces: async () => {
        try {
            const { data } = await axiosInstance.get('/provinces')
            return data
        } catch (error) {
            throw error
        }
    },
    getProvinceCities: async (provinceId) => {
        try {
            const { data } = await axiosInstance.get(`/provinces/${provinceId}`)
            return data
        } catch (error) {
            throw error
        }
    }
}
