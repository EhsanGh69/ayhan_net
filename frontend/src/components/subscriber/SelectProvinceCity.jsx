import { useState, useEffect, useContext } from 'react'
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import { useLocation } from '../../hooks/useSubscriber'
import { GlobalContext } from '../../context/GlobalContext'

export default function SelectProvinceCity({ values, errors, touched, setFieldValue }) {
    const { getData } = useContext(GlobalContext)
    const provinceId = getData("provinceId")
    const [provErr, setProvErr] = useState('')
    const [cityErr, setCityErr] = useState('')
    const [cities, setCities] = useState(null)
    const { 
        provincesList, provListErr, isProvListErr, getCities, getCitiesError, isGetCitiesError
    } = useLocation()

    useEffect(() => {
        const errResponse = provListErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isProvListErr) setProvErr(errorMsg)
    }, [provListErr, isProvListErr])

    useEffect(() => {
        const errResponse = getCitiesError?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isGetCitiesError) setCityErr(errorMsg)
    }, [getCitiesError, isGetCitiesError])

    const getCitiesHandler = async (provinceId) => {
        const data = await getCities(provinceId)
        if(!cityErr) setCities(data.cities)
    }

    useEffect(() => {
        if (provinceId) getCitiesHandler(provinceId)
    }, [])

    return (
        <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                {!!provErr && <Typography variant='subtitle1' color='error'>{provErr}</Typography>}
                <FormControl fullWidth
                    error={touched.province_id && Boolean(errors.province_id)}>
                    <InputLabel>استان</InputLabel>
                    <Select
                        value={provincesList ? values.province_id : ""}
                        onChange={(e) => setFieldValue("province_id", e.target.value)}
                        label="استان"
                    >
                        {!!provincesList && provincesList.map(prov => (
                            <MenuItem key={prov.id} value={prov.id}
                            onClick={() => getCitiesHandler(prov.id)}>
                                {prov.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.province_id && errors.province_id}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                {!!cityErr && <Typography variant='subtitle1' color='error'>{cityErr}</Typography>}
                <FormControl fullWidth
                    error={touched.city_id && Boolean(errors.city_id)}>
                    <InputLabel>شهر</InputLabel>
                    <Select
                        value={cities ? values.city_id : ""}
                        onChange={(e) => setFieldValue("city_id", e.target.value)}
                        label="شهر"
                    >
                        {!!cities && cities?.map(city => (
                            <MenuItem key={city.id} value={city.id}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.city_id && errors.city_id}
                    </FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
}
