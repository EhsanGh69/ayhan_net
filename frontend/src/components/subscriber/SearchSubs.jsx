import { useMemo } from 'react'
import {
    Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField
} from '@mui/material'
import { Search as SearchIcon, Cancel } from '@mui/icons-material'

import styles from '../../styles/CustomStyles.module.css'

export default function SearchSubs({
    fieldInput, setFieldInput, queryInput, setQueryInput, setSearchParams
}) {
    const SEARCH_ITEMS = useMemo(() => ([
        { name: "first_name", label: "نام" },
        { name: "last_name", label: "نام خانوادگی" },
        { name: "national_id", label: "کد ملی" },
        { name: "phone", label: "شماره تلفن" },
        { name: "subscriber_code", label: "کد رهگیری" },
        { name: "net_username", label: "نام کاربری اینترنت" },
    ]))

    return (
        <Box display="flex"
            justifyContent={{ xs:"end", md: 'center' }}
            alignItems={{ xs: 'start', md: 'center'}}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            <FormControl>
                <InputLabel>جستجو در ...</InputLabel>
                <Select
                    value={fieldInput}
                    onChange={(e) => setFieldInput(e.target.value)}
                    label="جستجو در"
                    sx={{ minWidth: 200 }}
                >
                    {SEARCH_ITEMS.map(item => (
                        <MenuItem key={item.name} value={item.name}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box mt={{ xs: 1, md: 0 }} ml={{ xs: 0, md: 1 }}>
                <TextField
                    variant='outlined'
                    placeholder='عبارت جستجو'
                    autoComplete='off'
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    sx={{ minWidth: 300 }}
                    disabled={!fieldInput}
                    slotProps={{
                        input: {
                            className: styles.customPlaceholderInput,
                            endAdornment: (
                                <InputAdornment position='end' 
                                    sx={{ 
                                        cursor: 'pointer',
                                        display: !fieldInput && !queryInput ? 'none' : 'inherit'
                                    }}
                                    onClick={() => {
                                        setSearchParams(prev => ({ ...prev, field: '', query: '' }))
                                        setFieldInput('')
                                        setQueryInput('')
                                    }}
                                >
                                    <Cancel color='error' sx={{ fontSize: 30 }} />
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <IconButton size='large' disabled={!fieldInput && !queryInput}
                    sx={{ border: '1px solid #6322c5', ml: 1 }}
                    onClick={() => {
                        setSearchParams(prev => ({ ...prev, field: fieldInput, query: queryInput }))
                    }}
                >
                    <SearchIcon sx={{ fontSize: 25, color: '#6322c5' }} />
                </IconButton>
            </Box>
        </Box>
    )
}
