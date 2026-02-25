import { useMemo, useContext } from 'react'
import { Check } from '@mui/icons-material'
import { 
    Box, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography 
} from '@mui/material'

import { jobInfos } from '../../constants/StaffInputs'
import FileInput from '../inputs/FileInput'
import { GlobalContext } from '../../context/GlobalContext'

export default function JobInputs({
    values, handleChange, handleBlur, errors, touched, setFieldValue, imageError, btnTxt
}) {
    const { getData } = useContext(GlobalContext)
    const CARTABLE_TYPES = useMemo(() => ([
        { id: 'tickets', title: 'تیکت ها' },
        { id: 'internal', title: 'داخلی' },
        { id: 'fusion', title: 'فیوژن' },
    ]))
    const getCartableTitle = (id) => {
        const found = CARTABLE_TYPES.find(item => item.id === id);
        return found ? found.title : id;
    };
    return (
        <Grid container bgcolor="#e3e3e3ff" mb={1} p={2} borderRadius={1} gap={1}>
            <Grid size={{ xs: 12 }} mb={1}>
                <Typography variant='h6' color='warning'
                    display="flex" alignItems="center">
                    <Check />
                    <span>اطلاعات شغلی</span>
                </Typography>
            </Grid>
            {jobInfos.map(input => (
                <Grid key={input.name} size={{ xs: 12, md: 6, lg: 3 }}>
                    <TextField
                        fullWidth
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
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <FormControl fullWidth
                    error={touched.cartable_types && Boolean(errors.cartable_types)}>
                    <InputLabel>نوع کارتابل</InputLabel>
                    <Select
                        multiple
                        value={values.cartable_types}
                        onChange={(e) => setFieldValue("cartable_types", e.target.value)}
                        label="نوع کارتابل"
                        renderValue={(selected) => (
                            <Box display="flex" gap={2} flexWrap="wrap">
                                {selected.map(val =>
                                    <Chip color='warning' key={val}
                                        label={getCartableTitle(val)} />
                                )}
                            </Box>
                        )}
                    >
                        {CARTABLE_TYPES.map(type => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.cartable_types && errors.cartable_types}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <FileInput
                    name="org_image"
                    label="آپلود تصویر"
                    setFieldValue={setFieldValue}
                    formats="image/jpeg,image/png,image/jpg"
                    helper="حداکثر سایز: 200 کیلوبایت | فرمت های مجاز: jpg, png, jpeg"
                    error={imageError}
                    image_url={btnTxt.includes("ویرایش") ? getData("org_image") : ""}
                />
            </Grid>
        </Grid>
    )
}
