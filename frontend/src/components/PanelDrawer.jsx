import { useState } from 'react';
import { 
    Avatar, Box, Chip, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography
} from '@mui/material'
import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import DrawerMenuItem from './DrawerMenuItem';
import { menuItems } from '../constants/menuItems'

export default function PanelDrawer({ open, user, drawerWidth, handleLogout, isTemp, setOpen }) {
    const navigate = useNavigate()
    const [openMenus, setOpenMenus] = useState({})

    const handleDrawerClose = () => {
        if (isTemp) {
            setOpen(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isTemp) {
            handleDrawerClose();
        }
    };

    return (
        <Drawer
            sx={{
                width: open ? drawerWidth : 0,
                transition: (theme) => theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                        ? theme.transitions.duration.enteringScreen
                        : theme.transitions.duration.leavingScreen,
                }),
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                    borderLeft: 'none',
                    left: 0,
                    right: 'auto',
                },
            }}
            variant={isTemp ? 'temporary' : 'persistent'}
            anchor="left"
            open={open}
            ModalProps={{ keepMounted: true }}
            onClose={handleDrawerClose}
        >

            <Box p={2} textAlign='center' bgcolor='primary.light' color='whitesmoke'>
                <Avatar
                    sx={{
                        width: 80, height: 80, mx: 'auto', mb: 1,
                        bgcolor: 'primary.main', fontSize: '2rem'
                    }}
                >
                    <PersonIcon />
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {user?.full_name || user?.username}
                </Typography>
                {user?.is_superuser && (
                    <Chip label="مدیر" size="small" color="success" sx={{ mt: 1 }} />
                )}
                {!user?.is_superuser && user?.is_staff && (
                    <Chip label="کارمند" size="small" color="primary" sx={{ mt: 1 }} />
                )}
            </Box>

            <Divider />

            <List component='nav' sx={{ flexGrow: 1, overflow: 'auto' }}>
                {menuItems.map((item, idx) => (
                    <DrawerMenuItem
                        key={idx}
                        item={item}
                        handleNavigation={handleNavigation}
                        openMenus={openMenus}
                        setOpenMenus={setOpenMenus}
                    />
                ))}
            </List>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="خروج" sx={{ color: 'error.main' }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}
