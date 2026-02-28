import { ContactPhone } from '@mui/icons-material'
import { Grid, TextField, Typography } from '@mui/material'

import { contactInputs } from '../../constants/SubscriberInputs'

export default function ContactInputs({ values, handleChange, handleBlur, errors, touched }) {
    return (
        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h6' mb={1} color='success'
                    display="flex" alignItems="center">
                    <ContactPhone fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات تماس</span>
                </Typography>
            </Grid>
            {contactInputs.map(input => (
                <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                    <TextField
                        fullWidth
                        required
                        label={input.label}
                        name={input.name}
                        value={values[input.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[input.name] && Boolean(errors[input.name])}
                        helperText={touched[input.name] && errors[input.name]}
                        sx={{ mb: 1 }}
                    />
                    {input.name === 'phone' && (
                        <Typography variant='subtitle2' color='#808080' mt={0}>
                            *<span>شماره ثابت ده رقمی بدون صفر پیش شماره</span>
                        </Typography>
                    )}
                </Grid>
            ))}
        </Grid>
    )
}
