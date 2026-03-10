import { useEffect, useState } from 'react'
import { PersonAdd } from '@mui/icons-material'

import MainTable from '../../components/table/MainTable';
import { subscriberHeadCells } from '../../constants/tableHeadCells'
import { useSubscribersList } from '../../hooks/useSubscriber'
import SubscriberTableRow from '../../components/subscriber/SubscriberTableRow';
import RemoveSubsModal from '../../components/subscriber/RemoveSubsModal';
import SnackAlert from '../../components/SnackAlert';
import SearchInput from '../../components/table/SearchInput';

export default function Subscribers() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [subs, setSubs] = useState({ id: null, fullName: null })
    const [searchTerm, setSearchTerm] = useState("")

    const { subscribersList, subsListLoading, subsListErr, isSubsListErr } = useSubscribersList()

    const filteredSubs = subscribersList?.filter(subs => {
        return Object.values(subs).some(value => value.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })


    return (
        <>
            <RemoveSubsModal
                subs={subs}
                open={removeModalOpen}
                closeHandler={() => setRemoveModalOpen(false)}
                setSnackbar={setSnackbar}
            />
            <MainTable
                error={subsListErr} isError={isSubsListErr} isLoading={subsListLoading}
                headCells={subscriberHeadCells} addRoute="/subscribers/add" AddIcon={PersonAdd}
                filteredData={filteredSubs} title="مشترکان" 
                searchChildren={
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        title="مشترکان"
                    />
                }
                tableChildren={row => (
                    <SubscriberTableRow
                        key={row.id}
                        row={row}
                        setSubs={setSubs}
                        setRemoveModalOpen={setRemoveModalOpen}
                    />
                )}
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    )
}