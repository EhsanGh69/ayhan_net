import { useEffect, useState } from 'react'
import { Alert, Button, Paper, TableCell, Typography } from '@mui/material';
import { Visibility, Remove } from '@mui/icons-material';

import MainPage from '../../Pages/MainPage'
import { searchSubsHeadCells } from '../../constants/tableHeadCells'
import { useSearchSubscriber } from '../../hooks/useSubscriber'
import SnackAlert from '../../components/SnackAlert';
import SearchSubs from '../../components/subscriber/SearchSubs';
import SearchRows from '../../components/table/SearchRows';
import LoadingBox from '../../components/LoadingBox';
import SubsTabPanel from '../../components/subscriber/SubsTabPanel';

export default function Subscribers() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [fieldInput, setFieldInput] = useState("");
    const [queryInput, setQueryInput] = useState("");
    const [searchParams, setSearchParams] = useState({ field: "", query: "" });
    const [showTabs, setShowTabs] = useState(false)
    const [rowData, setRowData] = useState(null)

    const {
        searchSubs, searchSubsLoading, searchSubsErr, isSearchSubsErr
    } = useSearchSubscriber(searchParams)

    useEffect(() => {
        const errResponse = searchSubsErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isSearchSubsErr) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
    }, [searchSubsErr, isSearchSubsErr])

    return (
        <MainPage>
            <Paper
                sx={{
                    width: '95%', p: 2,
                    border: '1px solid #000',
                    backgroundColor: '#bab5d5ff',
                }}
            >
                <SearchSubs
                    fieldInput={fieldInput}
                    queryInput={queryInput}
                    setFieldInput={setFieldInput}
                    setQueryInput={setQueryInput}
                    setSearchParams={setSearchParams}
                />

                {searchSubsLoading && <LoadingBox />}

                {!!searchSubs && searchSubs?.length > 1 && (
                    <>
                        <SearchRows
                            dataRows={searchSubs}
                            headCells={searchSubsHeadCells}
                        >
                            {row => (
                                <>
                                    <TableCell align='left'>{row.first_name}</TableCell>
                                    <TableCell align='left'>{row.last_name}</TableCell>
                                    <TableCell align='left'>{row.national_id ?? <Remove />}</TableCell>
                                    <TableCell align='left'>{row.subscriber_code ?? <Remove />}</TableCell>
                                    <TableCell align='left'>
                                        <Button variant='contained' color='info'
                                            onClick={() => {
                                                setRowData(row)
                                                setShowTabs(true)
                                            }}>
                                            <Visibility sx={{ mr: 0.5 }} />
                                            <span>مشاهده</span>
                                        </Button>
                                    </TableCell>
                                </>
                            )}
                        </SearchRows>
                        {showTabs && <SubsTabPanel rowData={rowData} />}
                    </>
                )}

                {!!searchSubs && searchSubs.length === 1 && (
                    <SubsTabPanel rowData={searchSubs[0]} />
                )}

                {!!searchSubs && searchSubs.length === 0 && (
                    <Alert variant='outlined' severity='warning' icon={false}
                        sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant='h5'>هیچ مشتری مطابق جستجوی شما وجود ندارد</Typography>
                    </Alert>
                )}
            </Paper>
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}