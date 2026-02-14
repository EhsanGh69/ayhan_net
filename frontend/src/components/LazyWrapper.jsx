import { Suspense } from 'react';
import { Backdrop, CircularProgress } from '@mui/material'

export default function LazyWrapper({ children }) {
    return (
        <Suspense
            fallback={
                <Backdrop open={true} sx={{ zIndex: (them) => them.zIndex.drawer + 1 }}>
                    <CircularProgress color="warning" />
                </Backdrop>
            }
        >
            {children}
        </Suspense>
    )
}