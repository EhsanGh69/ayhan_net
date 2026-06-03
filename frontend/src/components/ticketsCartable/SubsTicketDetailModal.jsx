import { useEffect, useMemo } from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { Comment, ArrowLeft, Remove, PersonPinCircle, Message, Close } from '@mui/icons-material'
import moment from 'jalali-moment';

import { useTicketRecordDetail } from '../../hooks/useTicketRecord';
import { modalBox } from "../../styles/globalStyles";
import useErrorHandler from "../../hooks/useErrorHandler";
import InfosTable from '../table/InfosTable';


export default function SubsTicketDetailModal({
    open, closeHandler, setSnackbar, recordId, openResponse = null,
    openChangeStaff = null
}) {

    const {
        ticketRecordDetail, tRecordDetailLoading, isTRecordDetailErr, tRecordDetailErr
    } = useTicketRecordDetail(recordId)


    useErrorHandler(isTRecordDetailErr, tRecordDetailErr, setSnackbar)

    const infoStyles = useMemo(() => ({
        bgcolor: "secondary.main",
        display: 'flex',
        justifyContent: 'space-around',
        p: 2,
        borderRadius: 2,
        color: 'whitesmoke'
    }))

    const detailItems = useMemo(() => {
        if (tRecordDetailLoading && !ticketRecordDetail) return []
        return [
            { label: 'گروه تیکت', value: ticketRecordDetail?.group },
            { label: 'نام تیکت', value: ticketRecordDetail?.name },
            { label: 'توضیحات تیکت', value: ticketRecordDetail?.content },
            { label: 'توضیحات پاسخ تیکت', value: ticketRecordDetail?.response?.content },
            { label: 'مشترک', value:
                `${ticketRecordDetail?.subscriber.first_name} ${ticketRecordDetail?.subscriber.last_name}` 
            },
            { label: 'کاربر ثبت کننده', value: ticketRecordDetail?.user.display_name },
            {
                label: 'ارجاع شده به کارتابل',
                value: ticketRecordDetail?.staff
                    ? ticketRecordDetail?.staff.display_name : <Remove />
            },
            {
                label: 'تاریخ و ساعت ثبت',
                value: moment(ticketRecordDetail?.created_at).format('HH:mm - jYYYY/jMM/jDD')
            },
            {
                label: 'تاریخ و ساعت به روزرسانی',
                value: moment(ticketRecordDetail?.updated_at).format('HH:mm - jYYYY/jMM/jDD')
            },
            {
                label: 'وضعیت',
                value: ticketRecordDetail?.status === 'open' ? 'باز' : 'بسته'
            },
        ]
    })

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={{ ...modalBox }} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <IconButton size='medium' title='بستن'
                    sx={{ m: 0, p: 0, position: 'absolute', right: 5, top: 10 }}
                    onClick={closeHandler}
                >
                    <Close fontSize='large' />
                </IconButton>

                <Typography
                    variant='h4' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <Comment fontSize='large' sx={{ color: '#076ab5', fontSize: '2.5rem' }} />
                    جزئیات تیکت
                </Typography>

                <InfosTable infoItems={detailItems} />

                {!!openResponse && (
                    <Button variant='contained' sx={{ mt: 2, fontSize: 25 }}
                        onClick={() => {
                            closeHandler()
                            openResponse()
                        }}
                    >
                        <span>پاسخ به تیکت</span>
                        <Message sx={{ ml: 1 }} />
                    </Button>
                )}
                {!!openChangeStaff && (
                    <Button variant='contained' color='success'
                        sx={{ mt: 2, fontSize: 25, ml: 1 }}
                        onClick={() => {
                            closeHandler()
                            openChangeStaff()
                        }}
                    >
                        <span>تغییر کارتابل تیکت</span>
                        <PersonPinCircle sx={{ ml: 1 }} />
                    </Button>
                )}
            </Box>
        </Modal>
    )
}