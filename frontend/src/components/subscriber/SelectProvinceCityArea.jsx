import { useState, useEffect, useContext } from 'react'
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import { useAllProvinces, useCityAreas, useProvinceCities } from '../../hooks/useLocation'
import { GlobalContext } from '../../context/GlobalContext'
import useErrorHandler from '../../hooks/useErrorHandler'

export default function SelectProvinceCityArea({ 
    values, errors, touched, setFieldValue, setAddress
}) {
    const { getData } = useContext(GlobalContext)
    const provinceId = getData("provinceId")
    const cityId = getData("cityId")
    const [provErr, setProvErr] = useState('')
    const [cityErr, setCityErr] = useState('')
    const [areaErr, setAreaErr] = useState('')
    const [selectedProv, setSelectedProve] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    const { allProvinces, isAllProvincesErr, allProvincesErr } = useAllProvinces()
    const { provinceCities, isProvinceCitiesErr, provinceCitiesErr } = useProvinceCities(selectedProv)
    const { cityAreas, isCityAreasErr, cityAreasErr } = useCityAreas(selectedCity)

    useErrorHandler(isAllProvincesErr, allProvincesErr, null, setProvErr)
    useErrorHandler(isAllProvincesErr, allProvincesErr, null, setCityErr)
    useErrorHandler(isCityAreasErr, cityAreasErr, null, setAreaErr)

    useEffect(() => {
        if (provinceId) setSelectedProve(provinceId)
        if (cityId) setSelectedCity(cityId)
    }, [provinceId, cityId])

    useEffect(() => {
        if (allProvinces && values.province_id) {
            setAddress(prev => ({
                ...prev,
                province: allProvinces?.find(prov => prov.id == values.province_id)?.name || ''
            }))
        }
        if (provinceCities && values.city_id) {
            setAddress(prev => ({
                ...prev,
                city: provinceCities?.find(city => city.id == values.city_id)?.name || ''
            }))
        }
        if (cityAreas && values.area) {
            setAddress(prev => ({
                ...prev,
                area: cityAreas?.find(area => area.id == values.area)?.name || ''
            }))
        }
    }, [values, allProvinces, provinceCities, cityAreas])

    return (
        <>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                {!!provErr && <Typography variant='subtitle1' color='error'>{provErr}</Typography>}
                <FormControl fullWidth
                    error={touched.province_id && Boolean(errors.province_id)}>
                    <InputLabel>استان *</InputLabel>
                    <Select
                        value={allProvinces ? values.province_id : ""}
                        onChange={(e) => setFieldValue("province_id", e.target.value)}
                        label="استان"
                    >
                        {!!allProvinces && allProvinces.map(prov => (
                            <MenuItem key={prov.id} value={prov.id}
                            onClick={() => {
                                setSelectedProve(prov.id)
                                setAddress(prev => ({ ...prev, province: prov.name }))
                            }}>
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
                    <InputLabel>شهرستان *</InputLabel>
                    <Select
                        value={provinceCities ? values.city_id : ""}
                        onChange={(e) => setFieldValue("city_id", e.target.value)}
                        label="شهرستان"
                    >
                        {!!provinceCities && provinceCities?.map(city => (
                            <MenuItem key={city.id} value={city.id}
                            onClick={() => {
                                setSelectedCity(city.id)
                                setAddress(prev => ({ ...prev, city: city.name }))
                            }}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.city_id && errors.city_id}
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <FormControl fullWidth
                    error={touched.area && Boolean(errors.area)}>
                    <InputLabel>منطقه *</InputLabel>
                    <Select
                        value={cityAreas ? values.area : ""}
                        onChange={(e) => setFieldValue("area", e.target.value)}
                        label="منطقه"
                    >
                        {!!cityAreas && cityAreas?.map(area => (
                            <MenuItem key={area.id} value={area.id}
                            onClick={() => setAddress(prev => ({ ...prev, area: area.name }))}>
                                {area.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.area && errors.area}
                        {!!areaErr && <Typography component="span" variant='subtitle1' color='error'>{areaErr}</Typography>}
                    </FormHelperText>
                </FormControl>
            </Grid>
        </>
    )
}
