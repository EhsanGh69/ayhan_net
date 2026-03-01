import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SearchBox({
    title, addRoute = '', addHandler = null, isMobile, children, AddIcon, showAddBtn = true
}) {
    const navigate = useNavigate()

    return (
        <Box
            width="100%"
            sx={{
                mb: 3, display: 'flex', justifyContent:
                    'space-between', alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row',
            }}
        >
            {children}
            
            {showAddBtn && (
                <IconButton size='large' title={`افزودن ${title}`} color='primary'
                    sx={{ border: '1px solid #2253c5ff', mt: { xs: 2, sm: 0 } }}
                    onClick={() => {
                        if (Boolean(addHandler)) addHandler()
                        else if (addRoute) navigate(addRoute)
                    }}
                >
                    <AddIcon sx={{ fontSize: "3rem" }} />
                </IconButton>
            )}
        </Box>
    )
}
