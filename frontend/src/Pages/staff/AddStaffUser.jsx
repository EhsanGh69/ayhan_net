import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { PersonAdd } from '@mui/icons-material'

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useAddStaff } from '../../hooks/useStaff'
import StaffForm from '../../components/staff/StaffForm';
import { addStaffSchema } from '../../validations/usersValidations'
import getISODate from '../../utils/getISODate';


export default function AddStaffUser() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [imageError, setImageError] = useState('')
    const { addStaff, addStaffPending, addStaffError, isAddStaffError } = useAddStaff()

    const handleAddStaff = async (values, {}) => {
        const formData = new FormData()
        const cartable_types = []
        values.cartable_types.forEach((item) => { cartable_types.push(item); })
        formData.append("user_data", JSON.stringify({
            first_name: values.first_name, last_name: values.last_name,
            username: values.username, password: values.password
        }))
        formData.append("staff_data", JSON.stringify({
            display_name: values.display_name, national_id: values.national_id,
            birth_date: getISODate(values.birth_date),
            father_name: values.father_name, mobile: values.mobile,
            phone: values.phone, org_mobile: values.org_mobile,
            org_phone: values.org_phone, address: values.address,
            cartable_types
        }))
        if (values.org_image) formData.append("org_image", values.org_image)
        await addStaff(formData)
    }

    useEffect(() => {
        const errResponse = addStaffError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isAddStaffError && errorMsg.includes("تصویر")) setImageError(errorMsg)
        else if (isAddStaffError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isAddStaffError, addStaffError])

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <PersonAdd fontSize='large' sx={{ fontSize: '3rem', mr: 2 }} />
                    <span>ایجاد کاربر جدید</span>
                </Typography>
            </Box>
            
            <StaffForm
                initialValues={{
                    username: '', password: '', first_name: '', last_name: '',
                    display_name: '', national_id: '', birth_date: null, father_name: '',
                    mobile: '', phone: '', org_mobile: '', org_phone: '',
                    address: '', org_image: null, cartable_types: []
                }}
                handleSubmit={handleAddStaff}
                validationSchema={addStaffSchema}
                imageError={imageError}
                isPending={addStaffPending}
                btnTxt="ثبت اطلاعات"
            />

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}