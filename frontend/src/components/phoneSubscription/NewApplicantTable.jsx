import { useMemo, useState } from 'react'
import { ContactPhone } from '@mui/icons-material'

import { newApplicantHeadCells } from '../../constants/tableHeadCells'
import { useNewApplicantList } from "../../hooks/usePhoneSubscription"
import SnackAlert from '../../components/SnackAlert';
import NewApplicantModal from './NewApplicantModal';
import PhoneSubscriptionTable from './PhoneSubscriptionTable';

export default function NewApplicantTable() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [subs, setSubs] = useState({ id: null, fullname: null })
    const [searchTerm, setSearchTerm] = useState("")
    const [newApplicantOpen, setNewApplicantOpen] = useState(false)

    const {
        newApplicantList, newApplicantListLoading, isNewApplicantListErr, newApplicantListErr
    } = useNewApplicantList()

    const filteredSubs = newApplicantList?.filter(subs => {
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
                    error: newApplicantListErr, isError: isNewApplicantListErr,
                    isLoading: newApplicantListLoading, headCells: newApplicantHeadCells,
                    filteredData: normalizedData, statusLabel: "متقاضی جدید",
                    fields: ['first_name', 'last_name', 'status'],
                    searchHolder: "جستجو در مشترکان با وضعیت ثبت نام جدید", StatusIcon: ContactPhone
                }}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                handleSubs={(row) => {
                    setSubs({
                        ...subs,
                        id: row.id,
                        fullname: `${row.first_name} ${row.last_name}`
                    })
                }}
                handleModalOpen={() => setNewApplicantOpen(true)}
            />
            <NewApplicantModal
                open={newApplicantOpen}
                closeHandler={() => setNewApplicantOpen(false)}
                setSnackbar={setSnackbar}
                subs={subs}
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
