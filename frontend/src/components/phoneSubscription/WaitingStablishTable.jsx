import { useMemo, useState } from 'react'
import { PhoneInTalk } from '@mui/icons-material'

import { changeTechHeadCells } from '../../constants/tableHeadCells'
import { useWaitingEstablishList } from "../../hooks/usePhoneSubscription"
import SnackAlert from '../../components/SnackAlert';
import PhoneSubscriptionTable from './PhoneSubscriptionTable';

export default function WaitingStablishTable() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [subs, setSubs] = useState({ id: null, fullname: null })
    const [searchTerm, setSearchTerm] = useState("")

    const {
        waitingEstablishList, waitingEstablishListLoading, waitingEstablishListErr, isWaitingEstablishListErr
    } = useWaitingEstablishList()

    const filteredSubs = waitingEstablishList?.filter(subs => {
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
                    error: waitingEstablishListErr, isError: isWaitingEstablishListErr,
                    isLoading: waitingEstablishListLoading, headCells: changeTechHeadCells,
                    filteredData: normalizedData, statusLabel: "در انتظار دایری",
                    fields: ['first_name', 'last_name', 'phone_number', 'phone_type', 'status'],
                    searchHolder: "جستجو در مشترکان در انتظار دایری", StatusIcon: PhoneInTalk
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
                handleModalOpen={() => {}}
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}
