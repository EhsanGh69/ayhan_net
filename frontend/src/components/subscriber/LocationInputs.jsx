import { useMemo } from 'react'
import { LocationCity } from '@mui/icons-material'
import { 
    FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography 
} from '@mui/material'

import { addressInputs } from '../../constants/SubscriberInputs'
import SelectProvinceCity from './SelectProvinceCity'

export default function LocationInputs({
    values, handleChange, handleBlur, errors, touched, setFieldValue
}) {
    const AREA_ITEMS = useMemo(() => ([
        { id: '1', title: 'یک' },
        { id: '2', title: 'دو' },
        { id: '3', title: 'سه' },
        { id: '4', title: 'چهار' },
        { id: '5', title: 'پنج' },
        { id: '6', title: 'شش' },
        { id: '7', title: 'هفت' },
        { id: '8', title: 'هشت' },
        { id: '9', title: 'نه' },
        { id: '10', title: 'ده' },
    ]))

    return (
        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h6' mb={1} color='secondary'
                    display="flex" alignItems="center">
                    <LocationCity fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات محل سکونت</span>
                </Typography>
            </Grid>
            <SelectProvinceCity
                values={values} touched={touched} 
                errors={errors} setFieldValue={setFieldValue}
            />
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <FormControl fullWidth
                    error={touched.area && Boolean(errors.area)}>
                    <InputLabel>منطقه *</InputLabel>
                    <Select
                        value={values.area}
                        onChange={(e) => setFieldValue("area", e.target.value)}
                        label="منطقه"
                    >
                        {AREA_ITEMS.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.area && errors.area}
                    </FormHelperText>
                </FormControl>
            </Grid>
            {addressInputs.map(input => (
                <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                    <TextField
                        fullWidth
                        required={input.name === 'alley' || input.name === 'building_name' ? false : true}
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
