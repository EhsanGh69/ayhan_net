import { useState } from 'react'
import { Autocomplete, Box, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Clear, Search as SearchIcon } from '@mui/icons-material'

import SearchToggleMenu from '../inputs/SearchToggleMenu'

export default function SelectTicketName({ 
    ticketsInGroup, groupId, setFieldValue, values, errors, touched 
}) {
    const [selectedName, setSelectedName] = useState('')
    const [showSearchName, setShowSearchName] = useState(false)

    return (
        // <Box width={{ xs: "100%", md: "60%" }}
        //     border={showSearchName ? "1px solid gray" : "none"}
        //     p={showSearchName ? 1.5 : 0} borderRadius={showSearchName ? 2 : 0}
        // >
        //     <Box display="flex" alignItems="center">
        //         <FormControl fullWidth
        //             error={touched.name && Boolean(errors.name)}>
        //             <InputLabel>نام تیکت *</InputLabel>
        //             <Select
        //                 value={selectedName ? selectedName : values.name ? values.name : ''}
        //                 onChange={(e) => setFieldValue("name", e.target.value)}
        //                 label="نام تیکت"
        //                 disabled={!groupId}
        //                 sx={{ textAlign: 'left' }}
        //             >
        //                 {!!ticketsInGroup && ticketsInGroup.map(ticket => (
        //                     <MenuItem key={ticket.id} value={ticket.name}
        //                         onClick={() => setFieldValue("content", ticket.description)}
        //                     >
        //                         {ticket.name}
        //                     </MenuItem>
        //                 ))}
        //             </Select>
        //             <FormHelperText>
        //                 {touched.name && errors.name}
        //             </FormHelperText>
        //         </FormControl>
        //         <IconButton
        //             sx={{ ml: 1, border: `1px solid ${!groupId ? 'gray' : 'purple'}` }}
        //             onClick={() => setShowSearchName(true)}
        //             disabled={!groupId}
        //         >
        //             <SearchIcon sx={{ color: !groupId ? "gray" : "secondary.main" }} />
        //         </IconButton>
        //     </Box>
        //     {!!ticketsInGroup && (
        //         <Box display={showSearchName ? "flex" : "none"}
        //             alignItems="center">
        //             <SearchToggleMenu
        //                 data={ticketsInGroup}
        //                 field={{ title: "name", value: "name", set: "description" }}
        //                 label="جستجو در نام تیکت ها ..."
        //                 setSelected={setSelectedName}
        //                 setValue={(value) => setFieldValue("name", value)}
        //                 setHandler={(desc) => setFieldValue("content", desc)}
        //             />
        //             <IconButton
        //                 sx={{ ml: 1, border: "1px solid red" }}
        //                 onClick={() => setShowSearchName(false)}
        //             >
        //                 <Clear color='error' />
        //             </IconButton>
        //         </Box>
        //     )}
        // </Box>

        <Autocomplete
        fullWidth
        disabled={!groupId}
        options={ticketsInGroup || []}
        disablePortal
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value?.name}
        filterOptions={(options, { inputValue }) => {
          if (!inputValue) return options
          return options.filter(option =>
            option.name.toLowerCase().includes(inputValue.toLowerCase())
            // || option.field.toLowerCase().includes(inputValue.toLowerCase())
          )
        }}
        noOptionsText="موردی یافت نشد"
        openOnFocus={true}
        onChange={(event, newValue) => {
            if(newValue) {
                setFieldValue("name", newValue.name);
                setFieldValue("content", newValue.description);
            }
        }}
        value={ticketsInGroup?.find(ticket => ticket.name === values.name) || null}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="نام تیکت"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box>
              <Typography variant="body1">{option.name}</Typography>
            </Box>
          </Box>
        )}
      />
    )
}
