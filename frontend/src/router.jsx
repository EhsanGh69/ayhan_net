import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LazyWrapper from './components/LazyWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import staffRoutes from './Pages/staff/routes';
import subscriberRoutes from './Pages/subscriber/routes';
import ticketRoutes from './Pages/ticket/routes';

const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));

export const router = createBrowserRouter([
    { path: "/register", element: <LazyWrapper><Register /></LazyWrapper> },
    { path: "/login", element: <LazyWrapper><Login /></LazyWrapper> },
    { path: "/", element: <ProtectedRoute />, children:[
        { path: "", element: <LazyWrapper><Home /></LazyWrapper> },
    ]},
    { path: "*", element: <LazyWrapper><NotFound /></LazyWrapper> },
    ...staffRoutes,
    ...subscriberRoutes,
    ...ticketRoutes
])