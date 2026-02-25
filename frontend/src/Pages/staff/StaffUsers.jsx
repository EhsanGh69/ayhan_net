import { useState } from 'react'

import MainTable from '../../components/table/MainTable';
import StaffTableRow from '../../components/staff/StaffTableRow';
import { useStaffList } from '../../hooks/useStaff'
import { staffHeadCells } from '../../constants/usersTable'
import SnackAlert from '../../components/SnackAlert';
import ChangeActModal from '../../components/staff/ChangeActModal';
import ResetPassModal from '../../components/auth/ResetPassModal';

export default function StaffUsers() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [actModalOpen, setActModalOpen] = useState(false)
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [userAct, setUserAct] = useState({ userId: null, status: null, fullName: null })

  const { staffList, staffListLoading, isStaffListErr, staffListErr } = useStaffList()

  const normalizeHandler = (filteredData) => {
    return filteredData.map(row => {
      const { user, ...rest } = row
      return { ...rest, ...user, full_name: `${user.first_name} ${user.last_name}` }
    })
  }

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
          listData={staffList} error={staffListErr} 
          isError={isStaffListErr} isLoading={staffListLoading}
          headCells={staffHeadCells} addRoute="/users/staff/add"
          normalizeHandler={normalizeHandler} title="کاربران" initOrder='full_name'
        >
          {row => (
            <StaffTableRow 
              key={row.id}
              row={row}
              setActModalOpen={setActModalOpen}
              setResetModalOpen={setResetModalOpen}
              setUserAct={setUserAct}
            />
          )}
        </MainTable>
        <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}