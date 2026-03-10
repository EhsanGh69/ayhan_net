import { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import generateCaptcha from '../utils/generateCaptcha';


export default function Captcha({ onChange, error, helperText, value, setValue, setCaptchaValid }) {
    const [captchaCode, setCaptchaCode] = useState('')
    const [captchaImage, setCaptchaImage] = useState('')

    const handleCaptcha = useCallback(() => {
        const { code, image } = generateCaptcha()
        setCaptchaCode(code)
        setCaptchaImage(image)
    }, [])

    useEffect(() => {
        handleCaptcha()
    }, [handleCaptcha])

    const handleInputChange = (e) => {
        const value = e.target.value
        setValue(value)
        setCaptchaValid(value === captchaCode)
    }

    return (
        <Box width="100%">
            <Box display="flex" alignItems="center" gap={1} mb={1}>
                {captchaImage && (
                    <img
                        src={captchaImage} alt="captcha"
                        style={{
                            borderRadius: 4,
                            border: '1px solid #ddd',
                            backgroundColor: '#fafafa'
                        }}
                    />
                )}

                <Button
                    onClick={handleCaptcha}
                    variant='outlined'
                    size='small'
                    startIcon={<RefreshIcon />}
                    sx={{ minWidth: 'auto' }}
                >
                    جدید
                </Button>
            </Box>

            <TextField
                id="captcha"
                name='captcha'
                fullWidth
                required
                size='small'
                label='کد امنیتی'
                placeholder='کد امنیتی را وارد کنید'
                value={value}
                onChange={(e) => {
                    onChange(e)
                    handleInputChange(e)
                }}
                error={error}
                helperText={helperText}
                // dir='ltr'
                sx={{ input: { textAlign: 'left' } }}
            />
        </Box>
    )
}
