import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { Clear, Check, Comment } from '@mui/icons-material'

import { useChangeTicketActivate } from '../../hooks/useTicket'
import { modalBox } from "../../styles/globalStyles"

export default function ChangeTicketActivateModal({ open, closeHandler, ticket, setSnackbar }) {
    const { changeActivate, changingActivate, isChangeActivateErr, changeActivateErr }
        = useChangeTicketActivate()

    const changeTicketActivateHandler = async () => {
        if (ticket.id) {
            await changeActivate({ ticketId: ticket.id })
            setSnackbar({
                open: true,
                message: ticket.isActive === false ? 'تیکت با موفقیت فعال شد' : 'تیکت با موفقیت غیر فعال شد',
                severity: 'success'
            })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = changeActivateErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isChangeActivateErr) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            closeHandler()
        }
    }, [isChangeActivateErr, changeActivateErr])

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox}
                width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <span>
                        {ticket.isActive === false 
                            ? <Check fontSize='large' color='success' sx={{ fontSize: '2.5rem' }} />
                            : <Clear fontSize='large' color='error' sx={{ fontSize: '2.5rem' }} />
                        }
                        <Comment fontSize='large' 
                        color={ticket.isActive === false ? 'success': 'error'} 
                        sx={{ fontSize: '2.5rem' }} />
                    </span>
                    <span>
                        آیا از 
                        {ticket.isActive === false ? 'فعال سازی ': 'غیر فعال سازی '}
                        تیکت <b><i>«{ticket.name}»</i></b> از گروه <b><i>«{ticket.group}»</i></b> 
                        اطمینان دارید؟
                    </span>
                </Typography>
                <Button onClick={changeTicketActivateHandler} disabled={changingActivate}
                    color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
                <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
            </Box>
        </Modal>
    )
}
