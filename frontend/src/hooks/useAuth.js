import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/authService';

export const useAuth = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: async (credentials) => await authService.login(credentials),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            navigate('/');
        }
    })

    const logoutMutation = useMutation({
        mutationFn: async () => await authService.logout(),
        onSuccess: () => {
            queryClient.clear()
            navigate('/login')
        }
    })

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending
    }
}