import { useState, useMemo } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

import ManageTicketsTable from './ManageTicketsTable'
import TicketsRefersList from './TicketsRefersList'

function TabPanel({ children, value, index }) {
    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box p={2} fontFamily="Vazir" border="1px solid #000" mt={2}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function ManageTicketsPanel() {
    const [value, setValue] = useState(0)

    const TabPanelItems = useMemo(() => ([
        { label: "لیست تیکت ها", component: <ManageTicketsTable /> },
        { label: "لیست ارجاعات تیکت ها", component: <TicketsRefersList /> },
    ]))

    const handleChange = (_, newValue) => setValue(newValue)

    return (
        <Box width="95%" p={1} mt={3}>
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
