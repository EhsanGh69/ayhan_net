import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'

import { useTicketGroupsList } from '../../hooks/useTicket';
import SearchToggleMenu from '../inputs/SearchToggleMenu';

export default function SelectTicketGroup({
    value, setFieldValue, touched, errors, handleGroupModal, isSelected = false, handleSelectGroup
}) {
    const [ticketGroupErr, setTicketGroupErr] = useState('')
    const [selected, setSelected] = useState("")

    const { ticketGroupsList, isTGroupsListErr, tGroupsListErr } = useTicketGroupsList()

    useEffect(() => {
        const errResponse = tGroupsListErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isTGroupsListErr) setTicketGroupErr(errorMsg)
    }, [isTGroupsListErr, tGroupsListErr])

    return (
        <Box width={{ xs: "100%", md: "60%", lg: "40%" }} mb={1}
            display="flex" alignItems="center" flexDirection="column"
        >
            {!!ticketGroupErr && <Typography variant='subtitle1' color='error'>{ticketGroupErr}</Typography>}
            {!!ticketGroupsList && (
                <Box
                    display="flex" flexDirection="column"
                    width="100%" border="1px solid #c2bdbdff" p={1}
                    borderRadius={1}
                >
                    <Box width="100%" textAlign="left" mb={2}>
                        <Button
                            variant='outlined' color='secondary'
                            sx={{ p: 1.5, ml: 1, fontSize: 30 }}
                            title='گروه جدید' onClick={() => {
                                handleSelectGroup(null)
                                handleGroupModal(true)
                            }}
                        >
                            <Add fontSize='inherit' />
                        </Button>
                    </Box>
                    <SearchToggleMenu
                        data={ticketGroupsList}
                        field={{title: "title", value: "id"}}
                        setSelected={setSelected}
                        setValue={(value) => setFieldValue("group_id", value)}
                        label="جستجو در گروه تیکت ها ..."
                    />
                    <Box display="flex" alignItems="center">
                        <FormControl fullWidth margin='dense'
                            error={touched.group_id && Boolean(errors.group_id)}>
                            <InputLabel>گروه تیکت *</InputLabel>
                            <Select
                                value={selected ? selected : value}
                                onChange={(e) => setFieldValue("group_id", e.target.value)}
                                label="گروه تیکت"
                            >
                                {ticketGroupsList?.map(group => (
                                    <MenuItem key={group.id} value={group.id}
                                        onClick={() => handleSelectGroup({ id: group.id, title: group.title })}
                                    >
                                        {group.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                {touched.group_id && errors.group_id}
                            </FormHelperText>
                        </FormControl>
                        {(isSelected || !!selected) && (
                            <Button
                                variant='outlined' color='primary'
                                sx={{ p: 1.5, ml: 1, fontSize: 30 }}
                                title='ویرایش' onClick={() => handleGroupModal(true)}
                            >
                                <Edit fontSize='inherit' />
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    )
}
