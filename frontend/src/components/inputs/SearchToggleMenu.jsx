import { useState, useRef } from "react";
import {
    TextField,
    Paper,
    List,
    ListItemButton,
    Popper,
    Typography,
    Box,
    ClickAwayListener
} from "@mui/material";

export default function SearchToggleMenu({ 
    data, field, setSelected, setValue, label, setHandler=null 
}) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const filteredData = data?.filter(item => {
        return item[field.title].toLowerCase().includes(query.toLowerCase())
    })

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setOpen(val.length > 0);
    };

    const handlePick = (item) => {
        setValue(item[field.value])
        setSelected(item[field.value]);
        setQuery(item[field.title]);
        if(setHandler && field?.set) setHandler(item[field?.set])
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box my={1} width="100%">
                {/* Search Box */}
                <TextField
                    label={label}
                    fullWidth
                    inputRef={anchorRef}
                    value={query}
                    onChange={handleSearchChange}
                />

                {/* Toggle Menu (Popper) */}
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    style={{ width: anchorRef.current?.offsetWidth }}
                    sx={{
                        zIndex: 1300,
                        position: 'absolute',
                        width: anchorRef.current?.offsetWidth
                    }}
                >
                    <Paper elevation={4}>
                        {filteredData.length > 0 ? (
                            <List>
                                {filteredData.map((item, idx) => (
                                    <ListItemButton
                                        key={idx}
                                        onClick={() => handlePick(item)}
                                    >
                                        <Typography>{item[field.title]}</Typography>
                                    </ListItemButton>
                                ))}
                            </List>
                        ) : (
                            <Typography style={{ padding: 10 }}>موردی یافت نشد</Typography>
                        )}
                    </Paper>
                </Popper>
            </Box>
        </ClickAwayListener>

    );
}
