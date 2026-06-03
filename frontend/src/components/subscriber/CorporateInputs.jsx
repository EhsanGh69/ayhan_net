import {
    FormControl, FormHelperText, Grid, InputLabel, TextField, Typography
} from '@mui/material'
import { AccountBalance } from '@mui/icons-material'

import { corporateInputs } from '../../constants/SubscriberInputs'

export default function CorporateInputs({ values, handleChange, handleBlur, errors, touched }) {
    return (
        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h6' mb={1} color='primary'
                    display="flex" alignItems="center">
                    <AccountBalance fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات حقوقی</span>
                </Typography>
            </Grid>

            {corporateInputs.map(input => (
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
                        sx={{ mb: 2 }}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
