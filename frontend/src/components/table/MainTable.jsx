import { useEffect, useState, useMemo } from 'react'
import { Alert, Paper, TablePagination, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles";

import MainPage from '../../Pages/MainPage'
import SnackAlert from '../../components/SnackAlert';
import LoadingBox from '../../components/LoadingBox';
import SearchBox from './SearchBox';
import TableContent from './TableContent';

export default function MainTable({ 
    initOrder='', filteredData, isError, error, isLoading, title, addRoute, headCells,
    searchChildren, tableChildren, AddIcon
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(initOrder)

  useEffect(() => {
    const errResponse = error?.response?.data?.detail
    const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
    if (isError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
  }, [isError, error])

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows = useMemo(() => {
    if(!filteredData) return []
    return [...filteredData].sort((a, b) => {
      const A = a[orderBy]
      const B = b[orderBy]

      if(typeof A === 'string'){
        return order === 'asc'
        ? A.localeCompare(B)
        : B.localeCompare(A)
      }

      return order === 'asc' ? A - B : B - A
    })
  }, [filteredData, order, orderBy])

  const handleChangePage = (e, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  if (isLoading) {
    return <LoadingBox />
  }

  return (
    <MainPage>
      <Paper
        sx={{
          width: '95%', p: 2,
          border: '1px solid #000',
          backgroundColor: '#c2bfbf',
          ml: isMobile ? -2 : 0
        }}
      >
        <SearchBox addRoute={addRoute} isMobile={isMobile} title={title} AddIcon={AddIcon}>
          {searchChildren}
        </SearchBox>

        {!!filteredData?.length 
          ? (
            <TableContent 
              sortedRows={sortedRows} order={order} 
              orderBy={orderBy} headCells={headCells}
              handleRequestSort={handleRequestSort}
              page={page} rowsPerPage={rowsPerPage}
            >
              {tableChildren}
            </TableContent>
          ) : (
            <Alert variant='outlined' severity='warning' icon={false}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant='h5'>اطلاعاتی جهت نمایش وجود ندارد</Typography>
            </Alert>
          )
        }

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد در هر صفحه"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to}از ${count}`}
        />
      </Paper>
      <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </MainPage>
  )
}