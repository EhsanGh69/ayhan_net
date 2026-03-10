import { CheckCircleOutline, Close, ErrorOutline } from '@mui/icons-material'
import { Alert, IconButton, Typography } from '@mui/material'

export default function AlertBox({ alertMsg, setAlertMsg }) {
    return (
        <Alert
            severity={alertMsg.severity}
            icon={false}
            sx={{ mb: 2, width: '100%', position: 'relative', pt: 0 }}
        >
            <IconButton size='medium' title='بستن' color={alertMsg.severity}
                sx={{ m: 0, p: 0, position: 'absolute', right: 5 }}
                onClick={() => setAlertMsg(prev => ({ ...prev, show: false }))}
            >
                <Close fontSize='small' />
            </IconButton>

            <Typography display="flex" fontSize={16} mt={2}>
                {alertMsg.severity === 'success'
                    ? <CheckCircleOutline color='success' sx={{ mr: 1 }} />
                    : <ErrorOutline color='error' sx={{ mr: 1 }} />
                }
                <span>{alertMsg.message}</span>
            </Typography>
        </Alert>
    )
}
