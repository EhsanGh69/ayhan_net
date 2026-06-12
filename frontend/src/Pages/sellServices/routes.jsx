import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const PhoneSubscription = lazy(() => import("./PhoneSubscription"))

const sellServicesRoutes = [{
    path: "/sellServices", element: <ProtectedRoute />, children: [
        { path: "phone", element: <LazyWrapper><PhoneSubscription /></LazyWrapper> },
    ]
}]

export default sellServicesRoutes;