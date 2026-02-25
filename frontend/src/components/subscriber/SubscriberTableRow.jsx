import { Edit, Sync } from '@mui/icons-material'
import { Chip, IconButton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function SubscriberTableRow({ row }) {
    const navigate = useNavigate()

    return (
        <TableRow hover>
            <TableCell align='left'>{row.full_name}</TableCell>
            <TableCell align='left'>{row.mobile}</TableCell>
            <TableCell align='left'>{row.phone}</TableCell>
            <TableCell align='left'>{row.province}</TableCell>
            <TableCell align='left'>{row.city}</TableCell>
            <TableCell align='left'>
                <Chip label={row.status} color='warning' icon={<Sync />} />
            </TableCell>
            <TableCell>
                <IconButton size='medium' title='ویرایش' color='secondary'
                    sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                    onClick={() => navigate(`/subscribers/edit/${row.id}`)}>
                    <Edit fontSize='medium' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
