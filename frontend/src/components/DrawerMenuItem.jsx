import { useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from 'react-router-dom';


const DrawerMenuItem = ({ item, level = 0, handleNavigation, openMenus, setOpenMenus }) => {
    const location = useLocation()

    const hasChildren = item.children && item.children.length > 0;
    const isSelected = !hasChildren && (location.pathname === item.path ||
        item?.subPaths?.some(subPath => location.pathname.includes(subPath)))
    const Icon = item.icon

    const shouldBeOpen = () => {
        if (!hasChildren) return false

        return item.children.some(child =>
            child.path === location.pathname ||
            child?.subPaths?.some(subPath => location.pathname.includes(subPath)))
    }

    useEffect(() => {
        if (shouldBeOpen() && !openMenus[item.title]) {
            setOpenMenus(prev => ({ ...prev, [item.title]: true }))
        }
    }, [location.pathname])

    const handleItemClick = () => {
        if (hasChildren) {
            setOpenMenus(prev => ({
                ...prev,
                [item.title]: !prev[item.title]
            }));
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
                        bgcolor: hasChildren && !!openMenus[item.title] ? '#cecacaff' : 'white',
                        border: hasChildren ? "1px solid #ddd" : null,
                        '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            color: 'whitesmoke',
                            cursor: 'pointer',
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
                            primary: { fontSize: '1.1rem', fontWeight: isSelected ? 600 : 400 }
                        }}
                    />
                    {hasChildren && (!!openMenus[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </ListItem>

            {hasChildren && (
                <Collapse in={!!openMenus[item.title]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child, idx) => (
                            <DrawerMenuItem
                                key={idx}
                                item={child}
                                handleNavigation={handleNavigation}
                                level={level + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </Box>
    )
}

export default DrawerMenuItem;