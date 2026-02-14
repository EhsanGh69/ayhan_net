import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from 'react-router-dom';


const DrawerMenuItem = ({ item, level = 0, handleNavigation }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const location = useLocation()

    const hasChildren = item.children && item.children.length > 0;
    const isSelected = !hasChildren && location.pathname === item.path
    const Icon = item.icon

    const handleItemClick = () => {
        if (hasChildren) {
            setOpenMenu(!openMenu)
        } else {
            handleNavigation(item.path)
        }
    }

    return (
        <Box>
            <ListItem key={item.title} disablePadding>
                <ListItemButton
                    onClick={handleItemClick}
                    selected={isSelected}
                    sx={{
                        pr: level * 3 + 2,
                        '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            color: 'whitesmoke',
                            cursor: 'inherit',
                            '& .MuiListItemIcon-root': {
                                color: 'whitesmoke'
                            },
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                opacity: 1
                            }
                        },
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                            opacity: 1,
                            color: 'whitesmoke',
                            '& .MuiListItemIcon-root': {
                                color: 'whitesmoke'
                            },
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={item.title} 
                        slotProps={{
                            primary: { fontSize: '0.9rem', fontWeight: isSelected ? 600 : 400 }
                        }}
                    />
                    {hasChildren && (openMenu ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>

            {hasChildren && (
                <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map(child => (
                            <DrawerMenuItem item={child} handleNavigation={handleNavigation} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            )}
        </Box>
    )
}

export default DrawerMenuItem;