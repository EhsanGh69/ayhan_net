import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Add } from "@mui/icons-material"


export default function ProvincesList({ 
    allProvinces, selectedProvince, setSelectedProvince, setSelectedCity, setTitle, setModalOpen,
    setLocationName
}) {
    return (
        <Box display="flex">
            <FormControl fullWidth>
                <InputLabel>استان</InputLabel>
                <Select
                    value={selectedProvince}
                    label='استان'
                    onChange={(e) => {
                        setSelectedProvince(e.target.value)
                        setSelectedCity('')
                    }}
                >
                    {allProvinces?.length
                        ? allProvinces?.map((province) => (
                            <MenuItem key={province.id} value={province.id}>
                                {province.name}
                            </MenuItem>
                        )) : (
                            <MenuItem value="">استانی وجود ندارد</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <Button
                variant='outlined'
                sx={{ ml: 1 }}
                color='success'
                title='افزودن استان جدید'
                onClick={() => {
                    setTitle('استان')
                    setLocationName('')
                    setModalOpen(true)
                }}
            >
                <Add fontSize='large' />
            </Button>
        </Box>
    )
}