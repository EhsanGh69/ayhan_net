import axiosInstance from './axiosConfig';

export const ticketRecordService = {
    addTicketRecord: async (recordData) => {
        try {
            const { data } = await axiosInstance.post('/ticket-records', recordData)
            return data
        } catch (error) {
            console.log(error.response?.data?.detail)
            throw error
        }
    },
    responseTicketRecord: async (recordId, recordData) => {
        try {
            const { data } = await axiosInstance.post(`/ticket-records/response/${recordId}`, recordData)
            return data
        } catch (error) {
            throw error
        }
    },
    getTicketCartableStaffs: async () => {
        try {
            const { data } = await axiosInstance.get('/ticket-records/staffs')
            return data
        } catch (error) {
            throw error
        }
    },
    getStaffTicketRecords: async (staffId) => {
        try {
            const { data } = await axiosInstance.get(`/ticket-records/staffs/${staffId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    changeStaffTicketRecord: async (recordId, staffData) => {
        try {
            const { data } = await axiosInstance.patch(`/ticket-records/staffs/change/${recordId}`, staffData)
            return data
        } catch (error) {
            throw error
        }
    },
    getTicketsInGroup: async (groupId) => {
        try {
            const { data } = await axiosInstance.get(`/ticket-records/groups/${groupId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    getTicketRecordsList: async () => {
        try {
            const { data } = await axiosInstance.get('/ticket-records')
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    getTicketRecordDetail: async (recordId) => {
        try {
            const { data } = await axiosInstance.get(`/ticket-records/${recordId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    removeTicketRecord: async (recordId) => {
        try {
            const { data } = await axiosInstance.delete(`/ticket-records/${recordId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    getSubscriberTicketRecords: async (subsId) => {
        try {
            const { data } = await axiosInstance.get(`/ticket-records/subscribers/${subsId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    closeTicketRecord: async (recordId) => {
        try {
            const { data } = await axiosInstance.get(`/ticket-records/close/${recordId}`)
            return data
        } catch (error) {
            throw error
        }
    }
} 