import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({ title, addRoute, isMobile, children, AddIcon }) {
    const navigate = useNavigate()

    return (
        <Box
            width="100%"
            sx={{
                mb: 3, display: 'flex', justifyContent:
                    'space-between', alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row-reverse',
            }}
        >

            <IconButton size='large' title={`افزودن ${title}`} color='primary'
                sx={{ border: '1px solid #2253c5ff', mb: 2 }}
                onClick={() => navigate(addRoute)}
            >
                <AddIcon sx={{ fontSize: "3rem" }} />
            </IconButton>

            {children}
        </Box>
    )
}
