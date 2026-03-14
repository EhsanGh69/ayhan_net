import { useState } from 'react'
import { Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { Clear, Search as SearchIcon } from '@mui/icons-material'

import SearchToggleMenu from '../inputs/SearchToggleMenu'

export default function SelectTicketCartable({ 
    ticketCartableStaffs, setFieldValue, values, touched, errors
}) {
    const [selectedCartable, setSelectedCartable] = useState('')
    const [showSearchCartable, setShowSearchCartable] = useState(false)

    return (
        <Box width={{ xs: "100%", md: "60%" }}
            border={showSearchCartable ? "1px solid gray" : "none"}
            p={showSearchCartable ? 1.5 : 0} borderRadius={showSearchCartable ? 2 : 0}
        >
            <Box display="flex" alignItems="center">
                <FormControl fullWidth
                    error={touched.staff_id && Boolean(errors.staff_id)}>
                    <InputLabel>انتخاب کارتابل *</InputLabel>
                    <Select
                        value={selectedCartable ? selectedCartable : values.staff_id ? values.staff_id : ''}
                        onChange={(e) => setFieldValue("staff_id", e.target.value)}
                        label="انتخاب کارتابل"
                        disabled={!values.isRefer}
                        sx={{ textAlign: 'left' }}
                    >
                        {!!ticketCartableStaffs && ticketCartableStaffs.map(staff => (
                            <MenuItem key={staff.id} value={staff.id}>
                                {staff.display_name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                        {touched.staff_id && errors.staff_id}
                    </FormHelperText>
                </FormControl>
                <IconButton
                    sx={{ ml: 1, border: `1px solid ${!values.isRefer ? 'gray' : 'purple'}` }}
                    onClick={() => setShowSearchCartable(true)}
                    disabled={!values.isRefer}
                >
                    <SearchIcon sx={{ color: !values.isRefer ? "gray" : "secondary.main" }} />
                </IconButton>
            </Box>
            {!!ticketCartableStaffs && (
                <Box display={showSearchCartable ? "flex" : "none"}
                    alignItems="center">
                    <SearchToggleMenu
                        data={ticketCartableStaffs}
                        field={{ title: "display_name", value: "id" }}
                        label="جستجو در کارتابل تیکت ها ..."
                        setSelected={setSelectedCartable}
                        setValue={(value) => setFieldValue("staff_id", value)}
                    />
                    <IconButton
                        sx={{ ml: 1, border: "1px solid red" }}
                        onClick={() => setShowSearchCartable(false)}
                    >
                        <Clear color='error' />
                    </IconButton>
                </Box>
            )}
        </Box>
    )
}
