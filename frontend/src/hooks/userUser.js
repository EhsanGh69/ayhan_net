import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { userService } from '../services/userService';

export const useUser = () => {
    const navigate = useNavigate()

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await userService.getCurrentUser()
            return data
        },
        enabled: !!localStorage.getItem('access_token'),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    })

    const changePasswordMutation = useMutation({
        mutationFn: async ({ oldPassword, newPassword }) => {
            const result = await userService.changePassword(oldPassword, newPassword)
            return result
        },
        onSuccess: () => navigate('/home')
    })

    return {
        user, error, isLoading,
        changePassword: changePasswordMutation.mutate,
        isChangingPassword: changePasswordMutation.isPending,
        changePasswordError: changePasswordMutation.error
    }
}