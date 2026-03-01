import { useEffect, useMemo, useState } from 'react'
import { Alert, IconButton, TableCell, Typography, useMediaQuery } from '@mui/material';
import { AddComment, CheckRounded, Edit, ClearRounded } from '@mui/icons-material'
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { ticketHeadCells } from '../../constants/tableHeadCells';
import { useTicketsList } from '../../hooks/useTicket';
import SearchBox from '../table/SearchBox';
import SearchInput from '../table/SearchInput';
import SnackAlert from '../SnackAlert';
import LoadingBox from '../LoadingBox';
import TicketRows from './TicketRows';
import ChangeTicketActivateModal from './ChangeTicketActivateModal';
import deepSearch from '../../utils/deepSearch';

export default function ManageTicketsTable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [ticket, setTicket] = useState({ id: null, name: null, group: null, isActive: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [activeModal, setActiveModal] = useState(false)
    const navigate = useNavigate()

    const { ticketsList, ticketsListLoading, isTicketsListErr, ticketsListErr } = useTicketsList()

    const filteredTickets = ticketsList?.filter(ticket => deepSearch(ticket, searchTerm));

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

    const setCellColor = (isActive) => {
        if (isActive) return { color: "#000" }
        return { color: "#696969ff" }
    }

    return (
        <>
            <SearchBox AddIcon={AddComment} addRoute="/tickets/define" isMobile={isMobile} title="تیکت ها" >
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    title="تیکت ها"
                />
            </SearchBox>

            <ChangeTicketActivateModal
                open={activeModal}
                closeHandler={() => setActiveModal(false)}
                setSnackbar={setSnackbar}
                ticket={ticket}
            />

            {ticketsListLoading && <LoadingBox />}

            {!!ticketsList && ticketsList?.length > 0
                ? (
                    <TicketRows
                        dataRows={normalizedData}
                        headCells={ticketHeadCells}
                    >
                        {(row, index) => (
                            <>
                                <TableCell sx={setCellColor(row.is_active)} align='center'>{index + 1}</TableCell>
                                <TableCell sx={setCellColor(row.is_active)} align='center'>{row.group}</TableCell>
                                <TableCell sx={setCellColor(row.is_active)} align='center'>{row.name}</TableCell>
                                <TableCell sx={setCellColor(row.is_active)} align='center'>{row.description}</TableCell>
                                <TableCell align='center'>
                                    <IconButton size='medium' title='ویرایش' color='secondary'
                                        sx={{ border: '1px solid #8c22c5', mr: 2, mt: 1 }}
                                        onClick={() => navigate(`/tickets/edit/${row.id}`)}
                                        disabled={!row.is_active}
                                    >
                                        <Edit fontSize='medium' />
                                    </IconButton>
                                    <IconButton
                                        size='medium'
                                        title={row.is_active ? 'غیرفعال سازی' : 'فعال سازی'}
                                        color={row.is_active ? 'error' : 'success'}
                                        sx={{
                                            border: row.is_active ? '1px solid #c53522' : '1px solid #45c522ff',
                                            mr: 2, mt: 1
                                        }}
                                        onClick={() => {
                                            setTicket((prev) => ({
                                                ...prev,
                                                id: row.id,
                                                name: row.name,
                                                group: row.group,
                                                isActive: row.is_active
                                            }))
                                            setActiveModal(true)
                                        }}
                                    >
                                        {row.is_active
                                            ? <ClearRounded fontSize='medium' />
                                            : <CheckRounded fontSize='medium' />
                                        }
                                    </IconButton>
                                </TableCell>
                            </>
                        )}
                    </TicketRows>
                )
                : (
                    <Alert variant='outlined' severity='warning' icon={false}
                        sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h5'>اطلاعاتی جهت نمایش وجود ندارد</Typography>
                    </Alert>
                )
            }

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
