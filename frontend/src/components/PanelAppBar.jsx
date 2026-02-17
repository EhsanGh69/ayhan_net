import { 
    AppBar, Avatar, CircularProgress, IconButton, ListItemIcon, ListItemText, 
    Menu, MenuItem, Toolbar, Typography, Divider
} from '@mui/material'
import { 
    Logout as LogoutIcon, Person as PersonIcon, ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function PanelAppBar({
    user, handleDrawerToggle, handleMenuOpen, handleMenuClose, anchorEl, 
    drawerWidth, open, handleLogout, isLoggingOut
}) {
    const navigate = useNavigate()

    return (
        <AppBar 
            position='fixed' 
            sx={{
                // zIndex: (theme) => theme.zIndex.drawer + 1,
                left: 0,
                right: 'auto',
                transition: (theme) => theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                width: { xs: '100%', sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
                ml: { xs: 0, sm: open ? `${drawerWidth}px` : 0 }
            }}
        >
            <Toolbar>
                <IconButton edge='start' color='inherit' onClick={handleDrawerToggle} 
                    sx={{ ml: 'auto', mr: 0 }}>
                    {open ? <ChevronRightIcon /> : <MenuIcon />}
                </IconButton>

                <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
                    پنل آیهان نت
                </Typography>

                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }} disabled={isLoggingOut}>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <PersonIcon />
                    </Avatar>
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <ListItemText sx={{ textAlign: "center" }}>{user?.username}</ListItemText>
                    <Divider />
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                        <ListItemIcon><PersonIcon fontSize='small' /></ListItemIcon>
                        <ListItemText>پروفایل</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
                        <ListItemIcon>
                            {isLoggingOut ? <CircularProgress size={20} /> : <LogoutIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText>{isLoggingOut ? 'در حال خروج...' : 'خروج'}</ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
