import { Edit, PersonRemove } from '@mui/icons-material'
import { IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function SubscriberTableAction({ setSubs, row, setRemoveModalOpen }) {
    const navigate = useNavigate()

    return (
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
    )
}
