import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { PersonRemove } from '@mui/icons-material'

import { useRemoveSubscriber } from '../../hooks/useSubscriber'
import { modalBox } from "../../styles/globalStyles"

export default function RemoveSubsModal({ open, closeHandler, subs, setSnackbar }) {
    const { removeSubscriber, removeSubsPending, isRemoveSubsError, removeSubsError } 
    = useRemoveSubscriber()

    const removeSubsHandler = async () => {
        if(subs.id) {
            await removeSubscriber({ subsId: subs.id })
            setSnackbar({ 
                open: true, 
                message: 'مشترک با موفقیت حذف شد', 
                severity: 'success' 
            })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = removeSubsError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isRemoveSubsError) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            closeHandler()
        }
    }, [isRemoveSubsError, removeSubsError])

  return (
    <Modal open={open} onClose={closeHandler}>
        <Box sx={modalBox}
            width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
            <Typography 
              variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
              component="div" display="flex" flexDirection="column" alignItems="center"
            >
                <PersonRemove fontSize='large' color='error' sx={{ fontSize: '2.5rem' }} />
                <span>آیا از حذف <b><i>«{subs.fullName}»</i></b> اطمینان دارید؟</span>
            </Typography>
            <Button onClick={removeSubsHandler} disabled={removeSubsPending}
              color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
            <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
        </Box>
    </Modal>
  )
}
