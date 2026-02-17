import { useState } from "react";
import { IconButton, Box, Typography, FormHelperText } from "@mui/material";
import { Upload, Delete } from '@mui/icons-material';

export default function FileInput({
    name, label, setFieldValue, formats, helper, error, 
    // object, removeHandler
}) {
    const [filename, setFilename] = useState(null)

    const handleSelectedFile = (event) => {
        const file = event.currentTarget.files[0]
        setFieldValue(name, file)
        setFilename(file.name)
    }

    return (
        <Box mb={2}
            sx={{
                border: 1,
                borderRadius: 2,
                borderColor: error ? "error.main" : "#aaa"
            }}
            p={1}
        >
            <input
                id={name}
                type="file"
                name={name}
                style={{ display: 'none' }}
                accept={formats}
                onChange={handleSelectedFile}
            />
            <label htmlFor={name}>
                <IconButton component="span" color="primary">
                    <Typography>{label}</Typography>
                    <Upload />
                </IconButton>
            </label>

            {filename && (
                <Typography variant="subtitle2">
                    فایل انتخاب شده: <strong>{filename}</strong>
                </Typography>
            )}

            {/* <IconButton
                component="span"
                color="error"
                sx={{ display: user.avatar ? '' : 'none' }}
                onClick={removeHandler}
            >
                <Typography>حذف تصویر کنونی</Typography>
                <Delete />
            </IconButton> */}

            <FormHelperText error={!!error} sx={{ fontSize: 15 }} component="div">
                {error || (
                    <div>
                        <p style={{ margin: 0, padding: 0 }}>{helper.split('|')[0]}</p>
                        <p style={{ margin: 0, padding: 0 }}>{helper.split('|')[1]}</p>
                    </div>
                )}
            </FormHelperText>
        </Box>
    )
}
