import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TableSortLabel, TextField, IconButton, Chip, Box, InputAdornment,
  CircularProgress, useMediaQuery
} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import {
  Search as SearchIcon, Edit as EditIcon, Visibility as ViewIcon, Check, Clear, PersonAddAlt
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import MainPage from '../MainPage'
import { useStaffList } from '../../hooks/useUser'
import { staffHeadCells } from '../../constants/usersTable'
import styles from '../../styles/CustomStyles.module.css'

export default function StaffUsers() {
  const navigate = useNavigate()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('full_name')
  const [searchTerm, setSearchTerm] = useState("")

  const { staffList, staffListLoading } = useStaffList()

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const filteredStaff = staffList?.filter(staff => {
    return Object.values(staff).some(value => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const sortedRows = filteredStaff?.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1
    }
  })

  const handleChangePage = (e, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  if (staffListLoading) {
    return (
      <Box display="flex" justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress />
      </Box>
    )
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
            placeholder='جستجو در کارمندان ...'
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

          <IconButton size='large' title='افزودن کارمند' color='primary'
            sx={{ border: '1px solid #2253c5ff', mt: 2 }}
            onClick={() => navigate('/users/staff/add')}
          >
            <PersonAddAlt sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Box>

        {!!staffList && (
          <TableContainer sx={{ maxHeight: 500, border: '1px solid #000' }}>
            <Table stickyHeader aria-label='staff-list'>
              <TableHead>
                <TableRow>
                  {staffHeadCells.map(headCell => (
                    <TableCell
                      key={headCell.id}
                      align='left'
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{ backgroundColor: '#ccc', fontWeight: 800 }}
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
                {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow hover key={row.id}>
                    <TableCell align='left'>{row.full_name}</TableCell>
                    <TableCell align='left'>
                      {row.is_active
                        ? <Chip label='فعال' color='success' icon={<Check />} />
                        : <Chip label='غیر فعال' color='error' icon={<Clear />} />}
                    </TableCell>
                    <TableCell align='left'>{row.formal_name}</TableCell>
                    <TableCell align='left'>{row.mobile}</TableCell>
                    <TableCell align='left'>{row.cartable_types}
                      {/* {row.cartable_types.map(type => (
                        <>
                          <p>{type === 'tickets' && 'تیکت ها'}</p>
                          <p>{type === 'internal' && 'داخلی'}</p>
                          <p>{type === 'fusion' && 'فیوژن'}</p>
                        </>
                      ))} */}
                    </TableCell>
                    <TableCell>
                      <IconButton size='small' title='مشاهده' color='primary'>
                        <ViewIcon fontSize='small' />
                      </IconButton>
                      <IconButton size='small' title='ویرایش' color='secondary'>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
    </MainPage>
  )
}
