import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { staffService } from '../services/staffService';
import { GlobalContext } from '../context/GlobalContext'

export const useStaffList = () => {
    const { 
        data: staffList, isLoading: staffListLoading, error: staffListErr, isError: isStaffListErr
    } = useQuery({
        queryKey: ['staffList'],
        queryFn: async () => {
            const data = await staffService.getStaffUsers()
            return data
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    return { staffList, staffListLoading, staffListErr, isStaffListErr }
}

export const useAddStaff = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: addStaff, isPending: addStaffPending, error: addStaffError, isError: isAddStaffError 
    } = useMutation({
        mutationFn: async (staffData) => {
            const result = await staffService.addStaffUser(staffData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffList'] })
            navigate('/users/staff')
        }
    })

    return { addStaff, addStaffPending, addStaffError, isAddStaffError }
}

export const useStaff = (userId) => {
    const { setData } = useContext(GlobalContext)

    const { 
        data: staffDetail, isLoading: staffDetailLoading, error: staffDetailErr, isError: isStaffDetailErr
    } = useQuery({
        queryKey: ['staffDetail', userId],
        queryFn: async () => {
            const data = await staffService.getStaffUser(userId)
            if(data.org_image) 
                setData("org_image", `http://127.0.0.1:8000/media/org_images/${data.org_image}`)
            return data
        },
        retry: 1
    })

    return { staffDetail, staffDetailLoading, staffDetailErr, isStaffDetailErr }
}

export const useChangeStaff = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { 
        mutateAsync: editStaff, isPending: editStaffPending, error: editStaffError, isError: isEditStaffError 
    } = useMutation({
        mutationFn: async ({ userId, staffData }) => {
            const result = await staffService.updateStaffUser(userId, staffData)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffList'] })
            navigate('/users/staff')
        }
    })

    const { 
        mutateAsync: changeAct, isPending: changeActPending, error: changeActError, isError: isChangeActError 
    } = useMutation({
        mutationFn: async ({ userId }) => {
            const result = await staffService.changeStaffActivate(userId)
            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffList'] })
        }
    })

    return {
        editStaff, editStaffPending, editStaffError, isEditStaffError,
        changeAct, changeActPending, changeActError, isChangeActError
    }
}