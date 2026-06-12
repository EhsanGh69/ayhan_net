import { useState } from 'react'
import { IconButton, TableCell } from '@mui/material';
import { Settings } from '@mui/icons-material'

import MainTable from '../../components/table/MainTable';
import SubscriberTableRow from '../../components/subscriber/SubscriberTableRow';
import SearchInput from '../../components/table/SearchInput';

export default function PhoneSubscriptionTable({
    tableData, searchTerm, setSearchTerm, handleSubs, handleModalOpen
}) {

    return (
        <>
            <MainTable
                error={tableData.error} isError={tableData.isError}
                isLoading={tableData.isLoading} headCells={tableData.headCells}
                filteredData={tableData.filteredData} showAddBtn={false}
                searchChildren={
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        title={tableData.searchHolder}
                    />
                }
                tableChildren={row => (
                    <SubscriberTableRow
                        key={row.id}
                        row={row}
                        fields={tableData.fields}
                        statusLabel={tableData.statusLabel}
                        StatusIcon={tableData.StatusIcon}
                    >
                        <TableCell align='center'>
                            <IconButton
                                onClick={() => {
                                    handleSubs(row)
                                    handleModalOpen()
                                }}
                            >
                                <Settings color='success' fontSize='large' />
                            </IconButton>
                        </TableCell>

                    </SubscriberTableRow>
                )}
            />
        </>
    )
}
