import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function TicketRows({ dataRows, headCells, children }) {
    return (
        <TableContainer sx={{ maxHeight: 500, border: '1px solid #000', mt: 3 }}>
            <Table stickyHeader aria-label='staff-list'>
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell, index) => (
                            <TableCell
                                key={index}
                                align='center'
                                sx={{ backgroundColor: '#ccc' }}
                            >
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataRows.map((row, index) => <TableRow key={index}>{children(row, index)}</TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
