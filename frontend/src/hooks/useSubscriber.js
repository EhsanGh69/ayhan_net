import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { subscriberService } from '../services/subscriberService';
import { GlobalContext } from '../context/GlobalContext'

export const useSubscribersList = () => {
    const { 
        data: subscribersList, isLoading: subsListLoading, error: subsListErr, isError: isSubsListErr
    } = useQuery({
        queryKey: ['subscribersList'],
        queryFn: async () => {
            const data = await subscriberService.getSubscribers()
            return data
        },
        retry: 1
    })

    return { subscribersList, subsListLoading, subsListErr, isSubsListErr }
}

export const useSearchSubscriber = (searchParams) => {
    const { field, query } = searchParams || {};
    const { 
        data: searchSubs, isLoading: searchSubsLoading, 
        error: searchSubsErr, isError: isSearchSubsErr
    } = useQuery({
        queryKey: ['subscribersList', query, field],
        queryFn: async () => {
            const data = await subscriberService.getSubscribers(query, field)
            return data
        },
        retry: 1,
        enabled: !!field && !!query
    })

    return { searchSubs, searchSubsLoading, searchSubsErr, isSearchSubsErr }
}

export const useSubscriber = (subsId) => {
    const { setData } = useContext(GlobalContext)
    const { 
        data: subscriberDetail, isLoading: subsDetailLoading, 
        error: subsDetailErr, isError: isSubsDetailErr
    } = useQuery({
        queryKey: ['subscriberDetail', subsId],
        queryFn: async () => {
            setData('provinceId', null)
            const data = await subscriberService.getSubscriber(subsId)
            setData('provinceId', data.province_id)
            return data
        },
        retry: 1,
        enabled: !!subsId
    })

    return { subscriberDetail, subsDetailLoading, subsDetailErr, isSubsDetailErr }
}

export const useRemoveSubscriber = () => {
    const queryClient = useQueryClient()
    const { 
        mutateAsync: removeSubscriber, isPending: removeSubsPending,
        error: removeSubsError, isError: isRemoveSubsError 
    } = useMutation({
        mutationFn: async ({ subsId }) => {
            const result = await subscriberService.removeSubscriber(subsId)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscribersList'] })
        
    })

    return { removeSubscriber, removeSubsError, removeSubsPending, isRemoveSubsError }
}

export const useCheckSubscriberExist = () => {
    const { 
        mutateAsync: checkSubsExist, isError: isCheckSubsExistErr
    } = useMutation({
        mutationFn: async (subsData) => {
            const result = await subscriberService.checkSubscriberExist(subsData)
            return result
        }
    })

    return { checkSubsExist, isCheckSubsExistErr }
}

export const useAddSubscriber = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: addSubscriber, isPending: addSubsPending, 
        error: addSubsError, isError: isAddSubsError 
    } = useMutation({
        mutationFn: async (subsData) => {
            const result = await subscriberService.addSubscriber(subsData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscribersList'] })
    })

    return { addSubscriber, addSubsPending, addSubsError, isAddSubsError }
}

export const useEditSubscriber = () => {
    const queryClient = useQueryClient()

    const { 
        mutateAsync: editSubscriber, isPending: editSubsPending, 
        error: editSubsError, isError: isEditSubsError 
    } = useMutation({
        mutationFn: async ({subsId, subsData}) => {
            const result = await subscriberService.updateSubscriber(subsId, subsData)
            return result
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscribersList'] })
    })

    return { editSubscriber, editSubsPending, editSubsError, isEditSubsError }
}

export const useLocation = () => {
    const { 
        data: provincesList, error: provListErr, isError: isProvListErr
    } = useQuery({
        queryKey: ['provincesList'],
        queryFn: async () => {
            const data = await subscriberService.getProvinces()
            return data
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    const { mutateAsync: getCities, error: getCitiesError, isError: isGetCitiesError 
    } = useMutation({
        mutationFn: async (provinceId) => {
            const result = await subscriberService.getProvinceCities(provinceId)
            return result
        }
    })

    return { 
        provincesList, provListErr, isProvListErr,
        getCities, getCitiesError, isGetCitiesError
    }
}