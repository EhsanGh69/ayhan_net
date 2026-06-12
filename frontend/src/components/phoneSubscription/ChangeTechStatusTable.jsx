import { useMemo, useState } from 'react'
import { DialerSip, SettingsPhone } from '@mui/icons-material'

import { changeTechHeadCells } from '../../constants/tableHeadCells'
import { useChangeTechList } from "../../hooks/usePhoneSubscription"
import SnackAlert from '../../components/SnackAlert';
import SearchInput from '../../components/table/SearchInput';
import ChangeTechModal from './ChangeTechModal';
import PhoneSubscriptionTable from './PhoneSubscriptionTable';

export default function ChangeTechStatusTable() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [subs, setSubs] = useState({ id: null, fullname: null, phoneNumber: null })
  const [searchTerm, setSearchTerm] = useState("")
  const [changeTechOpen, setChangeTechOpen] = useState(false)

  const {
    changeTechList, changeTechListLoading, isChangeTechListErr, changeTechListErr
  } = useChangeTechList()

  const filteredSubs = changeTechList?.filter(subs => {
    return Object.values(subs).some(value => value?.toString()
      .toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const normalizeHandler = (filteredData) => {
    return filteredData.map(row => {
      const { subscriber, ...rest } = row
      return {
        ...rest, ...subscriber,
        id: subscriber?.id,
        first_name: subscriber?.first_name, 
        last_name: subscriber?.last_name
      }
    })
  }

  const normalizedData = useMemo(() => {
    if (!filteredSubs) return []
    return normalizeHandler(filteredSubs)
  }, [filteredSubs])

  return (
    <>
      <PhoneSubscriptionTable
        tableData={{
          error: changeTechListErr, isError: isChangeTechListErr,
          isLoading: changeTechListLoading, headCells: changeTechHeadCells,
          filteredData: normalizedData, statusLabel: "در انتظار تغییر تکنولوژی",
          fields: ['first_name', 'last_name', 'phone_number', 'phone_type', 'status'],
          searchHolder: "جستجو در مشترکان در انتظار تغییر تکنولوژی", StatusIcon: SettingsPhone
        }}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        handleSubs={(row) => {
          setSubs({
            ...subs,
            id: row.id,
            fullname: `${row.first_name} ${row.last_name}`,
            phoneNumber: row.phone_number
          })
        }}
        handleModalOpen={() => setChangeTechOpen(true)}
      />
      <ChangeTechModal
        open={changeTechOpen}
        closeHandler={() => setChangeTechOpen(false)}
        setSnackbar={setSnackbar}
        subs={subs}
      />
      <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  )
}
