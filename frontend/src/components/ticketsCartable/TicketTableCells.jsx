import { Chip, IconButton, TableCell } from '@mui/material'
import { Check, Clear, Delete, Info } from '@mui/icons-material'

export default function TicketTableCells({
    row, setRecordId, setRecordStaffId, setDetailModalOpen, 
    showRemoveBtn = false, setRemoveModalOpen = null
}) {
    return (
        <>
            <TableCell align='center'>{row.group}</TableCell>
            <TableCell align='center'>{row.name}</TableCell>
            <TableCell align='center'>{row.datetime}</TableCell>
            <TableCell align='center'>
                {row.user}
            </TableCell>
            <TableCell align='center'>
                {row.status === 'open'
                    ? <Chip label='باز' color='success' icon={<Check />} />
                    : <Chip label='بسته' color='error' icon={<Clear />} />
                }
            </TableCell>
            <TableCell>
                <IconButton size='medium' title='جزئیات' color='info'
                    sx={{ border: '1px solid #2279c5', mr: 2, mt: 1 }}
                    onClick={() => {
                        setRecordId(row.id)
                        setRecordStaffId(row?.staff.id)
                        setDetailModalOpen(true)
                    }}
                >
                    <Info fontSize='medium' />
                </IconButton>
                {showRemoveBtn && (
                    <IconButton size='medium' title='حذف تیکت' color='error'
                        sx={{ border: '1px solid #c53222', mr: 2, mt: 1 }}
                        onClick={() => {
                            setRecordId(row.id)
                            setRemoveModalOpen(true)
                        }}
                    >
                        <Delete fontSize='medium' />
                    </IconButton>
                )}
            </TableCell>
        </>
    )
}