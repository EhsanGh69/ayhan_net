import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Add } from "@mui/icons-material"


export default function CitiesList({
    provinceCities, selectedProvince, selectedCity, setSelectedCity, setSelectedLocation, setModalOpen,
    setTitle
}) {
    return (
        <Box display="flex">
            <FormControl fullWidth>
                <InputLabel>شهرستان</InputLabel>
                <Select
                    disabled={!selectedProvince}
                    value={selectedCity}
                    label='شهرستان'
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    {provinceCities ?
                        provinceCities?.length ?
                            provinceCities?.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.name}
                                </MenuItem>
                            ))
                            : (
                                <MenuItem value="">شهرستانی وجود ندارد</MenuItem>
                            )
                        : (
                            <MenuItem value=''>استان را انتخاب کنید</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <Button
                variant='outlined'
                sx={{ ml: 1 }}
                color='success'
                title='افزودن شهرستان جدید'
                disabled={!selectedProvince}
                onClick={() => {
                    setSelectedLocation(selectedProvince)
                    setTitle('شهرستان')
                    setModalOpen(true)
                }}
            >
                <Add fontSize='large' />
            </Button>
        </Box>
    )
}