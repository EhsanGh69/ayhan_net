import { useMemo, useState } from 'react'
import { PersonAddAlt } from '@mui/icons-material'

import MainTable from '../../components/table/MainTable';
import StaffTableRow from '../../components/staff/StaffTableRow';
import { useStaffList } from '../../hooks/useStaff'
import { staffHeadCells } from '../../constants/tableHeadCells'
import SnackAlert from '../../components/SnackAlert';
import ChangeActModal from '../../components/staff/ChangeActModal';
import ResetPassModal from '../../components/auth/ResetPassModal';
import SearchInput from '../../components/table/SearchInput';

export default function StaffUsers() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [actModalOpen, setActModalOpen] = useState(false)
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [userAct, setUserAct] = useState({ userId: null, status: null, fullName: null })
  const [searchTerm, setSearchTerm] = useState("")

  const { staffList, staffListLoading, isStaffListErr, staffListErr } = useStaffList()

  const filteredStaff = staffList?.filter(staff => {
    return Object.values(staff).some(value => value.toString()
      .toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const normalizeHandler = (filteredData) => {
    return filteredData.map(row => {
      const { user, ...rest } = row
      return { ...rest, ...user, full_name: `${user.first_name} ${user.last_name}` }
    })
  }

  const normalizedData = useMemo(() => {
    if (!filteredStaff) return []
    return normalizeHandler(filteredStaff)
  }, [filteredStaff])


  return (
    <>
      <ChangeActModal
        closeHandler={() => setActModalOpen(false)}
        open={actModalOpen}
        setSnackbar={setSnackbar}
        userAct={userAct}
      />
      <ResetPassModal
        closeHandler={() => setResetModalOpen(false)}
        open={resetModalOpen}
        setSnackbar={setSnackbar}
        userAct={userAct}
      />
      <MainTable
        error={staffListErr} isError={isStaffListErr} isLoading={staffListLoading}
        headCells={staffHeadCells} addRoute="/users/staff/add" AddIcon={PersonAddAlt}
        filteredData={normalizedData} title="کاربران"
        searchChildren={
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="کاربران"
          />
        }
        tableChildren={row => (
          <StaffTableRow
            key={row.id}
            row={row}
            setActModalOpen={setActModalOpen}
            setResetModalOpen={setResetModalOpen}
            setUserAct={setUserAct}
          />
        )}
      />
      <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}