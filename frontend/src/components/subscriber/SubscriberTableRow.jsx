import { Edit, Sync, PersonRemove, Remove } from '@mui/icons-material'
import { Chip, IconButton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function SubscriberTableRow({ row, setSubs, setRemoveModalOpen }) {
    const navigate = useNavigate()

    return (
        <TableRow hover>
            <TableCell align='center'>{row.first_name}</TableCell>
            <TableCell align='center'>{row.last_name}</TableCell>
            <TableCell align='center'>{row.national_id ?? <Remove />}</TableCell>
            <TableCell align='center'>{row.subscriber_code ?? <Remove />}</TableCell>
            <TableCell align='center'>
                <Chip label={row.status} color='warning' icon={<Sync />} />
            </TableCell>
            <TableCell align='center'>
                <IconButton size='medium' title='ویرایش' color='secondary'
                    sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                    onClick={() => navigate(`/subscribers/edit/${row.id}`)}>
                    <Edit fontSize='medium' />
                </IconButton>
                <IconButton size='medium' title='حذف' color='error'
                    sx={{ border: '1px solid #c53522', mr: 2, mt: 1 }}
                    onClick={() => {
                        setSubs((prev) => ({ 
                            ...prev, id: row.id, 
                            fullName: `${row.first_name} ${row.last_name}`
                        }))
                        setRemoveModalOpen(true)
                    }}>
                    <PersonRemove fontSize='medium' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
