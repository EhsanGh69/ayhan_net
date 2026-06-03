import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel 
} from '@mui/material'


export default function TableContent({ 
    sortedRows, headCells, orderBy, order, page, rowsPerPage, handleRequestSort, children
}) {
    return (
        <TableContainer sx={{ maxHeight: 500, border: '1px solid #000' }}>
            <Table stickyHeader aria-label='staff-list'>
                <TableHead>
                    <TableRow>
                        {headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align='center'
                                sortDirection={orderBy === headCell.id ? order : false}
                                sx={{ backgroundColor: '#e0dada' }}
                            >
                                {headCell.sortable
                                    ? (
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={() => handleRequestSort(headCell.id)}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    )
                                    : headCell.label
                                }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedRows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => children(row))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
