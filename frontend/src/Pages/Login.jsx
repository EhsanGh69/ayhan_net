import { useState } from 'react';
import { Container, Paper, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

import Captcha from '../components/Captcha';
import EndInputAdornment from '../components/auth/EndInputAdornment';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [captchaValid, setCaptchaValid] = useState(false)
    const [formData, setFormData] = useState({ username: '', password: '' })
    const { login, isLoggingIn, loginError } = useAuth()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!captchaValid) {
            return;
        }

        login(formData)
    }

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

                    {loginError && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {loginError?.response?.data?.detail || 'نام کاربری یا رمز عبور اشتباه است'}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} width="100%" noValidate>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="username"
                            name='username'
                            label='نام کاربری'
                            autoComplete='username'
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            variant='outlined'
                        />

                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="password"
                            name='password'
                            label='رمز عبور'
                            autoComplete='current-password'
                            value={formData.password}
                            onChange={handleChange}
                            variant='outlined'
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
                                onChange={setCaptchaValid}
                                error={!captchaValid && loginError}
                                helperText={!captchaValid && loginError ? 'کد امنیتی اشتباه است' : ''}
                            />
                        </Box>

                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            // disabled={isLoggingIn || !captchaValid}
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                            endIcon={isLoggingIn ? <CircularProgress size={20} /> : <LoginIcon />}
                        >
                            {/* <span style={{ marginRight: 10 }}>{isLoggingIn ? 'ورود' : 'در حال ورود ...'}</span> */}
                            <span style={{ marginRight: 10 }}>ورود</span>
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
