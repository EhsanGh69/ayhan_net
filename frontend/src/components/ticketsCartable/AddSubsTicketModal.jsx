import { useEffect, useState, useContext } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import { AddComment } from '@mui/icons-material'

import { useTicketRecordGroups, useAddTicketRecord } from '../../hooks/useTicketRecord';
import { useCurrentStaff } from '../../hooks/useStaff';
import { modalBox } from "../../styles/globalStyles";
import AddSubsTicketForm from './AddSubsTicketForm';
import { GlobalContext } from '../../context/GlobalContext';


export default function AddSubsTicketModal({ open, closeHandler, setSnackbar, subsId }) {
    const [userId, setUserId] = useState(null)
    const [staffId, setStaffId] = useState(null)
    const { getData } = useContext(GlobalContext)
    const userData = getData("userData")

    const { getCurrentStaff, isGetCurrentStaffErr } = useCurrentStaff()
    const { ticketGroupsList, isTGroupsListErr } = useTicketRecordGroups(open)
    const { addTicketRecord, addTRecordPending, isAddTRecordErr } = useAddTicketRecord()

    const addTicketRecordHandler = async (values, { }) => {
        await getCurrentStaff({ userId: userData?.id })
            .then(async ({ id }) => {
                const preparedValues = {
                    group: values.group,
                    name: values.name,
                    content: values.content,
                    user_id: id,
                    subscriber_id: subsId,
                    staff_id: values?.staff_id ? values?.staff_id : null,
                    status: values?.staff_id ? 'open' : 'close'
                }

                await addTicketRecord(preparedValues)
                    .then(() => setSnackbar({ open: true, message: 'تیکت با موفقیت ثبت شد', severity: 'success' }))
            })
        closeHandler()
    }

    useEffect(() => {
        if (isAddTRecordErr) {
            setSnackbar({ open: true, message: 'خطا در ارسال اطلاعات', severity: 'error' })
            closeHandler()
        }
        if (isTGroupsListErr || isGetCurrentStaffErr) {
            setSnackbar({ open: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
            closeHandler()
        }
    }, [isTGroupsListErr, isAddTRecordErr, isGetCurrentStaffErr])

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <AddComment fontSize='large' sx={{ color: '#076ab5', fontSize: '2.5rem' }} />
                    افزودن تیکت
                </Typography>
                <AddSubsTicketForm
                    ticketGroupsList={ticketGroupsList}
                    setSnackbar={setSnackbar}
                    handleSubmit={addTicketRecordHandler}
                    isPending={addTRecordPending}
                    handleClose={closeHandler}
                />
            </Box>
        </Modal>
    )
}
