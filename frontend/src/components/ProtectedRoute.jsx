import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const isAuthenticate = localStorage.getItem('refresh_token')

    return isAuthenticate ? <Outlet /> : <Navigate to="/login" replace />
}