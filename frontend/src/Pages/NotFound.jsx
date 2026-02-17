import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function NotFound() {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={24}
                    sx={{
                        p: { xs: 4, sm: 6 },
                        borderRadius: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '6rem', sm: '8rem' },
                            fontWeight: 900,
                            color: 'primary.main',
                            mb: 2,
                        }}
                    >
                        404
                    </Typography>

                    <Typography variant="h4" gutterBottom>
                        صفحه مورد نظر پیدا نشد!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        صفحه‌ای که به دنبال آن هستید نیست یا حذف شده است.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            startIcon={<HomeIcon />}
                            onClick={() => navigate('/')}
                        >
                            خانه
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            بازگشت
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

