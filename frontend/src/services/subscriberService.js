import axiosInstance from './axiosConfig';

export const subscriberService = {
    checkSubscriberExist: async (subsData) => {
        try {
            const { data } = await axiosInstance.post('/subscribers/exist', subsData)
            return data
        } catch (error) {
            throw error
        }
    },
    addSubscriber: async (subsData) => {
        try {
            const { data } = await axiosInstance.post('/subscribers', subsData)
            return data
        } catch (error) {
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
    searchSubscribers: async (query, field) => {
        try {
            const { data } = await axiosInstance.get('/subscribers/search', {
                params: { query, field }
            })
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
    removeSubscriber: async (subsId) => {
        try {
            const { data } = await axiosInstance.delete(`/subscribers/${subsId}`)
            return data
        } catch (error) {
            throw error
        }
    }
}
