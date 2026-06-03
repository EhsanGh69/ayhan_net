import { useEffect, useMemo, useState } from "react"
import { LocationCity, ShareLocation, PinDrop, NotListedLocation, Minimize } from '@mui/icons-material'
import {
    Box, FormControl, FormHelperText, Grid, IconButton, InputAdornment,
    InputLabel, MenuItem, Select, TextField, Typography
} from '@mui/material'

import { addressInputs } from '../../constants/SubscriberInputs'
import SelectProvinceCityArea from './SelectProvinceCityArea'

export default function LocationInputs({
    values, handleChange, handleBlur, errors, touched, setFieldValue
}) {
    const optionalFields = useMemo(() => [
        'side_street', 'alley', 'side_alley', 'building_name', 'floor', 'unit'
    ])
    const addressLabels = useMemo(() => ({
        'province': 'استان', 'city': 'شهرستان', 'area': 'منطقه',
        'main_street': 'خیابان', 'side_street': 'خیابان', 'alley': 'کوچه',
        'side_alley': 'کوچه', 'building_name': 'ساختمان',
        'floor': 'طبقه', 'unit': 'واحد', 'house_number': 'پلاک', 'postal_code': 'کدپستی'
    }))
    const [address, setAddress] = useState({})

    useEffect(() => {
        Object.entries(values).forEach(([field, value]) => {
            Object.keys(addressLabels).forEach(label => {
                if(!['province', 'city', 'area'].includes(label) && value) {
                    if(field === label) setAddress(prev => ({ ...prev, [label]: value }))
                }
            })
        })
    }, [values])

    return (
        <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }}>
                <Typography variant='h6' mb={1} color='secondary'
                    display="flex" alignItems="center">
                    <LocationCity fontSize='large' sx={{ mr: 1 }} />
                    <span>اطلاعات محل سکونت</span>
                </Typography>
            </Grid>
            <SelectProvinceCityArea
                values={values} touched={touched}
                errors={errors} setFieldValue={setFieldValue}
                address={address} setAddress={setAddress}
            />
            {addressInputs.map(input => (
                <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                    <TextField
                        fullWidth
                        required={optionalFields.includes(input.name) ? false : true}
                        label={input.label}
                        name={input.name}
                        value={values[input.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[input.name] && Boolean(errors[input.name])}
                        helperText={touched[input.name] && errors[input.name]}
                        sx={{ mb: 2 }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <>
                                        {input.name === 'postal_code' && (
                                            <InputAdornment position='end'>
                                                <IconButton edge="end" title="استعلام کد پستی">
                                                    <ShareLocation color='#4a4848' />
                                                </IconButton>
                                            </InputAdornment>
                                        )}
                                    </>
                                )
                            }
                        }}
                    />
                </Grid>
            ))}

            {Object.keys(address).length > 0 && (
                <Grid size={{ xs: 8 }}>
                    <Box
                        width="100%"
                        border="1px solid #c2b8b8"
                        borderRadius={1}
                        p={2}
                    >
                        <Typography fontSize={20} color="#827d7d" display="flex" alignItems="center">
                            <PinDrop sx={{ mr: 1 }} />
                            <span>آدرس محل سکونت مشتری :</span>
                        </Typography>
                        <Typography color="#827d7d" fontSize={18} mt={1}>
                            {Object.entries(addressLabels).map(([name, label]) => {
                                if (address[name]) return (
                                    <span key={name}>
                                        {label}{" "}
                                        <b>{address[name]}</b>{name !== "postal_code" && "، "}
                                    </span>
                                )
                            })}
                        </Typography>
                    </Box>
                </Grid>
            )}
        </Grid>
    )
}
