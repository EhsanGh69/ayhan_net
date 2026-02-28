import { Badge, Box, Grid, Typography, Divider } from '@mui/material'
import { useMemo } from 'react'
import moment from "jalali-moment"

export default function SubsPersonalInfos({ rowData }) {
    const infoStyles = {
        bgcolor: "primary.main",
        display: 'flex',
        justifyContent: 'space-around',
        p: 2,
        borderRadius: 2,
        color: 'whitesmoke'
    }

    const jDate = moment(rowData.birth_date)

    const infoItems = useMemo(() => ([
        { name: 'subscriber_type', label: 'نوع مشترک', 
            value: rowData.subscriber_type === 'real' ? 'حقیقی' : 'حقوقی'
        },
        { name: 'first_name', label: 'نام'},
        { name: 'last_name', label: 'نام خانوادگی'},
        { name: 'national_id', label: 'کد ملی'},
        { name: 'certificate_number', label: 'شماره شناسنامه'},
        { name: 'birth_date', label: 'تاریخ تولد', 
            value: `${jDate.jYear()}/${jDate.jMonth()}/${jDate.jDay()}`
        },
        { name: 'father_name', label: 'نام پدر'},
        { name: 'mobile', label: 'شماره همراه'},
        { name: 'phone', label: 'شماره تلفن'},
        { name: 'province', label: 'استان'},
        { name: 'city', label: 'شهر'},
        { name: 'area', label: 'منطقه'},
        { name: 'main_street', label: 'خیابان اصلی'},
        { name: 'side_street', label: 'خیابان فرعی'},
        { name: 'alley', label: 'کوچه'},
        { name: 'building_name', label: 'نام ساختمان'},
        { name: 'house_number', label: 'پلاک'},
        { name: 'postal_code', label: 'کد پستی'}
    ]))

    return (
        <Grid container gap={2} width="100%">
            {infoItems.map(item => (
                <Grid size={{ xs: 12, md: 3 }} key={item.name}>
                    <Typography sx={{ ...infoStyles }} component='p'>
                        <span>{item.label}</span>{"-"}
                        <b>{item?.value ? item?.value : rowData[item.name]}</b>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
}
