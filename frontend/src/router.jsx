import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LazyWrapper from './components/LazyWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import usersRoutes from './Pages/users/routes';

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export const router = createBrowserRouter([
    { path: "/login", element: <LazyWrapper><Login /></LazyWrapper> },
    { path: "/", element: <ProtectedRoute />, children:[
        { path: "", element: <LazyWrapper><Home /></LazyWrapper> },
    ]},
    { path: "*", element: <LazyWrapper><NotFound /></LazyWrapper> },
    ...usersRoutes
])