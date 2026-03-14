import { Chip, IconButton, TableCell } from '@mui/material'
import { Check, Delete, Info, Remove, Pending } from '@mui/icons-material'

export default function TicketTableCells({
    row, index, setRecordId, setRecordStaffId = null, setDetailModalOpen, 
    showRemoveBtn = false, setRemoveModalOpen = null
}) {
    return (
        <>
            <TableCell align='center'>{index + 1}</TableCell>
            <TableCell align='center'>{row.group}</TableCell>
            <TableCell align='center'>{row.name}</TableCell>
            <TableCell align='center'>{row.user}</TableCell>
            <TableCell align='center'>{row.datetime}</TableCell>
            <TableCell align='center'>{row.staff ?? <Remove />}</TableCell>
            <TableCell align='center'>
                {row.status === 'open'
                    ? <Chip label='باز' color='error' icon={<Pending/>} />
                    : <Chip label='بسته' color='success' icon={<Check />} />
                }
            </TableCell>
            <TableCell>
                <IconButton size='medium' title='جزئیات' color='info'
                    sx={{ border: '1px solid #2279c5', mr: 2, mt: 1 }}
                    onClick={() => {
                        setRecordId(row.id)
                        if(setRecordStaffId && row?.staff) setRecordStaffId(row?.staff.id)
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