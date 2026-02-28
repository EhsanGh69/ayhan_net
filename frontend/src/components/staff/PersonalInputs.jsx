import { Grid, TextField, Typography } from '@mui/material'
import { Portrait } from '@mui/icons-material'
import { Field } from 'formik'

import JalaliDateField from '../inputs/JalaliDateField'
import { personalInfos } from '../../constants/StaffInputs'

export default function PersonalInputs({ values, handleChange, handleBlur, errors, touched }) {
    return (
        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h6' mb={1} color='primary'
                    display="flex" alignItems="center">
                    <Portrait fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات فردی</span>
                </Typography>
            </Grid>
            {personalInfos.map(input => {
                if (input.name === 'birth_date') return (
                    <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                        <Field
                            fullWidth
                            name="birth_date"
                            label="تاریخ تولد *"
                            component={JalaliDateField}
                        />
                    </Grid>
                )
                else return (
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
                            multiline={input.name === 'address'}
                            minRows={3}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}
