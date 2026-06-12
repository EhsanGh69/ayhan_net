import { Paper } from '@mui/material';

import MainPage from '../../Pages/MainPage'
import PhoneSubscriptionPanel from '../../components/phoneSubscription/PhoneSubscriptionPanel';

export default function PhoneSubscription() {
    return (
        <MainPage>
            <Paper
                sx={{
                    width: '95%', p: 2,
                    border: '1px solid #000',
                    backgroundColor: '#c2bfbf',
                }}
            >
                <PhoneSubscriptionPanel />
            </Paper>
        </MainPage>
    )
}
