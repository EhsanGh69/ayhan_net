import { useState } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import { ContactEmergency } from '@mui/icons-material'

import { userInfos } from '../../constants/StaffInputs'
import EndInputAdornment from '../auth/EndInputAdornment'

export default function UserInputs({ values, handleChange, handleBlur, errors, touched, btnTxt = '' }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Grid container bgcolor="#e3e3e3ff" mb={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }} mb={1}>
                <Typography variant='h6' mb={1} color='secondary'
                    display="flex" alignItems="center">
                    <ContactEmergency fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات کاربری</span>
                </Typography>
            </Grid>
            {userInfos.map(input => {
                if (btnTxt.includes('ویرایش') && input.name === 'password') return null
                return (
                    <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                        <TextField
                            fullWidth
                            required
                            type={input.name === 'password'
                                ? showPassword ? 'text' : 'password'
                                : 'text'}
                            slotProps={{
                                input: {
                                    endAdornment: input.name === 'password' && (
                                        <EndInputAdornment
                                            showPassword={showPassword}
                                            setShowPassword={setShowPassword}
                                        />
                                    )
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
                    </Grid>
                )
            })}
        </Grid>

    )
}
