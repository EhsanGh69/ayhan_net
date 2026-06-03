import { useMemo } from 'react'
import { 
  FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography 
} from '@mui/material'
import { Portrait } from '@mui/icons-material'
import { Field } from 'formik'

import JalaliDateField from '../inputs/JalaliDateField'
import { identityInputs } from '../../constants/SubscriberInputs'

export default function IdentityInputs({ 
  values, handleChange, handleBlur, errors, touched, setFieldValue 
}) {
  const SUBSCRIBER_TYPES = useMemo(() => ([
    { id: 'real', title: 'حقیقی' },
    { id: 'legal', title: 'حقوقی' }
  ]))

  return (
    <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h6' mb={1} color='primary'
          display="flex" alignItems="center">
          <Portrait fontSize='large' sx={{ mr: 1 }} />
          <span>اطلاعات هویتی</span>
        </Typography>
      </Grid>
      {identityInputs.map(input => {
        if (input.name === 'birth_date') return (
          <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
            <Field
              fullWidth
              name="birth_date"
              label={values.subscriber_type === 'legal' ? "تاریخ تولد نماینده شرکت/سازمان *" : "تاریخ تولد *"}
              component={JalaliDateField}
            />
          </Grid>
        )
        else if (input.name === 'subscriber_type') return (
          <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl fullWidth
              error={touched.subscriber_type && Boolean(errors.subscriber_type)}>
              <InputLabel>نوع مشترک *</InputLabel>
              <Select
                value={values.subscriber_type}
                onChange={(e) => setFieldValue("subscriber_type", e.target.value)}
                label="نوع مشترک"
              >
                {SUBSCRIBER_TYPES.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {touched.subscriber_type && errors.subscriber_type}
              </FormHelperText>
            </FormControl>
          </Grid>
        )
        else return (
          <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              fullWidth
              required
              label={values.subscriber_type === 'legal' ? `${input.label} نماینده شرکت/سازمان` : input.label}
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
