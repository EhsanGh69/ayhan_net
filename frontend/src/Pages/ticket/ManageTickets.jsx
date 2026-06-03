import { Paper } from '@mui/material';

import MainPage from '../../Pages/MainPage'
import ManageTicketsPanel from '../../components/ticket/ManageTicketsPanel';

export default function ManageTickets() {

    return (
        <MainPage>
            <Paper
                sx={{
                    width: '95%', p: 2,
                    border: '1px solid #000',
                    backgroundColor: '#c2bfbf',
                }}
            >
                <ManageTicketsPanel />
            </Paper>
        </MainPage>
    )
}
