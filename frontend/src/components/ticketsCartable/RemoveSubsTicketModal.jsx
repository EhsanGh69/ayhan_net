import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { Clear, Comment } from '@mui/icons-material'

import { useRemoveTicketRecord } from '../../hooks/useTicketRecord'
import { modalBox } from "../../styles/globalStyles"

export default function RemoveSubsTicketModal({ open, closeHandler, recordId, setSnackbar }) {
    const {
        removeTicketRecord, removeTRecordPending, isRemoveTRecordErr, removeTRecordErr
    } = useRemoveTicketRecord()

    const removeTicketRecordHandler = async () => {
        if (recordId) {
            await removeTicketRecord({ recordId })
            setSnackbar({
                open: true,
                message: 'تیکت با موفقیت حذف شد',
                severity: 'success'
            })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = removeTRecordErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isRemoveTRecordErr) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            closeHandler()
        }
    }, [isRemoveTRecordErr, removeTRecordErr])

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
                    <span>آیا از حذف تیکت مشترک اطمینان دارید؟</span>
                </Typography>
                <Button onClick={removeTicketRecordHandler} disabled={removeTRecordPending}
                    color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
                <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
            </Box>
        </Modal>
    )
}
