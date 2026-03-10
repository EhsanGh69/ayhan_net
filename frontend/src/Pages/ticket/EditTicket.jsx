import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { ModeComment } from '@mui/icons-material'
import { useParams } from 'react-router-dom';

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useTicket, useEditTicket } from '../../hooks/useTicket'
import TicketForm from '../../components/ticket/TicketForm';
import { defineTicketSchema } from '../../validations/authValidations'
import TicketGroupModal from '../../components/ticket/TicketGroupModal';
import LoadingBox from '../../components/LoadingBox';

export default function EditTicket() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [groupModal, setGroupModal] = useState(false)
    const [selectGroup, setSelectGroup] = useState(null)
    const { ticketId } = useParams()

    const { ticketDetail, ticketDetailLoading, isTicketDetailErr, ticketDetailErr }
        = useTicket(Number(ticketId))
    const { editTicket, editTicketPending, isEditTicketError, editTicketError } = useEditTicket()

    const handleEditTicket = async (values, { }) => {
        const preparedValues = {
            ...values,
            group_id: Number(values.group_id),
        }
        await editTicket({ ticketId: Number(ticketId), ticketData: preparedValues })
    }

    useEffect(() => {
        const errResDetail = ticketDetailErr?.response?.data?.detail
        const detailErrMsg = typeof errResDetail === 'string' ? errResDetail : 'خطا در دریافت اطلاعات'
        if (isTicketDetailErr) setSnackbar({ open: true, message: detailErrMsg, severity: 'error' })

        const errResEdit = editTicketError?.response?.data?.detail
        const editErrMsg = typeof errResEdit === 'string' ? errResEdit : 'خطا در دریافت اطلاعات'
        if (isEditTicketError) setSnackbar({ open: true, message: editErrMsg, severity: 'error' })
    }, [isTicketDetailErr, ticketDetailErr, isEditTicketError, editTicketError])

    if (ticketDetailLoading) {
        return <LoadingBox />
    }

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' mb={1} color='primary'
                    display="flex" alignItems="center" justifyContent="center">
                    <ModeComment fontSize='large' sx={{ mr: 1 }} />
                    <span>ویرایش تیکت</span>
                </Typography>
            </Box>

            <TicketGroupModal
                open={groupModal}
                closeHandler={() => setGroupModal(false)}
                setSnackbar={setSnackbar}
                group={selectGroup}
            />

            {!!ticketDetail && (
                <TicketForm
                    initialValues={{ 
                        group_id: ticketDetail.group.id, 
                        name: ticketDetail.name, description: ticketDetail.description 
                    }}
                    handleSubmit={handleEditTicket}
                    validationSchema={defineTicketSchema}
                    isPending={editTicketPending}
                    btnTxt="ویرایش اطلاعات"
                    handleGroupModal={setGroupModal}
                    handleSelectGroup={setSelectGroup}
                    isSelected={Boolean(selectGroup)}
                />
            )}

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
