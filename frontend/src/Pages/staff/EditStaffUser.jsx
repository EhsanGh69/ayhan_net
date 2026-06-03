import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { Person, Edit } from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import moment from "jalali-moment"

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useChangeStaff, useStaff } from '../../hooks/useStaff'
import { editStaffSchema } from '../../validations/usersValidations'
import StaffForm from '../../components/staff/StaffForm';
import LoadingBox from '../../components/LoadingBox';
import getISODate from '../../utils/getISODate';


export default function AddStaffUser() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [imageError, setImageError] = useState('')
    const [initValues, setInitValues] = useState(null)
    const { userId } = useParams()
    const { staffDetail, staffDetailLoading, staffDetailErr, isStaffDetailErr } = useStaff(Number(userId))
    const { editStaff, editStaffPending, isEditStaffError, editStaffError } = useChangeStaff()

    useEffect(() => {
        if (!staffDetailLoading && staffDetail) {
            setInitValues({
                username: staffDetail.user.username, first_name: staffDetail.user.first_name, 
                last_name: staffDetail.user.last_name, display_name: staffDetail.display_name, 
                national_id: staffDetail.national_id, father_name: staffDetail.father_name,
                mobile: staffDetail.mobile, phone: staffDetail.phone,
                org_mobile: staffDetail.org_mobile, org_phone: staffDetail.org_phone,
                address: staffDetail.address, cartable_types: [...staffDetail.cartable_types],
                birth_date: moment(staffDetail.birth_date).format('jYYYY/jMM/jDD'), 
                org_image: null,
            })
        }
    }, [staffDetail, staffDetailLoading])

    const handleEditStaff = async (values, { }) => {
        const formData = new FormData()
        const cartable_types = []
        values.cartable_types.forEach((item) => { cartable_types.push(item); })
        formData.append("user_data", JSON.stringify({
            first_name: values.first_name, last_name: values.last_name,
            username: values.username
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
        await editStaff({ userId: Number(userId), staffData: formData})
    }

    useEffect(() => {
        const errResDetail = staffDetailErr?.response?.data?.detail
        const detailErrMsg = typeof errResDetail === 'string' ? errResDetail : 'خطا در دریافت اطلاعات'
        if (isStaffDetailErr) setSnackbar({ open: true, message: detailErrMsg, severity: 'error' })

        const errResEdit = editStaffError?.response?.data?.detail
        const editErrMsg = typeof errResEdit === 'string' ? errResEdit : 'خطا در دریافت اطلاعات'
        if (isEditStaffError && detailErrMsg.includes("تصویر")) setImageError(detailErrMsg)
        else if (isEditStaffError) setSnackbar({ open: true, message: editErrMsg, severity: 'error' })
    }, [staffDetailErr, isStaffDetailErr, isEditStaffError, editStaffError])

    if (staffDetailLoading) {
        return <LoadingBox />
    }

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <Edit fontSize='large' sx={{ fontSize: '3rem', m: 0, p: 0 }} />
                    <Person fontSize='large' sx={{ fontSize: '3rem', ml: 0, p: 0 }} />
                    <span>ویرایش اطلاعات کاربر</span>
                </Typography>
            </Box>

            {!!initValues && (
                <StaffForm
                    initialValues={{ ...initValues }}
                    handleSubmit={handleEditStaff}
                    validationSchema={editStaffSchema}
                    isPending={editStaffPending}
                    btnTxt="ویرایش اطلاعات"
                    imageError={imageError}
                />
            )}
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}