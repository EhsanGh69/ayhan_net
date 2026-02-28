import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ticketService } from '../services/ticketService'

export const useTicketsList = () => {
    const { 
        data: ticketsList, isLoading: ticketsListLoading, error: ticketsListErr, isError: isTicketsListErr
    } = useQuery({
        queryKey: ['ticketsList'],
        queryFn: async () => {
            const data = await ticketService.getTickets()
            return data
        },
        retry: 1
    })

    return { ticketsList, ticketsListLoading, ticketsListErr, isTicketsListErr }
}

export const useTicketGroupsList = () => {
    const { 
        data: ticketGroupsList, isLoading: tGroupsListLoading, 
        error: tGroupsListErr, isError: isTGroupsListErr
    } = useQuery({
        queryKey: ['ticketGroupsList'],
        queryFn: async () => {
            const data = await ticketService.getTicketGroups()
            return data
        },
        retry: 1
    })

    return { ticketGroupsList, tGroupsListLoading, tGroupsListErr, isTGroupsListErr }
}

export const useTicket = (ticketId) => {
    const { 
        data: ticketDetail, isLoading: ticketDetailLoading, 
        error: ticketDetailErr, isError: isTicketDetailErr
    } = useQuery({
        queryKey: ['ticketDetail', ticketId],
        queryFn: async () => {
            const data = await ticketService.getTicket(ticketId)
            return data
        },
        retry: 1,
        enabled: !!ticketId
    })

    return { ticketDetail, ticketDetailLoading, ticketDetailErr, isTicketDetailErr }
}

export const useAddTicket = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: addTicket, isPending: addTicketPending, 
        error: addTicketError, isError: isAddTicketError 
    } = useMutation({
        mutationFn: async (ticketData) => {
            const result = await ticketService.addTicket(ticketData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticketsList'] })
            navigate('/tickets')
        }
    })

    return { addTicket, addTicketPending, addTicketError, isAddTicketError }
}

export const useAddTicketGroup = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: addTicketGroup, isPending: addTGroupPending, 
        error: addTGroupError, isError: isAddTGroupError 
    } = useMutation({
        mutationFn: async (groupData) => {
            const result = await ticketService.addTicketGroup(groupData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketGroupsList'] })
    })

    return { addTicketGroup, addTGroupPending, addTGroupError, isAddTGroupError }
}

export const useEditTicket = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: editTicket, isPending: editTicketPending, 
        error: editTicketError, isError: isEditTicketError 
    } = useMutation({
        mutationFn: async ({ticketId, ticketData}) => {
            const result = await ticketService.updateTicket(ticketId, ticketData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticketsList'] })
            navigate('/tickets')
        }
    })

    return { editTicket, editTicketPending, editTicketError, isEditTicketError }
}

export const useEditTicketGroup = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: editTicketGroup, isPending: editTGroupPending, 
        error: editTGroupError, isError: isEditTGroupError 
    } = useMutation({
        mutationFn: async ({groupId, groupData}) => {
            const result = await ticketService.updateTicketGroup(groupId, groupData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketGroupsList'] })
    })

    return { editTicketGroup, editTGroupPending, editTGroupError, isEditTGroupError }
}

export const useRemoveTicket = () => {
    const queryClient = useQueryClient()
    const { 
        mutateAsync: removeTicket, isPending: removeTicketPending,
        error: removeTicketError, isError: isRemoveTicketError 
    } = useMutation({
        mutationFn: async ({ ticketId }) => {
            const result = await ticketService.removeTicket(ticketId)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketsList'] })
        
    })

    return { removeTicket, removeTicketPending, removeTicketError, isRemoveTicketError }
}