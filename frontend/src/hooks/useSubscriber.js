import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    return { subscribersList, subsListLoading, subsListErr, isSubsListErr }
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
        retry: 1
    })

    return { subscriberDetail, subsDetailLoading, subsDetailErr, isSubsDetailErr }
}

export const useAddSubscriber = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: addSubscriber, isPending: addSubsPending, 
        error: addSubsError, isError: isAddSubsError 
    } = useMutation({
        mutationFn: async (subsData) => {
            const result = await subscriberService.addSubscriber(subsData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscribersList'] })
            navigate('/subscribers')
        }
    })

    return { addSubscriber, addSubsPending, addSubsError, isAddSubsError }
}

export const useEditSubscriber = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: editSubscriber, isPending: editSubsPending, 
        error: editSubsError, isError: isEditSubsError 
    } = useMutation({
        mutationFn: async ({subsId, subsData}) => {
            const result = await subscriberService.updateSubscriber(subsId, subsData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscribersList'] })
            navigate('/subscribers')
        }
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