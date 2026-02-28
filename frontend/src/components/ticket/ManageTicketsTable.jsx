import { useEffect, useMemo, useState } from 'react'
import { IconButton, TableCell, useMediaQuery } from '@mui/material';
import { AddComment, Delete, Edit } from '@mui/icons-material'
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { ticketHeadCells } from '../../constants/tableHeadCells';
import { useTicketsList } from '../../hooks/useTicket';
import SearchBox from '../table/SearchBox';
import SearchInput from '../table/SearchInput';
import SnackAlert from '../SnackAlert';
import LoadingBox from '../LoadingBox';
import TicketRows from './TicketRows';
import RemoveTicketModal from './RemoveTicketModal';

export default function ManageTicketsTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [ticket, setTicket] = useState({ id: null, name: null, group: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [removeModal, setRemoveModal] = useState(false)
    const navigate = useNavigate()

    const { ticketsList, ticketsListLoading, isTicketsListErr, ticketsListErr } = useTicketsList()

    const filteredTickets = ticketsList?.filter(ticket => {
        return Object.values(ticket).some(value => value.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })

    const normalizeHandler = (filteredData) => {
        return filteredData.map(row => {
            return { ...row, group: row.group.title }
        })
    }

    const normalizedData = useMemo(() => {
        if (!filteredTickets) return []
        return normalizeHandler(filteredTickets)
    }, [filteredTickets])

    useEffect(() => {
        const errResponse = ticketsListErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isTicketsListErr) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isTicketsListErr, ticketsListErr])

    return (
        <>
            <SearchBox AddIcon={AddComment} addRoute="/tickets/define" isMobile={isMobile} title="تیکت ها" >
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    title="تیکت ها"
                />
            </SearchBox>

            <RemoveTicketModal
                open={removeModal}
                closeHandler={() => setRemoveModal(false)}
                setSnackbar={setSnackbar}
                ticket={ticket}
            />

            {ticketsListLoading && <LoadingBox />}

            {!!ticketsList && (
                <TicketRows
                    dataRows={normalizedData}
                    headCells={ticketHeadCells}
                >
                    {row => (
                        <>
                            <TableCell align='left'>{row.group}</TableCell>
                            <TableCell align='left'>{row.name}</TableCell>
                            <TableCell align='left'>{row.description}</TableCell>
                            <TableCell>
                                <IconButton size='medium' title='ویرایش' color='secondary'
                                    sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                                    onClick={() => navigate(`/tickets/edit/${row.id}`)}
                                >
                                    <Edit fontSize='medium' />
                                </IconButton>
                                <IconButton size='medium' title='حذف' color='error'
                                    sx={{ border: '1px solid #c53522', mr: 2, mt: 1 }}
                                    onClick={() => {
                                        setTicket((prev) => ({ 
                                            ...prev, id: row.id, name: row.name, group: row.group 
                                        }))
                                        setRemoveModal(true)
                                    }}
                                >
                                    <Delete fontSize='medium' />
                                </IconButton>
                            </TableCell>
                        </>
                    )}
                </TicketRows>
            )}

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
