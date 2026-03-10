import { useEffect, useState, useContext } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import { Message } from '@mui/icons-material'

import { useTicketRecordGroups, useResponseTicketRecord } from '../../hooks/useTicketRecord';
import { useCurrentStaff } from '../../hooks/useStaff';
import { modalBox } from "../../styles/globalStyles";
import AddSubsTicketForm from './AddSubsTicketForm';
import { GlobalContext } from '../../context/GlobalContext';

export default function ResponseTicketModal({ open, closeHandler, setSnackbar, recordId }) {
    const [userId, setUserId] = useState(null)
    const { getData } = useContext(GlobalContext)
    const userData = getData("userData")

    // const { currentStaff, isCurrentStaffErr } = useCurrentStaff(userId)
    const { ticketGroupsList, isTGroupsListErr } = useTicketRecordGroups(open)
    const {
        responseTicketRecord, responseTRecordPending, isResponseTRecordErr
    } = useResponseTicketRecord()

    const responseTicketRecordHandler = async (values, { }) => {
        // setUserId(userData?.id)
        // if (currentStaff) {
        const preparedValues = {
            group: values.group,
            name: values.name,
            content: values.content,
            // user_id: currentStaff?.id,
            user_id: 6,
            staff_id: values?.staff_id ? values?.staff_id : null,
            status: values?.staff_id ? 'open' : 'close'
        }
        if(recordId) {
            await responseTicketRecord({ recordId, recordData: preparedValues})
            .then(() => setSnackbar({ open: true, message: 'پاسخ به تیکت با موفقیت ثبت شد', severity: 'success' }))
        } 
        // }
        closeHandler()
    }

    useEffect(() => {
        if (isResponseTRecordErr) {
            setSnackbar({ open: true, message: 'خطا در ارسال اطلاعات', severity: 'error' })
            closeHandler()
        }
        if (isTGroupsListErr /* || isCurrentStaffErr*/) {
            setSnackbar({ open: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
            closeHandler()
        }
    }, [isTGroupsListErr, isResponseTRecordErr /*isCurrentStaffErr*/])

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h5' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <Message fontSize='large' sx={{ color: '#076ab5', fontSize: '2.5rem' }} />
                    پاسخ به تیکت
                </Typography>
                <AddSubsTicketForm
                    ticketGroupsList={ticketGroupsList}
                    setSnackbar={setSnackbar}
                    handleSubmit={responseTicketRecordHandler}
                    isPending={responseTRecordPending}
                    handleClose={closeHandler}
                />
            </Box>
        </Modal>
    )
}
