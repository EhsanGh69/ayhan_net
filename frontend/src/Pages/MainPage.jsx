import { useEffect, useMemo, useState } from 'react';
import { Box, Toolbar, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';
import PanelAppBar from '../components/PanelAppBar';
import PanelDrawer from '../components/PanelDrawer';
import LoadingBox from '../components/LoadingBox';

export default function MainPage({ children }) {
  const drawerWidth = useMemo(() => 280);
  const theme = useTheme();
  const isTemp = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, isLoading } = useUser()

  useEffect(() => {
    setOpen(!isTemp);
  }, [isTemp]);

  const handleDrawerToggle = () => setOpen(!open)
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const { logout, isLoggingOut } = useAuth()
  
  const handleLogout = () => {
      handleMenuClose()
      logout()
  }

  if (isLoading) {
    return <LoadingBox />
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
        isTemp={isTemp}
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
          m: 0
        }}
      >
        <Toolbar /> {/* for distance from AppBar */}

        {children}
      </Box>
    </Box>
  )
}
