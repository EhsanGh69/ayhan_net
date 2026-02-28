import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { AddComment } from '@mui/icons-material'

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useAddTicket } from '../../hooks/useTicket'
import TicketForm from '../../components/ticket/TicketForm';
import { defineTicketSchema } from '../../validations/inputsValidations'
import TicketGroupModal from '../../components/ticket/TicketGroupModal';

export default function DefineTicket() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [groupModal, setGroupModal] = useState(false)
    const [selectGroup, setSelectGroup] = useState(null)

    const { addTicket, addTicketPending, isAddTicketError, addTicketError } = useAddTicket()

    const handleDefineTicket = async (values, { }) => {
        const preparedValues = {
            ...values,
            group_id: Number(values.group_id),
        }
        await addTicket(preparedValues)
    }

    useEffect(() => {
        const errResponse = addTicketError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isAddTicketError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isAddTicketError, addTicketError])

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' mb={1} color='primary'
                    display="flex" alignItems="center" justifyContent="center">
                    <AddComment fontSize='large' sx={{ mr: 1 }} />
                    <span>ایجاد تیکت جدید</span>
                </Typography>
            </Box>

            <TicketGroupModal
                open={groupModal}
                closeHandler={() => setGroupModal(false)}
                setSnackbar={setSnackbar}
                group={selectGroup}
            />

            <TicketForm
                initialValues={{ group_id: '', name: '', description: '' }}
                handleSubmit={handleDefineTicket}
                validationSchema={defineTicketSchema}
                isPending={addTicketPending}
                btnTxt="ثبت اطلاعات"
                handleGroupModal={setGroupModal}
                handleSelectGroup={setSelectGroup}
                isSelected={Boolean(selectGroup)}
            />

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
