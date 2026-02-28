import { lazy } from 'react';

import LazyWrapper from '../../components/LazyWrapper';
import ProtectedRoute from '../../components/ProtectedRoute';

const ManageTickets = lazy(() => import("./ManageTickets"))
const DefineTicket = lazy(() => import("./DefineTicket"))
const EditTicket = lazy(() => import("./EditTicket"))

const ticketRoutes = [{
    path: "/tickets", element: <ProtectedRoute />, children: [
        { path: "", element: <LazyWrapper><ManageTickets /></LazyWrapper> },
        { path: "define", element: <LazyWrapper><DefineTicket /></LazyWrapper> },
        { path: "edit/:ticketId", element: <LazyWrapper><EditTicket /></LazyWrapper> },
    ]
}]

export default ticketRoutes;