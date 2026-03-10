import { Check, Clear, Edit, LockPerson, SyncLock } from '@mui/icons-material'
import { Chip, IconButton, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function StaffTableRow({ row, setUserAct, setResetModalOpen, setActModalOpen }) {
    const navigate = useNavigate()

    return (
        <TableRow hover>
            <TableCell align='center'>{row.full_name}</TableCell>
            <TableCell align='center'>
                {row.is_active
                    ? <Chip label='فعال' color='success' icon={<Check />} />
                    : <Chip label='غیر فعال' color='error' icon={<Clear />} />}
            </TableCell>
            <TableCell align='center'>{row.display_name}</TableCell>
            <TableCell align='center'>{row.mobile}</TableCell>
            <TableCell align='center'>
                {row.cartable_types.map((type) => (
                    <div key={type}>
                        <span>{type === 'tickets' && 'تیکت ها'}</span>
                        <span>{type === 'internal' && 'داخلی'}</span>
                        <span>{type === 'fusion' && 'فیوژن'}</span>
                    </div>
                ))}
            </TableCell>
            <TableCell align='center'>
                <IconButton size='medium' title='ویرایش' color='secondary'
                    sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                    onClick={() => navigate(`/users/staff/edit/${row.id}`)}>
                    <Edit fontSize='medium' />
                </IconButton>
                <IconButton size='medium' title='بازیابی رمز عبور' color='info'
                    sx={{ border: '1px solid #2281c5', mr: 2, mt: 1 }}
                    onClick={() => {
                        setUserAct(prev => ({
                            ...prev, userId: row.id,
                            fullName: `${row.full_name}`
                        }))
                        setResetModalOpen(true)
                    }}>
                    <SyncLock fontSize='medium' />
                </IconButton>
                <IconButton
                    size='small'
                    sx={{ border: '1px solid #c55b22', p: 1, color: '#b56c07', mt: 1 }}
                    title={row.is_active ? 'غیر فعال کردن' : 'فعال کردن'}
                    onClick={() => {
                        setUserAct(prev => ({
                            ...prev, userId: row.id, status: row.is_active,
                            fullName: `${row.full_name}`
                        }))
                        setActModalOpen(true)
                    }}
                >
                    <LockPerson fontSize='medium' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
