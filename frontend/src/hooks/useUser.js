import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/authService';

export const useUser = () => {
    const navigate = useNavigate()

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await authService.getCurrentUser()
            return data
        },
        enabled: !!localStorage.getItem('access_token'),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    const { 
        mutateAsync: changePassword, isPending: changePassPending, 
        isError: isChangePassErr, error: changePassErr
    } = useMutation({
        mutationFn: async ({ oldPassword, newPassword }) => {
            const result = await authService.changePassword(oldPassword, newPassword)
            return result
        },
        onSuccess: () => navigate('/home')
    })

    const {
        mutateAsync: resetPassword, isPending: resetPassPending, 
        isError: isResetPassErr, error: resetPassErr
    } = useMutation({
        mutationFn: async ({ userId, password }) => {
            const result = await authService.resetPassword(userId, password)
            return result
        }
    })

    return {
        user, error, isLoading,
        changePassword, changePassPending, changePassErr, isChangePassErr,
        resetPassword, resetPassPending, isResetPassErr, resetPassErr
    }
}