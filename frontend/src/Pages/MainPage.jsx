import { useEffect, useMemo, useState } from 'react';
import { Box, Toolbar, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';
import PanelAppBar from '../components/PanelAppBar';
import PanelDrawer from '../components/PanelDrawer';

export default function MainPage({ children }) {
  const drawerWidth = useMemo(() => 280);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, isLoading } = useUser()

  useEffect(() => {
    setOpen(!isMobile);
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

  return (
    <Box display="flex" width="100%">
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
        component='main' 
        flexGrow={1} p={3}
        sx={{
          width: "90%",
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          // ml: { xs: 0, md: open ? `${drawerWidth}px` : 0}
          m: 0
        }}
      >
        <Toolbar /> {/* for distance from AppBar */}

        {children}
      </Box>
    </Box>
  )
}
