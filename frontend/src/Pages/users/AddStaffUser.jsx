import { useState, useEffect } from 'react'
import {
    Button, TextField, Grid, Typography, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText,
    Chip,
    CircularProgress
} from '@mui/material'
import { Check, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useStaff } from '../../hooks/useUser'
import { addStaffSchema } from '../../validations/usersValidations'
import JalaliDateField from '../../components/inputs/JalaliDateField';
import FileInput from '../../components/inputs/FileInput';

export default function AddStaffUser() {
    const navigate = useNavigate()
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const { addStaff, addStaffPending, addStaffError, isAddStaffError } = useStaff()

    const handleAddStaff = async (values, { }) => {
        const formData = new FormData()
        
        formData.append("user", JSON.stringify({ 
            first_name: values.first_name, last_name: values.last_name,
            username: values.username, password: values.password, is_active: true
        }))
        formData.append("formal_name", values.formal_name)
        formData.append("national_id", values.national_id)
        formData.append("birth_date", values.birth_date.toDate().toISOString().slice(0, 10))
        formData.append("father_name", values.father_name)
        formData.append("mobile", values.mobile)
        formData.append("phone", values.phone)
        formData.append("org_mobile", values.org_mobile)
        formData.append("org_phone", values.org_phone)
        formData.append("address", values.address)
        values.cartable_types.forEach((item) => { formData.append("cartable_types", item); });
        if(values.org_image) formData.append("org_image", values.org_image)
        await addStaff(formData)
    }

    useEffect(() => {
        const errorMsg = addStaffError?.response?.data?.detail || 'خطا در ارسال اطلاعات'
        if(isAddStaffError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isAddStaffError, addStaffError])

    const CARTABLE_TYPES = [
        { id: 'tickets', title: 'تیکت ها' },
        { id: 'internal', title: 'داخلی' },
        { id: 'fusion', title: 'فیوژن' },
    ]

    const getCartableTitle = (id) => {
        const found = CARTABLE_TYPES.find(item => item.id === id);
        return found ? found.title : id;
    };

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <Person fontSize='3rem' />
                    <span>ایجاد کارمند جدید</span>
                </Typography>
            </Box>
            <Formik
                initialValues={{
                    username: '', password: '', first_name: '', last_name: '',
                    formal_name: '', national_id: '', birth_date: null, father_name: '',
                    mobile: '', phone: '', org_mobile: '', org_phone: '',
                    address: '', org_image: null, cartable_types: []
                }}
                validationSchema={addStaffSchema}
                onSubmit={handleAddStaff}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                    <Form encType='multipart/form-data'>
                        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant='h6' mb={1} color='primary'
                                    display="flex" alignItems="center">
                                    <Check />
                                    اطلاعات فردی
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="نام"
                                    name='first_name'
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.first_name && Boolean(errors.first_name)}
                                    helperText={touched.first_name && errors.first_name}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="نام خانوادگی"
                                    name='last_name'
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.last_name && Boolean(errors.last_name)}
                                    helperText={touched.last_name && errors.last_name}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <Field
                                    fullWidth
                                    name="birth_date"
                                    label="تاریخ تولد"
                                    component={JalaliDateField}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="کد ملی"
                                    name='national_id'
                                    value={values.national_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.national_id && Boolean(errors.national_id)}
                                    helperText={touched.national_id && errors.national_id}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="نام پدر"
                                    name='father_name'
                                    value={values.father_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.father_name && Boolean(errors.father_name)}
                                    helperText={touched.father_name && errors.father_name}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="شماره همراه"
                                    name='mobile'
                                    value={values.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.mobile && Boolean(errors.mobile)}
                                    helperText={touched.mobile && errors.mobile}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="شماره ثابت"
                                    name='phone'
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.phone && Boolean(errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="آدرس"
                                    name='address'
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.address && Boolean(errors.address)}
                                    helperText={touched.address && errors.address}
                                    sx={{ mb: 2 }}
                                    multiline
                                    minRows={3}
                                />
                            </Grid>
                        </Grid>

                        <Grid container bgcolor="#e3e3e3ff" mb={1} p={2} borderRadius={1} gap={1}>
                            <Grid size={{ xs: 12 }} mb={1}>
                                <Typography variant='h6' color='secondary'
                                    display="flex" alignItems="center">
                                    <Check />
                                    <span>اطلاعات کاربری</span>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="نام کاربری"
                                    name='username'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="نام نمایشی"
                                    name='formal_name'
                                    value={values.formal_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.formal_name && Boolean(errors.formal_name)}
                                    helperText={touched.formal_name && errors.formal_name}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    type='password'
                                    label="رمز عبور"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container bgcolor="#e3e3e3ff" mb={1} p={2} borderRadius={1} gap={1}>
                            <Grid size={{ xs: 12 }} mb={1}>
                                <Typography variant='h6' color='warning'
                                    display="flex" alignItems="center">
                                    <Check />
                                    <span>اطلاعات شغلی</span>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="شماره همراه سازمانی"
                                    name='org_mobile'
                                    value={values.org_mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.org_mobile && Boolean(errors.org_mobile)}
                                    helperText={touched.org_mobile && errors.org_mobile}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <TextField
                                    fullWidth
                                    label="شماره داخلی سازمانی"
                                    name='org_phone'
                                    value={values.org_phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.org_phone && Boolean(errors.org_phone)}
                                    helperText={touched.org_phone && errors.org_phone}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <FormControl fullWidth
                                    error={touched.cartable_types && Boolean(errors.cartable_types)}>
                                    <InputLabel>نوع کارتابل</InputLabel>
                                    <Select
                                        multiple
                                        value={values.cartable_types}
                                        onChange={(e) => setFieldValue("cartable_types", e.target.value)}
                                        label="نوع کارتابل"
                                        renderValue={(selected) => (
                                            <Box display="flex" gap={2} flexWrap="wrap">
                                                {selected.map(val => 
                                                    <Chip color='warning' key={val} 
                                                    label={getCartableTitle(val)} />
                                                )}
                                            </Box>
                                        )}
                                    >
                                        {CARTABLE_TYPES.map(type => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>
                                        {touched.cartable_types && errors.cartable_types}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                                <FileInput
                                    name="org_image"
                                    label="آپلود تصویر"
                                    setFieldValue={setFieldValue}
                                    formats="image/jpeg,image/png,image/jpg"
                                    helper="حداکثر سایز: 200 کیلوبایت | فرمت های مجاز: jpg, png, jpeg"
                                    error={errors.org_image}
                                />
                            </Grid>
                        </Grid>

                        <Box 
                            width="100%" mb={2} py={1}
                            bgcolor="#e3e3e3ff" borderRadius={1}
                            display="flex" justifyContent="center"
                        >
                            <Button size='large' sx={{ fontSize: 20 }} type='submit'
                                endIcon={addStaffPending ? <CircularProgress size={20} /> : null}
                                variant='contained' color='success'>ثبت اطلاعات</Button>
                            <Button 
                                size='large' type='button'
                                variant='outlined' color='error' 
                                sx={{ ml: 2, fontSize: 20 }}
                                onClick={() => navigate('/users/staff')}
                            >
                                انصراف
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
