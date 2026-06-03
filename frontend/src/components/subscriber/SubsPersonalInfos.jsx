import { useMemo } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { ArrowLeft, Remove } from '@mui/icons-material';
import moment from "jalali-moment";
import InfosTable from '../table/InfosTable';

export default function SubsPersonalInfos({ rowData }) {
    const infoStyles = useMemo(() => ({
        bgcolor: "info.dark",
        display: 'flex',
        justifyContent: 'space-around',
        p: 2,
        borderRadius: 2,
        color: 'whitesmoke'
    }))

    const infoItems = useMemo(() => ([
        {
            name: 'subscriber_type', label: 'نوع مشترک',
            value: rowData.subscriber_type === 'real' ? 'حقیقی' : 'حقوقی'
        },
        { name: 'first_name', label: 'نام', value: rowData.first_name },
        { name: 'last_name', label: 'نام خانوادگی', value: rowData.last_name },
        { name: 'national_id', label: 'کد ملی', value: rowData.national_id },
        { name: 'certificate_number', label: 'شماره شناسنامه', value: rowData.certificate_number },
        {
            name: 'birth_date', label: 'تاریخ تولد',
            value: rowData.birth_date ? moment(rowData.birth_date).format('jYYYY/jMM/jDD') : null
        },
        { name: 'father_name', label: 'نام پدر', value: rowData.father_name },
        { name: 'mobile', label: 'شماره همراه', value: rowData.mobile },
        { name: 'phone', label: 'شماره تلفن', value: rowData.phone },
        { name: 'province', label: 'استان', value: rowData.province },
        { name: 'city', label: 'شهر', value: rowData.city },
        { name: 'area', label: 'منطقه', value: rowData.area },
        { name: 'main_street', label: 'خیابان اصلی', value: rowData.main_street },
        { name: 'side_street', label: 'خیابان فرعی', value: rowData.side_street },
        { name: 'alley', label: 'کوچه', value: rowData.alley },
        { name: 'building_name', label: 'نام ساختمان', value: rowData.building_name },
        { name: 'house_number', label: 'پلاک', value: rowData.house_number },
        { name: 'postal_code', label: 'کد پستی', value: rowData.postal_code },
        { name: 'status', label: 'وضعیت', value: rowData.status },
    ]))

    return (
        <InfosTable infoItems={infoItems} width={{ xs: '100%', md: '80%', lg: '70%' }}/>
    )
}
