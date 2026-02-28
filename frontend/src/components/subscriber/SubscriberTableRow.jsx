import { Edit, Sync, PersonRemove } from '@mui/icons-material'
import { Chip, IconButton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function SubscriberTableRow({ row, setSubs, setRemoveModalOpen }) {
    const navigate = useNavigate()

    return (
        <TableRow hover>
            <TableCell align='left'>{row.first_name}</TableCell>
            <TableCell align='left'>{row.last_name}</TableCell>
            <TableCell align='left'>{row.national_id}</TableCell>
            <TableCell align='left'>{row.phone}</TableCell>
            <TableCell align='left'>
                <Chip label={row.status} color='warning' icon={<Sync />} />
            </TableCell>
            <TableCell>
                <IconButton size='medium' title='ویرایش' color='secondary'
                    sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                    onClick={() => navigate(`/subscribers/edit/${row.id}`)}>
                    <Edit fontSize='medium' />
                </IconButton>
                <IconButton size='medium' title='حذف' color='error'
                    sx={{ border: '1px solid #c53522', mr: 2, mt: 1 }}
                    onClick={() => {
                        setSubs((prev) => ({ ...prev, id: row.id, fullName: row.full_name }))
                        setRemoveModalOpen(true)
                    }}>
                    <PersonRemove fontSize='medium' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
