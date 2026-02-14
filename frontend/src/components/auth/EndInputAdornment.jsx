import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function EndInputAdornment({ showPassword, setShowPassword }) {
    return (
        <InputAdornment position='end'>
            <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    )
}
