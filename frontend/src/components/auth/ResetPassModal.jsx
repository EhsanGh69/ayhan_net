import { useEffect, useState } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { SyncLock } from '@mui/icons-material'
import { Form, Formik } from 'formik'

import { useUser } from "../../hooks/useUser"
import { modalBox } from "../../styles/globalStyles"
import { resetPassSchema } from "../../validations/usersValidations"
import { resetPassFields } from "../../constants/StaffInputs"
import EndInputAdornment from "./EndInputAdornment"

export default function ResetPassModal({ open, closeHandler, userAct, setSnackbar }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
    const { resetPassword, resetPassPending, isResetPassErr, resetPassErr } = useUser()

    const resetPasswordHandler = async (values, { }) => {
        if (userAct.userId) {
            await resetPassword({ userId: userAct.userId, password: values.password })
            setSnackbar({ open: true, message: 'رمز عبور کاربر با موفقیت بازیابی شد', severity: 'success' })
            closeHandler()
        }
    }

    useEffect(() => {
        const errResponse = resetPassErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isResetPassErr) {
            setSnackbar({ open: true, message: errorMsg, severity: 'error' })
            setShowPassword(false)
            setShowConfPassword(false)
            closeHandler()
        }
    }, [isResetPassErr, resetPassErr])

    const handleFieldType = (name) => {
        if (name === 'password') {
            return showPassword ? 'text' : 'password'
        }
        return showConfPassword ? 'text' : 'password'
    }

    const handleAdornment = (name) => {
        if (name === 'password') {
            return (
                <EndInputAdornment
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            )
        }
        return (
            <EndInputAdornment
                showPassword={showConfPassword}
                setShowPassword={setShowConfPassword}
            />
        )
    }

    return (
        <Modal open={open} onClose={() => {
            setShowPassword(false)
            setShowConfPassword(false)
            closeHandler()
        }}>
            <Box sx={modalBox}
                width={{ xs: "80%", sm: "50%", md: "45%", lg: "30%", xl: "25%" }}>
                <Typography
                    variant='h5' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <SyncLock fontSize='large' color='info' sx={{ fontSize: '2.5rem' }} />
                    <span>بازیابی رمز عبور <b><i>«{userAct?.fullName}»</i></b></span>
                </Typography>

                <Formik
                    initialValues={{ password: '', confirm_password: '' }}
                    validationSchema={resetPassSchema}
                    onSubmit={resetPasswordHandler}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            {resetPassFields.map(input => (
                                <TextField
                                    key={input.name}
                                    autoComplete='off'
                                    fullWidth
                                    type={handleFieldType(input.name)}
                                    slotProps={{
                                        input: {
                                            endAdornment: (<>{handleAdornment(input.name)}</>)
                                        }
                                    }}
                                    label={input.label}
                                    name={input.name}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched[input.name] && Boolean(errors[input.name])}
                                    helperText={touched[input.name] && errors[input.name]}
                                    sx={{ mb: 2 }}
                                />
                            ))}
                            <Button
                                type='submit'
                                disabled={resetPassPending}
                                color='primary' sx={{ mr: 2 }}
                                variant='contained'
                            >
                                تایید
                            </Button>
                            <Button
                                color='secondary'
                                variant='outlined'
                                onClick={() => {
                                    setShowPassword(false)
                                    setShowConfPassword(false)
                                    closeHandler()
                                }}
                            >
                                انصراف
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    )
}
