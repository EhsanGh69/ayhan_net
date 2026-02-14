import { useEffect, useMemo, useState } from 'react';
import { Box, Toolbar, Typography, Grid, Card, CardContent, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useUser } from '../hooks/userUser';
import { useAuth } from '../hooks/useAuth';
import PanelAppBar from '../components/PanelAppBar';
import PanelDrawer from '../components/PanelDrawer';

export default function Home() {
  const drawerWidth = useMemo(() => 280);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, isLoading } = useUser()

  useEffect(() => {
    setOpen(!isMobile);
    console.log(isMobile)
  }, [isMobile]);

  const handleDrawerToggle = () => setOpen(!open)
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const { logout, isLoggingOut } = useAuth()
  
  const handleLogout = () => {
      handleMenuClose()
      logout()
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress />
      </Box>
    )
  }

  const statsData = [
    { title: 'تعداد محصولات', value: '۰', color: '#1976d2' },
    { title: 'دسته‌بندی‌ها', value: '۱۲', color: '#2e7d32' },
    { title: 'کاربران فعال', value: '۵۶', color: '#ed6c02' },
    { title: 'سفارشات امروز', value: '۱۸', color: '#9c27b0' },
  ];

  return (
    <Box display="flex" width="100%" position="relative">
      <PanelAppBar
        user={user}
        anchorEl={anchorEl}
        handleDrawerToggle={handleDrawerToggle}
        handleMenuClose={handleMenuClose}
        handleMenuOpen={handleMenuOpen}
        drawerWidth={drawerWidth}
        open={open}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />

      <PanelDrawer 
        setOpen={setOpen}
        open={open} 
        user={user} 
        drawerWidth={drawerWidth} 
        handleLogout={handleLogout} 
        isMobile={isMobile}
      />

      <Box 
        component='main' flexGrow={1} p={3}
        sx={{
          width: "100%",
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          // ml: { xs: 0, md: open ? `${drawerWidth}px` : 0}
          m: 0
        }}
      >
        <Toolbar /> {/* for distance from AppBar */}

        <Grid container spacing={3} mb={4}>
          {statsData.map((stat, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Card elevation={2}>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
