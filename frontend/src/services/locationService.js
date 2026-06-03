import axiosInstance from './axiosConfig';

export const locationService = {
    createProvince: async (province) => {
        try {
            const { data } = await axiosInstance.post('/location/province', province)
            return data
        } catch (error) {
            throw error
        }
    },
    createCity: async (city) => {
        try {
            const { data } = await axiosInstance.post('/location/city', city)
            return data
        } catch (error) {
            throw error
        }
    },
    createArea: async (area) => {
        try {
            const { data } = await axiosInstance.post('/location/area', area)
            return data
        } catch (error) {
            throw error
        }
    },
    getProvinces: async () => {
        try {
            const { data } = await axiosInstance.get('/location/provinces')
            return data
        } catch (error) {
            throw error
        }
    },
    getProvinceCities: async (provinceId) => {
        try {
            const { data } = await axiosInstance.get(`/location/provinces/${provinceId}/cities`)
            return data
        } catch (error) {
            throw error
        }
    },
    getCityAreas: async (cityId) => {
        try {
            const { data } = await axiosInstance.get(`/location/cities/${cityId}/areas`)
            return data
        } catch (error) {
            throw error
        }
    }
}