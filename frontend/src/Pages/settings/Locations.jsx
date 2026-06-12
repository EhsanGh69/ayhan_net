import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LocationPin } from '@mui/icons-material';

import MainPage from '../MainPage';
import { useAllProvinces, useProvinceCities, useCityAreas } from '../../hooks/useLocation'
import useErrorHandler from '../../hooks/useErrorHandler'
import SnackAlert from '../../components/SnackAlert';
import CreateLocationModal from '../../components/settings/CreateLocationModal';
import ProvincesList from '../../components/settings/ProvincesList';
import CitiesList from '../../components/settings/CitiesList';
import AreasList from '../../components/settings/AreasList';

export default function Locations() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [locationName, setLocationName] = useState('')

    const [selectedLocation, setSelectedLocation] = useState('')
    const [title, setTitle] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const { allProvinces, allProvincesErr, isAllProvincesErr } = useAllProvinces()
    useErrorHandler(isAllProvincesErr, allProvincesErr, setSnackbar)

    const { provinceCities, isProvinceCitiesErr, provinceCitiesErr } = useProvinceCities(selectedProvince)
    useErrorHandler(isProvinceCitiesErr, provinceCitiesErr, setSnackbar)

    const { cityAreas, isCityAreasErr, cityAreasErr } = useCityAreas(selectedCity)
    useErrorHandler(isCityAreasErr, cityAreasErr, setSnackbar)

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <LocationPin fontSize='large' sx={{ fontSize: '3rem', mr: 2 }} />
                    <span>استان ها - شهرستان ها - مناطق</span>
                </Typography>
            </Box>

            <CreateLocationModal
                closeHandler={() => {
                    setModalOpen(false)
                    setSelectedLocation('')
                    setTitle('')
                }}
                open={modalOpen}
                setSnackbar={setSnackbar}
                title={title}
                selectedLocation={selectedLocation}
                locationName={locationName}
                setLocationName={setLocationName}
            />

            <Paper
                sx={{
                    width: '95%', p: 2,
                    border: '1px solid #000',
                    backgroundColor: '#d8d8d8',
                }}
            >
                <Box
                    width={{ xs: '100%', sm: '80%', md: "60%", lg: "50%", xl: "30%" }}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    margin="auto"
                >
                    {allProvinces && (
                        <>
                            <ProvincesList
                                allProvinces={allProvinces}
                                selectedProvince={selectedProvince}
                                setSelectedProvince={setSelectedProvince}
                                setSelectedCity={setSelectedCity}
                                setModalOpen={setModalOpen}
                                setTitle={setTitle}
                                setLocationName={setLocationName}
                            />

                            <CitiesList
                                provinceCities={provinceCities}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                selectedProvince={selectedProvince}
                                setSelectedLocation={setSelectedLocation}
                                setModalOpen={setModalOpen}
                                setTitle={setTitle}
                                setLocationName={setLocationName}
                            />

                            {(selectedCity && cityAreas) && (
                                <AreasList
                                    cityAreas={cityAreas}
                                    selectedCity={selectedCity}
                                    setSelectedLocation={setSelectedLocation}
                                    setModalOpen={setModalOpen}
                                    setTitle={setTitle}
                                    setLocationName={setLocationName}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Paper>

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}