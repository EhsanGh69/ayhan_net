import { useState } from 'react'
import { QuestionMark } from '@mui/icons-material'

import { subscriberHeadCells } from '../../constants/tableHeadCells'
import { useUnknownPhoneSubscriptions } from "../../hooks/usePhoneSubscription"
import SnackAlert from '../../components/SnackAlert';
import ChangeStatusModal from './ChangeStatusModal';
import PhoneSubscriptionTable from './PhoneSubscriptionTable';

export default function UnknownStatusTable() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [subs, setSubs] = useState({ id: null, fullname: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [changeStatusOpen, setChangeStatusOpen] = useState(false)

    const {
        unknownPhoneSubs, unknownPhoneSubsLoading, isUnknownPhoneSubsErr, unknownPhoneSubsErr
    } = useUnknownPhoneSubscriptions()

    const filteredSubs = unknownPhoneSubs?.filter(subs => {
        return Object.values(subs).some(value => value?.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })

    return (
        <>
            <PhoneSubscriptionTable
                tableData={{
                    error: unknownPhoneSubsErr, isError: isUnknownPhoneSubsErr,
                    isLoading: unknownPhoneSubsLoading, headCells: subscriberHeadCells,
                    filteredData: unknownPhoneSubs, statusLabel: "نامشخص",
                    fields: ['first_name', 'last_name', 'national_id', 'subscriber_code', 'status'],
                    searchHolder: "جستجو در مشترکان با وضعیت نامشخص", StatusIcon: QuestionMark
                }}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                handleSubs={(row) => {
                    setSubs({
                        ...subs,
                        id: row.id,
                        fullname: `${row.first_name} ${row.last_name}`
                    })
                }}
                handleModalOpen={() => setChangeStatusOpen(true)}
            />
            <ChangeStatusModal
                closeHandler={() => setChangeStatusOpen(false)}
                open={changeStatusOpen}
                subs={subs}
                setSnackbar={setSnackbar}
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
