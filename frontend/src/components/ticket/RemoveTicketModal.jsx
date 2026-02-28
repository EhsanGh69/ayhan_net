import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { Clear, Comment } from '@mui/icons-material'

import { useRemoveTicket } from '../../hooks/useTicket'
import { modalBox } from "../../styles/globalStyles"

export default function RemoveTicketModal({ open, closeHandler, ticket, setSnackbar }) {
    const { removeTicket, removeTicketPending, isRemoveTicketError, removeTicketError }
        = useRemoveTicket()

    const removeTicketHandler = async () => {
        if (ticket.id) {
            await removeTicket({ ticketId: ticket.id })
            setSnackbar({
                open: true,
                message: 'تیکت با موفقیت حذف شد',
                severity: 'success'
            })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = removeTicketError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isRemoveTicketError) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            closeHandler()
        }
    }, [isRemoveTicketError, removeTicketError])

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox}
                width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <span>
                        <Clear fontSize='large' color='error' sx={{ fontSize: '2.5rem' }} />
                        <Comment fontSize='large' color='error' sx={{ fontSize: '2.5rem' }} />
                    </span>
                    <span>آیا از حذف <b><i>«{ticket.name}»</i></b> از گروه <b><i>«{ticket.group}»</i></b> اطمینان دارید؟</span>
                </Typography>
                <Button onClick={removeTicketHandler} disabled={removeTicketPending}
                    color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
                <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
            </Box>
        </Modal>
    )
}
