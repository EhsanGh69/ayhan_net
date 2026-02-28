import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const Subscribers = lazy(() => import("./Subscribers"))
const AddSubscriber = lazy(() => import("./AddSubscriber"))
const EditSubscriber = lazy(() => import("./EditSubscriber"))
const SearchSubscriber = lazy(() => import("./SearchSubscriber"))

const subscriberRoutes = [{
    path: "/subscribers", element: <ProtectedRoute />, children: [
        { path: "", element: <LazyWrapper><Subscribers /></LazyWrapper> },
        { path: "add", element: <LazyWrapper><AddSubscriber /></LazyWrapper> },
        { path: "edit/:subsId", element: <LazyWrapper><EditSubscriber /></LazyWrapper> },
        { path: "search", element: <LazyWrapper><SearchSubscriber /></LazyWrapper> },
    ]
}]

export default subscriberRoutes;