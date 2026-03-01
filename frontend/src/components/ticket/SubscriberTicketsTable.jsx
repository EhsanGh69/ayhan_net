import { useEffect, useMemo, useState } from 'react'
import { Alert, Typography, useMediaQuery } from '@mui/material';
import { AddComment, Info } from '@mui/icons-material'
import { useTheme } from "@mui/material/styles";
import moment from "jalali-moment"

import { subsTicketHeadCells } from '../../constants/tableHeadCells';
import { useSubscriberTicketRecords } from '../../hooks/useTicketRecord';
import SnackAlert from '../../components/SnackAlert';
import SearchBox from '../table/SearchBox';
import SearchInput from '../table/SearchInput';
import LoadingBox from '../LoadingBox';
import TicketRows from './TicketRows';
import AddSubsTicketModal from '../ticketsCartable/AddSubsTicketModal';
import SubsTicketDetailModal from '../ticketsCartable/SubsTicketDetailModal';
import TicketTableCells from '../ticketsCartable/TicketTableCells';


export default function SubscriberTicketsTable({ subsId }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [searchTerm, setSearchTerm] = useState("")
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [recordId, setRecordId] = useState(null)

    const {
        subscriberTicketRecords, subsTRecordsLoading, isSubsTRecordsErr, subsTRecordsErr
    } = useSubscriberTicketRecords(subsId)

    const filteredTicketRecords = subscriberTicketRecords?.filter(record => {
        return Object.values(record).some(value => value.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })
    
    const normalizeHandler = (filteredData) => {
        return filteredData.map(row => {
            return {
                ...row,
                datetime: moment(row.created_at).format('HH:mm - jYYYY/jMM/jDD'),
                user: row?.user.display_name,
				staff: row?.staff ? row?.staff.display_name : null,
                status: row.status
            }
        })
    }

    const normalizedData = useMemo(() => {
        if (!filteredTicketRecords) return []
        return normalizeHandler(filteredTicketRecords)
    }, [filteredTicketRecords])


    useEffect(() => {
        const errResponse = subsTRecordsErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isSubsTRecordsErr) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [isSubsTRecordsErr, subsTRecordsErr])

    return (
        <>
            <SearchBox
                AddIcon={AddComment} addHandler={() => setAddModalOpen(true)}
                isMobile={isMobile} title="تیکت های مشترک"
            >
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    title="تیکت های مشتری"
                />
            </SearchBox>

            <AddSubsTicketModal
                open={addModalOpen}
                closeHandler={() => setAddModalOpen(false)}
                setSnackbar={setSnackbar}
                subsId={addModalOpen ? subsId : null}
            />

            <SubsTicketDetailModal
                open={detailModalOpen}
                closeHandler={() => setDetailModalOpen(false)}
                setSnackbar={setSnackbar}
                recordId={recordId}
            />

            {subsTRecordsLoading && <LoadingBox />}

            {!!subscriberTicketRecords && subscriberTicketRecords.length > 0
                ? (
                    <TicketRows
                        dataRows={normalizedData}
                        headCells={subsTicketHeadCells}
                    >
                        {(row, index) => (
                            <TicketTableCells   
                                row={row}
								index={index}
                                setRecordId={setRecordId}
                                setDetailModalOpen={setDetailModalOpen}
                            />
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

            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
