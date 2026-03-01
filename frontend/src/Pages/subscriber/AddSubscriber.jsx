import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useAddSubscriber, useCheckSubscriberExist } from '../../hooks/useSubscriber'
import SubscriberForm from '../../components/subscriber/SubscriberForm';
import { subscriberSchema } from '../../validations/usersValidations';
import ConfirmModal from '../../components/ConfirmModal';


export default function AddSubscriber() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [openConfirm, setOpenConfirm] = useState(false)
    const [confirmValues, setConfirmValues] = useState(null)
    const navigate = useNavigate()

    const { addSubscriber, addSubsError, isAddSubsError, addSubsPending } = useAddSubscriber()
    const { checkSubsExist, isCheckSubsExistErr } = useCheckSubscriberExist()

    const handleAddSubscriber = async (values) => {
        const preparedValues = {
            ...values,
            birth_date: values.birth_date.toDate().toISOString().slice(0, 10),
            province_id: Number(values.province_id),
            city_id: Number(values.city_id),
            area: Number(values.area)
        }
        await addSubscriber(preparedValues)
            .then(() => {
                setSnackbar({
                    open: true, message: 'مشترک جدید با موفقیت ایجاد شد', severity: 'success'
                })
                setOpenConfirm(false)
                setTimeout(() => navigate('/subscribers'), 500)
            })
    }

    const handleCheckSubsExist = async (values, { }) => {
        const { subs_exist } = await checkSubsExist({ mobile: values.mobile, postal_code: values.postal_code })
        if (subs_exist) {
            setConfirmValues(values)
            setOpenConfirm(true)
            return
        }
        handleAddSubscriber(values)
    }

    useEffect(() => {
        const errResponse = addSubsError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isAddSubsError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
        if (isCheckSubsExistErr) setSnackbar({ open: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
    }, [addSubsError, isAddSubsError, isCheckSubsExistErr])

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <PersonAdd fontSize='large' sx={{ fontSize: '3rem', mr: 2 }} />
                    <span>ایجاد مشتری جدید</span>
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
                handleSubmit={handleCheckSubsExist}
                validationSchema={subscriberSchema}
                isPending={addSubsPending}
                btnTxt="ثبت اطلاعات"
            />

            <ConfirmModal
                open={openConfirm}
                closeHandler={() => setOpenConfirm(false)}
                confirmHandler={() => handleAddSubscriber(confirmValues)}
                message="مشتری با اطلاعات وارد شده از قبل وجود دارد. آیا ادامه می دهید؟"
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
