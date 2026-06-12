import { useEffect, useState } from 'react'
import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'
import { AddLocation } from '@mui/icons-material'

import { useCreateProvince, useCreateCity, useCreateArea } from "../../hooks/useLocation"
import { modalBox } from "../../styles/globalStyles"
import useErrorHandler, { isPersian } from '../../hooks/useErrorHandler'


export default function CreateLocationModal({
    open, closeHandler, selectedLocation = '', title, setSnackbar, locationName, setLocationName
}) {
    const [notPersian, setNotPersian] = useState(false)

    useEffect(() => {
        if(locationName.trim()) setNotPersian(!isPersian(locationName))
        else setNotPersian(false)
    }, [locationName])

    const { createProvince, createProvinceErr, isCreateProvinceErr } = useCreateProvince()
    useErrorHandler(isCreateProvinceErr, createProvinceErr, setSnackbar)

    const { createCity, createCityErr, isCreateCityErr } = useCreateCity()
    useErrorHandler(isCreateCityErr, createCityErr, setSnackbar)

    const { createArea, createAreaErr, isCreateAreaErr } = useCreateArea()
    useErrorHandler(isCreateAreaErr, createAreaErr, setSnackbar)

    if (isCreateProvinceErr || isCreateCityErr || isCreateAreaErr) closeHandler()

    const createLocationHandler = async () => {
        switch (title) {
            case "استان":
                await createProvince({ name: locationName.trim() })
                break;
            case "شهرستان":
                await createCity({ name: locationName.trim(), province_id: selectedLocation })
                break;
            case "منطقه":
                await createArea({ name: locationName.trim(), city_id: selectedLocation })
                break;
            default:
                throw new Error("title not valid!")
        }
        setSnackbar({ open: true, message: `${title} جدید با موفقیت ایجاد شد`, severity: 'success' })
        closeHandler()
    }

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox}
                width={{ xs: "80%", sm: "50%", md: "45%", lg: "30%", xl: "25%" }}>
                <Typography
                    variant='h5' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <AddLocation fontSize='large' color='info' sx={{ fontSize: '2.5rem' }} />
                    افزودن {title} جدید
                </Typography>

                <FormControl fullWidth>
                    <TextField
                        autoComplete='off'
                        label={`نام ${title}`}
                        value={locationName.trimStart()}
                        onChange={(e) => setLocationName(e.target.value)}
                        error={notPersian}
                        helperText={notPersian && "لطفا حروف فارسی وارد کنید"}
                        sx={{ mb: 2 }}
                    />

                    <Box>
                        <Button
                            disabled={!locationName.trim() || notPersian}
                            color='primary' sx={{ mr: 2 }}
                            variant='contained'
                            onClick={createLocationHandler}
                        >
                            ذخیره
                        </Button>
                        <Button
                            color='secondary'
                            variant='outlined'
                            onClick={closeHandler}
                        >
                            انصراف
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Modal>
    )
}
