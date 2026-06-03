import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Remove } from "@mui/icons-material";


export default function InfosTable({ infoItems, width = null }) {
    return (
        <TableContainer
            component={Paper}
            sx={{
                width,
                border: "1px solid #807979",
                backgroundColor: "#c8d8d1"
            }}
        >
            <Table>
                <TableBody>
                    {infoItems.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ borderTop: index !== 0 ? "2px solid #92b4c9" : null }}>
                                {item.label}:
                            </TableCell>
                            <TableCell sx={{ borderTop: index !== 0 ? "2px solid #92b4c9" : null }}>
                                <b>{item.value ? item.value : <Remove />}</b>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
