import { useState, useMemo, useEffect } from 'react'
import { Box, Tab, Tabs } from '@mui/material'

import SubsPersonalInfos from './SubsPersonalInfos';
import SubscriberTicketsTable from '../ticket/SubscriberTicketsTable';

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

export default function SubsTabPanel({ rowData }) {
    const [value, setValue] = useState(0)
    const [ticketsProp, setTicketsProps] = useState(null)

    useEffect(() => {
        if(rowData) {
            if (value === 5) setTicketsProps(rowData.id)
        }
    }, [rowData, value])

    const TabPanelItems = useMemo(() => ([
        { label: "مشخصات فردی مشترک", component: <SubsPersonalInfos rowData={rowData} /> },
        { label: "بستر ارتباطی", component: <h1>بستر ارتباطی</h1> },
        { label: "اشتراک تلفن ثابت", component: <h1>اشتراک تلفن ثابت</h1> },
        { label: "اشتراک سرویس اینترنت", component: <h1>اشتراک سرویس اینترنت</h1> },
        { label: "تجهیزات انتهایی", component: <h1>تجهیزات انتهایی</h1> },
        { label: "کارتابل تیکت ها", component: <SubscriberTicketsTable subsId={ticketsProp} /> },
    ]))

    const handleChange = (_, newValue) => setValue(newValue)

    return (
        <Box width="95%" border="1px solid #fff" p={1} mt={3}>
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
