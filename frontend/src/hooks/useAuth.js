import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/authService';

export const useAuth = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { 
        mutateAsync: login, is: isLoggingIn, 
        isError: isLoginError, error: loginError
    } = useMutation({
        mutationFn: async (credentials) => await authService.login(credentials),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            navigate('/');
        }
    })

    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: async () => await authService.logout(),
        onSuccess: () => {
            queryClient.clear()
            navigate('/login')
        }
    })

    return {
        login, isLoggingIn, isLoginError, loginError, logout, isLoggingOut
    }
}

export const useSubscriberRegister = () => {
    const { 
        mutateAsync: subscriberRegister, isPending: subsRegisterPending,
        isError: isSubsRegisterErr, error: subsRegisterErr
    } = useMutation({
        mutationFn: async (subsData) => await authService.subscriberRegister(subsData)
    }) 

    return { subscriberRegister, subsRegisterPending, isSubsRegisterErr, subsRegisterErr }
}