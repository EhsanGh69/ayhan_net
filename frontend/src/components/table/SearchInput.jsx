import { InputAdornment, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import styles from '../../styles/CustomStyles.module.css'

export default function SearchInput({ title, searchTerm, setSearchTerm }) {
    return (
        <TextField
            variant='outlined'
            placeholder={`جستجو در ${title} ...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
                input: {
                    className: styles.customPlaceholderInput,
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon color='#4a4848' />
                        </InputAdornment>
                    )
                }
            }}
            sx={{ minWidth: 400 }}
        />
    )
}
