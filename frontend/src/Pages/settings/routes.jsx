import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const Settings = lazy(() => import("./Settings"))
const Locations = lazy(() => import("./Locations"))


const settingsRoutes = [{
    path: "/settings", element: <ProtectedRoute />, children: [
        { path: "", element: <LazyWrapper><Settings /></LazyWrapper> },
        { path: "locations", element: <LazyWrapper><Locations /></LazyWrapper> },
    ]
}]

export default settingsRoutes
