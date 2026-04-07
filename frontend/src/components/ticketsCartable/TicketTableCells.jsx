import { Chip, IconButton, TableCell } from '@mui/material'
import { Check, Clear, Info, Remove, Pending } from '@mui/icons-material'

export default function TicketTableCells({
    row, index, setRecordId, setIsActive, setRecordStaffId = null, setDetailModalOpen, 
    showRemoveBtn = false, setRemoveModalOpen = null
}) {

    const setCellColor = (isActive) => {
        if(isActive) return { color: "#000" }
        return { color: "#696969ff" }
    }

    return (
        <>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{index + 1}</TableCell>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{row.group}</TableCell>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{row.name}</TableCell>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{row.user}</TableCell>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{row.datetime}</TableCell>
            <TableCell sx={setCellColor(row.is_active)} align='center'>{row.staff ?? <Remove />}</TableCell>
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
                    <IconButton size='medium' title='حذف تیکت'
                        sx={{ 
                            border: row.is_active ? '1px solid #c53222' : '1px solid #2fd212ff', 
                            mr: 2, mt: 1 
                        }}
                        onClick={() => {
                            setRecordId(row.id)
                            setIsActive(row.is_active)
                            setRemoveModalOpen(true)
                        }}
                    >
                        {row.is_active 
                            ? <Clear fontSize='medium' color='error' />
                            : <Check fontSize='medium' color='success' />
                        }
                    </IconButton>
                )}
            </TableCell>
        </>
    )
}