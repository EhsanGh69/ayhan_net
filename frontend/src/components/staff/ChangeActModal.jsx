import { useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { LockPerson } from '@mui/icons-material'

import { useChangeStaff } from "../../hooks/useStaff"
import { modalBox } from "../../styles/globalStyles"

export default function ChangeActModal({ open, closeHandler, userAct, setSnackbar }) {
    const { changeAct, changeActPending, changeActError, isChangeActError } = useChangeStaff()

    const changeActHandler = async () => {
        if(userAct.userId) {
            await changeAct({ userId: userAct.userId })
            setSnackbar({ 
                open: true, 
                message: userAct.status ? 'کاربر با موفقیت غیر فعال شد' : 'کاربر با موفقیت فعال شد', 
                severity: 'success' 
            })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = changeActError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isChangeActError) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            closeHandler()
        }
    }, [changeActError, isChangeActError])

  return (
    <Modal open={open} onClose={closeHandler}>
        <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
            <Typography 
              variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
              component="div" display="flex" flexDirection="column" alignItems="center"
            >
                <LockPerson fontSize='large' sx={{ color: '#b56c07', fontSize: '2.5rem' }} />
                {userAct.status
                    ? <span>آیا از غیر فعال کردن <b><i>«{userAct.fullName}»</i></b> اطمینان دارید؟</span>
                    : <span>آیا از فعال کردن <b><i>«{userAct.fullName}»</i></b> اطمینان دارید؟</span>
                }
            </Typography>
            <Button onClick={changeActHandler} disabled={changeActPending}
              color='primary' sx={{ mr: 2 }} variant='contained'>بله</Button>
            <Button color='secondary' variant='outlined' onClick={closeHandler}>خیر</Button>
        </Box>
    </Modal>
  )
}
