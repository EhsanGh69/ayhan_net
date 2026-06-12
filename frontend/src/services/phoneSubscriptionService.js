import axiosInstance from "./axiosConfig";

export const phoneSubscriptionService = {
    getUnknownPhoneSubscriptions: async () => {
        try {
            const { data } = await axiosInstance.get('/subscriptions/phone/unknown')
            return data
        } catch (error) {
            throw error
        }
    },
    newApplicantUploadNidImage: async (subsId, nidImage) => {
        try {
            const { data } = await axiosInstance.post(
                `/subscriptions/phone/new-applicant/${subsId}`, nidImage,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            return data
        } catch (error) {
            throw error
        }
    },
    changePhoneSubscriptionStatus: async (subsId, subsData) => {
        try {
            const { data } = await axiosInstance.post(
                `/subscriptions/phone/change-status/${subsId}`, subsData
            )
            return data
        } catch (error) {
            throw error
        }
    },
    changeTechAction: async (subsId, techData) => {
        try {
            const { data } = await axiosInstance.put(
                `/subscriptions/phone/change-tech/action/${subsId}`, techData
            )
            return data
        } catch (error) {
            throw error
        }
    },
    changeTechList: async () => {
        try {
            const { data } = await axiosInstance.get('/subscriptions/phone/change-tech/list')
            return data
        } catch (error) {
            throw error
        }
    },
    newApplicantList: async () => {
        try {
            const { data } = await axiosInstance.get('/subscriptions/phone/new-applicant/list')
            return data
        } catch (error) {
            throw error
        }
    },
    newApplicantDownloadNidImage: async (subscriberId) => {
        try {
            const response = await axiosInstance.get(
                `/subscriptions/phone/new-applicant/nid-image/${subscriberId}`,
                { responseType: 'blob'}
            )
            return response
        } catch (error) {
            throw error
        }
    },
    newApplicantAction: async (subsId, applicantData) => {
        try {
            const { data } = await axiosInstance.put(
                `/subscriptions/phone/new-applicant/action/${subsId}`, applicantData
            )
            return data
        } catch (error) {
            throw error
        }
    },
    waitingEstablishList: async () => {
        try {
            const { data } = await axiosInstance.get('/subscriptions/phone/waiting-establish/list')
            return data
        } catch (error) {
            throw error
        }
    },
}