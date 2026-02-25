import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const Subscribers = lazy(() => import("./Subscribers"))
const AddSubscriber = lazy(() => import("./AddSubscriber"))
const EditSubscriber = lazy(() => import("./EditSubscriber"))

const subscriberRoutes = [{
    path: "/subscribers", element: <ProtectedRoute />, children: [
        { path: "", element: <LazyWrapper><Subscribers /></LazyWrapper> },
        { path: "add", element: <LazyWrapper><AddSubscriber /></LazyWrapper> },
        { path: "edit/:subsId", element: <LazyWrapper><EditSubscriber /></LazyWrapper> },
    ]
}]

export default subscriberRoutes;