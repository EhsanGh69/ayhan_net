import { Remove } from '@mui/icons-material'
import { Chip, TableCell, TableRow } from '@mui/material'


export default function SubscriberTableRow({
    row, fields = [], statusLabel = '', StatusIcon, children
}) {
    return (
        <TableRow hover>
            {fields.map(field => {
                if (field !== 'status') return (
                    <TableCell key={field} align='center'>{row[field] ?? <Remove />}</TableCell>
                )
                else return (
                    <TableCell key={field} align='center'>
                        <Chip label={statusLabel} color='warning' icon={<StatusIcon />} />
                    </TableCell>
                )
            })}
            {children}
        </TableRow>
    )
}
