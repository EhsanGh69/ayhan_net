import { useEffect, useMemo, useState } from 'react'
import { Alert, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Info } from '@mui/icons-material';
import moment from 'jalali-moment';

import { subsTicketHeadCells } from '../../constants/tableHeadCells';
import { useTicketRecordsList } from '../../hooks/useTicketRecord';
import SnackAlert from '../SnackAlert';
import SearchBox from '../table/SearchBox';
import SearchInput from '../table/SearchInput';
import LoadingBox from '../LoadingBox';
import TicketRows from './TicketRows';
import SubsTicketDetailModal from '../ticketsCartable/SubsTicketDetailModal';
import TicketTableCells from '../ticketsCartable/TicketTableCells';
import RemoveSubsTicketModal from '../ticketsCartable/RemoveSubsTicketModal';
import ResponseTicketModal from '../ticketsCartable/ResponseTicketModal';
import ChangeTicketStaffModal from '../ticketsCartable/ChangeTicketStaffModal';


export default function TicketsRefersList() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [searchTerm, setSearchTerm] = useState("")
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [responseModalOpen, setResponseModalOpen] = useState(false)
    const [changeStaffModalOpen, setChangeStaffModalOpen] = useState(false)
    const [recordId, setRecordId] = useState(null)
    const [recordStaffId, setRecordStaffId] = useState(null)

    const {
        ticketRecordsList, tRecordsListLoading, isTRecordsListErr, tRecordsListErr
    } = useTicketRecordsList()

    const filteredTicketRecords = ticketRecordsList?.filter(record => {
        return Object.values(record).some(value => value.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })

    const normalizeHandler = (filteredData) => {
        return filteredData.map(row => {
            return {
                ...row,
                datetime: moment(row.created_at).format('HH:mm - jYYYY/jMM/jDD'),
                user: row?.user.display_name,
                staff: row?.staff.display_name,
                status: row.status
            }
        })
    }

    const normalizedData = useMemo(() => {
        if (!filteredTicketRecords) return []
        return normalizeHandler(filteredTicketRecords)
    }, [filteredTicketRecords])

    useEffect(() => {
        const errResponse = tRecordsListErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isTRecordsListErr) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isTRecordsListErr, tRecordsListErr])

    if (tRecordsListLoading) {
        return <LoadingBox />
    }

    return (
        <>
            <SearchBox
                showAddBtn={false}
                isMobile={isMobile}
                title="تیکت های مشترک"
            >
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    title="تیکت های مشترک"
                />
            </SearchBox>

            {!!ticketRecordsList && ticketRecordsList.length > 0
                ? (
                    <TicketRows
                        dataRows={normalizedData}
                        headCells={subsTicketHeadCells}
                    >
                        {(row, index) => (
                            <>
                                <TicketTableCells
                                    row={row}
                                    index={index}
                                    setRecordId={setRecordId}
                                    setRecordStaffId={setRecordStaffId}
                                    setDetailModalOpen={setDetailModalOpen}
                                    showRemoveBtn={true}
                                    setRemoveModalOpen={setRemoveModalOpen}
                                />
                            </>
                        )}
                    </TicketRows>
                )
                : (
                    <Alert variant='outlined' severity='warning' icon={<Info />}
                        sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h5'>تیکتی وجود ندارد وجود ندارد</Typography>
                    </Alert>
                )
            }

            <SubsTicketDetailModal
                open={detailModalOpen}
                closeHandler={() => setDetailModalOpen(false)}
                setSnackbar={setSnackbar}
                recordId={recordId}
                showSubsInfo={true}
                openResponse={() => setResponseModalOpen(true)}
                openChangeStaff={() => setChangeStaffModalOpen(true)}
            />
            <RemoveSubsTicketModal
                open={removeModalOpen}
                closeHandler={() => setRemoveModalOpen(false)}
                recordId={recordId}
                setSnackbar={setSnackbar}
            />
            <ResponseTicketModal
                open={responseModalOpen}
                closeHandler={() => setResponseModalOpen(false)}
                setSnackbar={setSnackbar}
                recordId={recordId}
            />
            <ChangeTicketStaffModal
                open={changeStaffModalOpen}
                closeHandler={() => setChangeStaffModalOpen(false)}
                setSnackbar={setSnackbar}
                recordId={recordId}
                recordStaffId={recordStaffId}
            />

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}

