import { useEffect, useState } from 'react';
import {
    Container, Paper, Box, Typography, TextField, Button, CircularProgress
} from '@mui/material';
import { Download } from '@mui/icons-material';
import { Form, Formik } from 'formik';

import { useSubscriberRegister } from '../hooks/useAuth';
import { useCheckSubscriberExist } from '../hooks/useSubscriber';
import { subsRegisterSchema } from '../validations/authValidations';
import AlertBox from '../components/AlertBox';
import { subsRegisterInputs } from '../constants/formInputs'
import ConfirmModal from '../components/ConfirmModal';

export default function Register() {
    const [openConfirm, setOpenConfirm] = useState(false)
    const [confirmValues, setConfirmValues] = useState(null)
    const [alertMsg, setAlertMsg] = useState({ show: false, message: '', severity: 'success' })

    const {
        subscriberRegister, subsRegisterPending, isSubsRegisterErr, subsRegisterErr
    } = useSubscriberRegister()
    const { checkSubsExist, isCheckSubsExistErr } = useCheckSubscriberExist()

    const handleSubsRegister = async ({ values, resetForm }) => {
        const { track_code } = await subscriberRegister(values)
        setAlertMsg({ 
            show: true, 
            message: `ثبت نام شما با موفقیت انجام شد. کد رهگیری: ${track_code}`, 
            severity: 'success' 
        })
        setOpenConfirm(false)
        resetForm()
    }

    const handleCheckSubsExist = async (values, { resetForm }) => {
        const { subs_exist } = await checkSubsExist({ mobile: values.mobile, postal_code: values.postal_code })
        if (subs_exist) {
            setConfirmValues({ values, resetForm })
            setOpenConfirm(true)
            return
        }
        handleSubsRegister({ values, resetForm })
        resetForm()
    }

    useEffect(() => {
        const errResponse = subsRegisterErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isSubsRegisterErr) setAlertMsg({ show: true, message: errorMsg, severity: 'error' })
        if (isCheckSubsExistErr) setAlertMsg({ show: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
    }, [isSubsRegisterErr, subsRegisterErr, isCheckSubsExistErr])

    return (
        <Container component="main" maxWidth="xs">
            <Box marginTop={8} display='flex' flexDirection='column' alignItems='center'>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2
                    }}
                >
                    {alertMsg.show && <AlertBox alertMsg={alertMsg} setAlertMsg={setAlertMsg} />}

                    <Typography component="h1" variant='h4' sx={{ mb: 3, color: 'primary.main' }}>
                        ثبت نام مشترک آیهان نت
                    </Typography>

                    <Formik
                        initialValues={{
                            first_name: '', last_name: '', mobile: '', postal_code: ''
                        }}
                        validationSchema={subsRegisterSchema}
                        onSubmit={handleCheckSubsExist}
                    >
                        {({ values, handleChange, touched, errors }) => (
                            <Form noValidate>
                                {subsRegisterInputs.map(input => (
                                    <TextField
                                        key={input.name}
                                        margin='normal'
                                        required
                                        fullWidth
                                        id={input.name}
                                        name={input.name}
                                        label={input.label}
                                        autoComplete='off'
                                        autoFocus={input.name === 'first_name'}
                                        value={values[input.name]}
                                        onChange={handleChange}
                                        variant='outlined'
                                        error={touched[input.name] && Boolean(errors[input.name])}
                                        helperText={touched[input.name] && errors[input.name]}
                                    />
                                ))}

                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='info'
                                    sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                                    endIcon={
                                        subsRegisterPending
                                            ? <CircularProgress size={20} />
                                            : <Download />
                                    }
                                >
                                    <span style={{ marginRight: 10 }}>ثبت اطلاعات</span>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>

                <ConfirmModal
                    open={openConfirm}
                    closeHandler={() => setOpenConfirm(false)}
                    confirmHandler={() => handleSubsRegister(confirmValues)}
                    message="اطلاعات وارد شده از قبل وجود دارد. آیا ادامه می دهید؟"
                />
            </Box>
        </Container>
    )
}
