import { useEffect, useMemo, useState, useContext } from 'react'
import { Alert, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Info } from '@mui/icons-material';
import moment from 'jalali-moment';

import MainPage from '../MainPage';
import { subsTicketHeadCells } from '../../constants/tableHeadCells';
import { useStaffTicketRecords } from '../../hooks/useTicketRecord';
import { useCurrentStaff } from '../../hooks/useStaff';
import { GlobalContext } from '../../context/GlobalContext';
import SnackAlert from '../../components/SnackAlert';
import SearchBox from '../../components/table/SearchBox';
import SearchInput from '../../components/table/SearchInput';
import LoadingBox from '../../components/LoadingBox';
import TicketRows from '../../components/ticket/TicketRows';
import SubsTicketDetailModal from '../../components/ticketsCartable/SubsTicketDetailModal';
import TicketTableCells from '../../components/ticketsCartable/TicketTableCells';
import ResponseTicketModal from '../../components/ticketsCartable/ResponseTicketModal';
import ChangeTicketStaffModal from '../../components/ticketsCartable/ChangeTicketStaffModal';
import useErrorHandler from '../../hooks/useErrorHandler';

export default function TicketsCartable() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [searchTerm, setSearchTerm] = useState("")
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [responseModalOpen, setResponseModalOpen] = useState(false)
    const [changeStaffModalOpen, setChangeStaffModalOpen] = useState(false)
    const [recordId, setRecordId] = useState(null)
    const [recordStaffId, setRecordStaffId] = useState(null)

    const [staffId, setStaffId] = useState(null)
    const { getData } = useContext(GlobalContext)
    const userData = getData("userData")

    const { getCurrentStaff, isGetCurrentStaffErr, getCurrentStaffErr } = useCurrentStaff()

    const currentStaffHandler = async (userId) => {
        await getCurrentStaff({ userId })
            .then(({ id }) => setStaffId(id))
    }

    useEffect(() => {
        if(userData) currentStaffHandler(userData?.id)
    }, [userData])

    const {
        staffTicketRecords, staffTRsLoading, isStaffTRsErr, staffTRsErr
    } = useStaffTicketRecords(staffId)

    const filteredTicketRecords = staffTicketRecords?.filter(record => {
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

    useErrorHandler(isStaffTRsErr, staffTRsErr, setSnackbar)
    useErrorHandler(isGetCurrentStaffErr, getCurrentStaffErr, setSnackbar)

    if (staffTRsLoading) {
        return <LoadingBox />
    }

    return (
        <MainPage>
            <Paper
                sx={{
                    width: '95%', p: 2,
                    border: '1px solid #000',
                    backgroundColor: '#d8d8d8',
                }}
            >
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

                {!!staffTicketRecords && staffTicketRecords.length > 0
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

            </Paper>

            <SubsTicketDetailModal
                open={detailModalOpen}
                closeHandler={() => setDetailModalOpen(false)}
                setSnackbar={setSnackbar}
                recordId={recordId}
                openResponse={() => setResponseModalOpen(true)}
                openChangeStaff={() => setChangeStaffModalOpen(true)}
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
        </MainPage>
    )
}