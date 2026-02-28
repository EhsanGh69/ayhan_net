import axiosInstance from './axiosConfig';

export const ticketService = {
    addTicketGroup: async (groupData) => {
        try {
            const { data } = await axiosInstance.post('/tickets/groups', groupData)
            return data
        } catch (error) {
            throw error
        }
    },
    addTicket: async (ticketData) => {
        try {
            const { data } = await axiosInstance.post('/tickets', ticketData)
            return data
        } catch (error) {
            throw error
        }
    },
    updateTicket: async (ticketId, ticketData) => {
        try {
            const { data } = await axiosInstance.put(`/tickets/${ticketId}`, ticketData)
            return data
        } catch (error) {
            throw error
        }
    },
    updateTicketGroup: async (groupId, groupData) => {
        try {
            const { data } = await axiosInstance.put(`/tickets/groups/${groupId}`, groupData)
            return data
        } catch (error) {
            throw error
        }
    },
    getTicketGroups: async () => {
        try {
            const { data } = await axiosInstance.get('/tickets/groups')
            return data
        } catch (error) {
            throw error
        }
    },
    getTickets: async () => {
        try {
            const { data } = await axiosInstance.get('/tickets')
            return data
        } catch (error) {
            throw error
        }
    },
    getTicket: async (ticketId) => {
        try {
            const { data } = await axiosInstance.get(`/tickets/${ticketId}`)
            return data
        } catch (error) {
            throw error
        }
    },
    removeTicket: async (ticketId) => {
        try {
            const { data } = await axiosInstance.delete(`/tickets/${ticketId}`)
            return data
        } catch (error) {
            throw error
        }
    },
}