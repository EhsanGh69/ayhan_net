import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingBox() {
    return (
        <Box display="flex" justifyContent='center' alignItems='center' height='100vh'
            flexDirection="column">
            <Typography variant='h5'>در حال دریافت اطلاعات ...</Typography>
            <CircularProgress size={50} />
        </Box>
    )
}
