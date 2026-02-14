import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import { authService } from '../services/authService';

export default function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null)
    const refreshToken = localStorage.getItem('refresh_token')

    useEffect(() => {
        const verifyRefreshToken = async () => {
            if (refreshToken) {
                try {
                    await authService.verifyToken(refreshToken)
                    setIsValid(true)
                } catch {
                    setIsValid(false)
                }
            } else {
                setIsValid(false)
            }
        }

        verifyRefreshToken()
    }, [refreshToken])

    if(isValid === null) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100V'>
                <CircularProgress />
            </Box>
        )
    }

    return isValid ? children : <Navigate to="/login" replace />
}