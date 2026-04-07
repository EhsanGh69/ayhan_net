import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ticketService } from '../services/ticketService'
import { ticketRecordService } from '../services/ticketRecordService'

export const useTicketRecordGroups = (isEnable) => {
    const { 
        data: ticketGroupsList, isLoading: tGroupsListLoading, 
        error: tGroupsListErr, isError: isTGroupsListErr
    } = useQuery({
        queryKey: ['ticketRecordGroups', isEnable],
        queryFn: async () => {
            const data = await ticketService.getTicketGroups()
            return data
        },
        retry: 1,
        enabled: isEnable
    })

    return { ticketGroupsList, tGroupsListLoading, tGroupsListErr, isTGroupsListErr }
}

export const useSubscriberTicketRecords = (subsId) => {
    const { 
        data: subscriberTicketRecords, isLoading: subsTRecordsLoading, 
        error: subsTRecordsErr, isError: isSubsTRecordsErr
    } = useQuery({
        queryKey: ['subscriberTicketRecords', subsId],
        queryFn: async () => {
            const data = await ticketRecordService.getSubscriberTicketRecords(subsId)
            return data
        },
        retry: 1,
        enabled: !!subsId
    })

    return { subscriberTicketRecords, subsTRecordsLoading, subsTRecordsErr, isSubsTRecordsErr }
}

export const useAddTicketRecord = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: addTicketRecord, isPending: addTRecordPending, 
        error: addTRecordErr, isError: isAddTRecordErr 
    } = useMutation({
        mutationFn: async (recordData) => {
            const result = await ticketRecordService.addTicketRecord(recordData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriberTicketRecords'] })
    })

    return { addTicketRecord, addTRecordPending, addTRecordErr, isAddTRecordErr }
}

export const useResponseTicketRecord = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: responseTicketRecord, isPending: responseTRecordPending, 
        error: responseTRecordErr, isError: isResponseTRecordErr 
    } = useMutation({
        mutationFn: async ({ recordId, recordData}) => {
            const result = await ticketRecordService.responseTicketRecord(recordId, recordData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketCartableStaffs', 'ticketRecordsList'] })
    })

    return { responseTicketRecord, responseTRecordPending, responseTRecordErr, isResponseTRecordErr }
}

export const useTicketCartableStaffs = (isRefer) => {
    const { 
        data: ticketCartableStaffs, isLoading: tcStaffsLoading, 
        error: tcStaffsErr, isError: isTcStaffsErr
    } = useQuery({
        queryKey: ['ticketCartableStaffs', isRefer],
        queryFn: async () => {
            const data = await ticketRecordService.getTicketCartableStaffs()
            return data
        },
        retry: 1,
        enabled: !!isRefer
    })

    return { ticketCartableStaffs, tcStaffsLoading, tcStaffsErr, isTcStaffsErr }
}

export const useStaffTicketRecords = (staffId) => {
    const { 
        data: staffTicketRecords, isLoading: staffTRsLoading, 
        error: staffTRsErr, isError: isStaffTRsErr
    } = useQuery({
        queryKey: ['staffTicketRecords', staffId],
        queryFn: async () => {
            const data = await ticketRecordService.getStaffTicketRecords(staffId)
            return data
        },
        retry: 1,
        enabled: !!staffId
    })

    return { staffTicketRecords, staffTRsLoading, staffTRsErr, isStaffTRsErr }
}

export const useTicketsInGroup = (groupId) => {
    const { 
        data: ticketsInGroup, isLoading: tInGroupLoading, 
        error: tInGroupErr, isError: isTInGroupErr
    } = useQuery({
        queryKey: ['ticketsInGroup', groupId],
        queryFn: async () => {
            const data = await ticketRecordService.getTicketsInGroup(groupId)
            return data
        },
        retry: 1,
        enabled: !!groupId
    })

    return { ticketsInGroup, tInGroupLoading, tInGroupErr, isTInGroupErr }
}

export const useTicketRecordsList = () => {
    const { 
        data: ticketRecordsList, isLoading: tRecordsListLoading, 
        error: tRecordsListErr, isError: isTRecordsListErr
    } = useQuery({
        queryKey: ['ticketRecordsList'],
        queryFn: async () => {
            const data = await ticketRecordService.getTicketRecordsList()
            return data
        },
        retry: 1
    })

    return { ticketRecordsList, tRecordsListLoading, tRecordsListErr, isTRecordsListErr }
}

export const useTicketRecordDetail = (recordId) => {
    const { 
        data: ticketRecordDetail, isLoading: tRecordDetailLoading, 
        error: tRecordDetailErr, isError: isTRecordDetailErr
    } = useQuery({
        queryKey: ['ticketRecordDetail', recordId],
        queryFn: async () => {
            const data = await ticketRecordService.getTicketRecordDetail(recordId)
            return data
        },
        retry: 1,
        enabled: !!recordId
    })

    return { ticketRecordDetail, tRecordDetailLoading, tRecordDetailErr, isTRecordDetailErr }
}

export const useChangeTicketRecordActivate = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: changeActivate, isPending: changingActivate, 
        error: changeActivateErr, isError: isChangeActivateErr
    } = useMutation({
        mutationFn: async ({ recordId }) => {
            const result = await ticketRecordService.changeTicketRecordActivate(recordId)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketRecordsList'] })
    })

    return { changeActivate, changingActivate, changeActivateErr, isChangeActivateErr }
}

export const useChangeTicketRecordStaff = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: changeTicketRecordStaff, isPending: changeTRStaffPending, 
        error: changeTRStaffErr, isError: isChangeTRStaffErr 
    } = useMutation({
        mutationFn: async ({ recordId, staffData }) => {
            const result = await ticketRecordService.changeStaffTicketRecord(recordId, staffData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticketRecordDetail'] })
        }
    })

    return { changeTicketRecordStaff, changeTRStaffPending, changeTRStaffErr, isChangeTRStaffErr }
}

export const useCloseTicketRecord = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: closeTicketRecord, error: closeTRecordErr, isError: isCloseTRecordErr 
    } = useMutation({
        mutationFn: async ({ recordId }) => {
            const result = await ticketRecordService.closeTicketRecord(recordId)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ticketRecordsList'] })
    })

    return { closeTicketRecord, closeTRecordErr, isCloseTRecordErr }
}