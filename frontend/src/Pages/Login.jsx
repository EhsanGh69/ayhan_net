import { useEffect, useState } from 'react';
import { Container, Paper, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { Form, Formik } from 'formik'

import Captcha from '../components/Captcha';
import EndInputAdornment from '../components/auth/EndInputAdornment';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../validations/authValidations'
import SnackAlert from '../components/SnackAlert';

export default function Login() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [captchaInput, setCaptchaInput] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [captchaValid, setCaptchaValid] = useState(false)
    const { login, isLoggingIn, isLoginError, loginError } = useAuth()

    const handleLogin = async (values, { setSubmitting, resetForm, setFieldError }) => {
        if (!captchaValid) {
            setFieldError('captcha', 'کد امنیتی وارد شده نادرست است')
            return;
        }
        await login({ username: values.username, password: values.password })
    }

    useEffect(() => {
        const errResponse = loginError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در ارسال اطلاعات'
        if (isLoginError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isLoginError, loginError])

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
                    <Typography component="h1" variant='h4' sx={{ mb: 3, color: 'primary.main' }}>
                        ورود به آیهان نت
                    </Typography>

                    <Formik
                        initialValues={{ username: '', password: '', captcha: captchaInput }}
                        validationSchema={loginSchema}
                        onSubmit={handleLogin}
                    >
                        {({ values, handleChange, touched, errors }) => (
                            <Form noValidate>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id="username"
                                    name='username'
                                    label='نام کاربری'
                                    autoComplete='off'
                                    autoFocus
                                    value={values.username}
                                    onChange={handleChange}
                                    variant='outlined'
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username &&  errors.username}
                                />

                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id="password"
                                    name='password'
                                    label='رمز عبور'
                                    autoComplete='off'
                                    value={values.password}
                                    onChange={handleChange}
                                    variant='outlined'
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    type={showPassword ? 'text' : 'password'}
                                    slotProps={{
                                        input: {
                                            endAdornment: <EndInputAdornment
                                                showPassword={showPassword} setShowPassword={setShowPassword} />
                                        }
                                    }}
                                />
                                <Box my={2}>
                                    <Captcha
                                        value={captchaInput}
                                        setValue={setCaptchaInput}
                                        onChange={handleChange}
                                        setCaptchaValid={setCaptchaValid}
                                        error={touched.captcha && Boolean(errors.captcha)}
                                        helperText={touched.captcha && errors.captcha}
                                    />
                                </Box>

                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                                    endIcon={isLoggingIn ? <CircularProgress size={20} /> : <LoginIcon />}
                                >
                                    <span style={{ marginRight: 10 }}>ورود</span>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
            </Box>
        </Container>
    )
}
