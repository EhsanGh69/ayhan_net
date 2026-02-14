import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

export const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Vazir'
    },
    // palette: {
    //     primary: {
    //         main: '#1976d2'
    //     },
    //     secondary: {
    //         main: '#dc004e'
    //     }
    // }
    shape: {
        borderRadius: 8
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    }
}, faIR)