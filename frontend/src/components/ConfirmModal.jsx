import { Box, Button, Modal, Typography } from '@mui/material'
import { Warning } from '@mui/icons-material'

import { modalBox } from "../styles/globalStyles"

export default function ConfirmModal({ open, closeHandler, message, confirmHandler }) {
    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox}
                width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <Warning fontSize='large' color='warning' sx={{ fontSize: '2.5rem' }} />
                    <span>{message}</span>
                </Typography>
                <Button onClick={confirmHandler} color='primary' sx={{ mr: 2 }} variant='contained'>
                    بله
                </Button>
                <Button color='secondary' variant='outlined' onClick={closeHandler}>
                    خیر
                </Button>
            </Box>
        </Modal>
    )
}
