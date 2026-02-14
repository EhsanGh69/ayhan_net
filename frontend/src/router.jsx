import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import LazyWrapper from './components/LazyWrapper';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

export const router = createBrowserRouter([
    { path: "/login", element: <LazyWrapper><Login /></LazyWrapper> },
    { path: "/", element: (
        <ProtectedRoute>
            <LazyWrapper><Home /></LazyWrapper>
        </ProtectedRoute>
    ) },
])