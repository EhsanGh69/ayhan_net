import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Settings as SettingsIcon, LocationPin } from '@mui/icons-material';

import MainPage from '../MainPage';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate()

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <SettingsIcon fontSize='large' sx={{ fontSize: '3rem', mr: 2 }} />
                    <span>تنظیمات</span>
                </Typography>
            </Box>

            <Grid container spacing={3} mb={4}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card 
                        elevation={2} sx={{ cursor: 'pointer' }} 
                        onClick={() => navigate('/settings/locations')}
                    >
                        <CardContent>
                            <Typography  component="div">
                                <LocationPin sx={{ fontSize: 50 }} color='error' />
                            </Typography>
                            <Typography variant="h5" color='info' gutterBottom>
                                استان ها - شهرستان ها - مناطق
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MainPage>
    )
}
