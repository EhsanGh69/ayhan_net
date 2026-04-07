import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { Check, Clear, Comment } from '@mui/icons-material'

import { useChangeTicketRecordActivate } from '../../hooks/useTicketRecord'
import { modalBox } from "../../styles/globalStyles"

export default function ChangeSubsTicketActivateModal({ open, closeHandler, recordId, isActive, setSnackbar }) {
    const {
        changeActivate, changingActivate, isChangeActivateErr, changeActivateErr
    } = useChangeTicketRecordActivate()

    const changeTicketActivateHandler = async () => {
        if (recordId) {
            await changeActivate({ recordId })
            setSnackbar({
                open: true,
                message: isActive ? 'تیکت با موفقیت غیر فعال شد' : 'تیکت با موفقیت فعال شد',
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
                        {isActive
                            ? <Clear fontSize='large' color='error' sx={{ fontSize: '2.5rem' }} />
                            : <Check fontSize='large' color='success' sx={{ fontSize: '2.5rem' }} />
                        }
                        <Comment fontSize='large' 
                        color={isActive ? 'error' : 'success'}
                        sx={{ fontSize: '2.5rem' }} />
                    </span>
                    <span>آیا از 
                        {isActive ? 'غیر فعال سازی ' : 'فعال سازی '}
                        تیکت مشترک اطمینان دارید؟</span>
                </Typography>
                <Button onClick={changeTicketActivateHandler} disabled={changingActivate}
                    color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
                <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
            </Box>
        </Modal>
    )
}
