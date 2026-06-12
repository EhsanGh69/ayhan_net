import { useState } from 'react'
import { PersonAdd, Sync } from '@mui/icons-material'

import MainTable from '../../components/table/MainTable';
import { subscriberHeadCells } from '../../constants/tableHeadCells'
import { useSubscribersList } from '../../hooks/useSubscriber'
import SubscriberTableRow from '../../components/subscriber/SubscriberTableRow';
import RemoveSubsModal from '../../components/subscriber/RemoveSubsModal';
import SnackAlert from '../../components/SnackAlert';
import SearchInput from '../../components/table/SearchInput';
import SubscriberTableAction from '../../components/subscriber/SubscriberTableAction';
import MainPage from '../MainPage';

export default function Subscribers() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [removeModalOpen, setRemoveModalOpen] = useState(false)
    const [subs, setSubs] = useState({ id: null, fullName: null })
    const [searchTerm, setSearchTerm] = useState("")

    const { subscribersList, subsListLoading, subsListErr, isSubsListErr } = useSubscribersList()

    const filteredSubs = subscribersList?.filter(subs => {
        return Object.values(subs).some(value => value?.toString()
            .toLowerCase().includes(searchTerm.toLowerCase()))
    })

    return (
        <MainPage>
            <RemoveSubsModal
                subs={subs}
                open={removeModalOpen}
                closeHandler={() => setRemoveModalOpen(false)}
                setSnackbar={setSnackbar}
            />
            <MainTable
                error={subsListErr} isError={isSubsListErr} isLoading={subsListLoading}
                headCells={subscriberHeadCells} addRoute="/subscribers/add" AddIcon={PersonAdd}
                filteredData={filteredSubs} title="مشتری ها" 
                searchChildren={
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        title="مشتری ها"
                    />
                }
                tableChildren={row => (
                    <SubscriberTableRow
                        key={row.id}
                        row={row}
                        fields={['first_name', 'last_name', 'national_id', 
                            'subscriber_code', 'status']}
                        statusLabel={row.status}
                        StatusIcon={Sync}
                    >
                        <SubscriberTableAction 
                            row={row} 
                            setSubs={setSubs} 
                            setRemoveModalOpen={setRemoveModalOpen} 
                        />
                    </SubscriberTableRow>
                )}
            />
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}