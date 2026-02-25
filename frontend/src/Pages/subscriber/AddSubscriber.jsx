import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useAddSubscriber } from '../../hooks/useSubscriber'
import SubscriberForm from '../../components/subscriber/SubscriberForm';
import { subscriberSchema } from '../../validations/usersValidations'


export default function AddSubscriber() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const { addSubscriber, addSubsError, isAddSubsError, addSubsPending } = useAddSubscriber()

    const handleAddSubscriber = async (values, { }) => {
        const preparedValues = {
            ...values,
            birth_date: values.birth_date.toDate().toISOString().slice(0, 10),
            province_id: Number(values.province_id),
            city_id: Number(values.city_id),
            area: Number(values.area)
        }
        await addSubscriber(preparedValues)
    }

    useEffect(() => {
        const errResponse = addSubsError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isAddSubsError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [addSubsError, isAddSubsError])

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <PersonAdd fontSize='large' sx={{ fontSize: '3rem', mr: 2 }} />
                    <span>ایجاد مشترک جدید</span>
                </Typography>
            </Box>

            <SubscriberForm
                initialValues={{
                    first_name: '', last_name: '', subscriber_type: '',
                    national_id: '', certificate_number: '', birth_date: null, 
                    father_name: '', mobile: '', phone: '', province_id: '',
                    city_id: '', area: '', main_street: '', side_street: '', 
                    alley: '', building_name: '', house_number: '', postal_code: ''
                }}
                handleSubmit={handleAddSubscriber}
                validationSchema={subscriberSchema}
                isPending={addSubsPending}
                btnTxt="ثبت اطلاعات"
            />

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
