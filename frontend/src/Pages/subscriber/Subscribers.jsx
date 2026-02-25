import MainTable from '../../components/table/MainTable';
import { subscriberHeadCells } from '../../constants/usersTable'
import { useSubscribersList } from '../../hooks/useSubscriber'
import SubscriberTableRow from '../../components/subscriber/SubscriberTableRow';

export default function Subscribers() {
    const { subscribersList, subsListLoading, subsListErr, isSubsListErr } = useSubscribersList()

    const normalizeHandler = (filteredData) => {
        return filteredData.map(row => {
            return { ...row, full_name: `${row.first_name} ${row.last_name}` }
        })
    }

    return (
        <MainTable
            listData={subscribersList} error={subsListErr}
            isError={isSubsListErr} isLoading={subsListLoading}
            headCells={subscriberHeadCells} addRoute="/subscribers/add"
            normalizeHandler={normalizeHandler} title="مشترکان" initOrder='full_name'
        >
            {row => <SubscriberTableRow key={row.id} row={row} />}
        </MainTable>
    )
}