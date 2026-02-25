import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const StaffUsers = lazy(() => import("./StaffUsers"))
const AddStaffUser = lazy(() => import("./AddStaffUser"))
const EditStaffUser = lazy(() => import("./EditStaffUser"))

const staffRoutes = [{
    path: "/users", element: <ProtectedRoute />, children: [
        { path: "staff", element: <LazyWrapper><StaffUsers /></LazyWrapper> },
        { path: "staff/add", element: <LazyWrapper><AddStaffUser /></LazyWrapper> },
        { path: "staff/edit/:userId", element: <LazyWrapper><EditStaffUser /></LazyWrapper> },
    ]
}]

export default staffRoutes