import { useState, useMemo } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

import UnknownStatusTable from './UnknownStatusTable'
import ChangeTechStatusTable from './ChangeTechStatusTable'
import NewApplicantTable from './NewApplicantTable'
import WaitingStablishTable from './WaitingStablishTable'


function TabPanel({ children, value, index }) {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box p={2} fontFamily="Vazir" mt={2}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function PhoneSubscriptionPanel() {
    const [value, setValue] = useState(0)

    const TabPanelItems = useMemo(() => ([
        { label: "وضعیت نامشخص", component: <UnknownStatusTable /> },
        { label: "نیاز به تغییر تکنولوژی", component: <ChangeTechStatusTable /> },
        { label: "ثبت نام جدید", component: <NewApplicantTable /> },
        { label: "در انتظار دایری", component: <WaitingStablishTable /> },
    ]))

    const handleChange = (_, newValue) => setValue(newValue)

    return (
        <Box width="100%" p={1} mt={3}>
            <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons>
                {TabPanelItems.map((item, index) => (
                    <Tab key={index} label={item.label} style={{ fontSize: 16 }} />
                ))}
            </Tabs>
            {TabPanelItems.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {item.component}
                </TabPanel>
            ))}
        </Box>
    )
}