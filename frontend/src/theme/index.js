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
    // },
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
        },
        MuiTableCell: {
            styleOverrides: {
                body: {
                    fontSize: "1.1rem"
                },
                head: {
                    fontSize: "1.11rem",
                    fontWeight: 800
                },
            }
        }
    }
}, faIR)