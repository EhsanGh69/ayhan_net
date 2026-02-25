import { useEffect, useState, useMemo } from 'react'
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TableSortLabel, TextField, IconButton, Box, InputAdornment, useMediaQuery
} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import { Search as SearchIcon, PersonAddAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import MainPage from '../../Pages/MainPage'
import styles from '../../styles/CustomStyles.module.css'
import SnackAlert from '../../components/SnackAlert';
import LoadingBox from '../../components/LoadingBox';

export default function MainTable({ 
    initOrder='', listData, normalizeHandler, isError, error, isLoading, title, addRoute, headCells,
    children
}) {
  const navigate = useNavigate()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(initOrder)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const errResponse = error?.response?.data?.detail
    const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
    if (isError) setSnackbar({ open: true, message: errorMsg, severity: 'error' })
  }, [isError, error])

  const filteredStaff = listData?.filter(staff => {
    return Object.values(staff).some(value => value.toString()
      .toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const normalizedRows = useMemo(() => {
    if(!filteredStaff) return []
    return normalizeHandler(filteredStaff)
  }, [filteredStaff])

  const sortedRows = useMemo(() => {
    return [...normalizedRows].sort((a, b) => {
      const A = a[orderBy]
      const B = b[orderBy]

      if(typeof A === 'string'){
        return order === 'asc'
        ? A.localeCompare(B)
        : B.localeCompare(A)
      }

      return order === 'asc' ? A - B : B - A
    })
  }, [filteredStaff, order, orderBy])

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
          backgroundColor: '#bab5d5ff',
          ml: isMobile ? -2 : 0
        }}
      >
        <Box
          width="100%"
          sx={{
            mb: 3, display: 'flex', justifyContent:
              'space-between', alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <TextField
            variant='outlined'
            placeholder={`جستجو در ${title} ...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                className: styles.customPlaceholderInput,
                startAdornment: (
                  <InputAdornment position='start'><SearchIcon color='#4a4848' /></InputAdornment>
                )
              }
            }}
            sx={{ minWidth: 400 }}
          />

          <IconButton size='large' title={`افزودن ${title}`} color='primary'
            sx={{ border: '1px solid #2253c5ff', mt: 2 }}
            onClick={() => navigate(addRoute)}
          >
            <PersonAddAlt sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Box>

        {!!listData && (
          <TableContainer sx={{ maxHeight: 500, border: '1px solid #000' }}>
            <Table stickyHeader aria-label='staff-list'>
              <TableHead>
                <TableRow>
                  {headCells.map(headCell => (
                    <TableCell
                      key={headCell.id}
                      align='left'
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{ backgroundColor: '#ccc' }}
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
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredStaff?.length}
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
