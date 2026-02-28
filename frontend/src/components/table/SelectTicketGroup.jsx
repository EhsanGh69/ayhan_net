import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'

import { useTicketGroupsList } from '../../hooks/useTicket';

export default function SelectTicketGroup({
    value, setFieldValue, touched, errors, handleGroupModal, isSelected = false, handleSelectGroup
}) {
    const [ticketGroupErr, setTicketGroupErr] = useState('')

    const { ticketGroupsList, isTGroupsListErr, tGroupsListErr } = useTicketGroupsList()

    useEffect(() => {
        const errResponse = tGroupsListErr?.response?.data?.detail
        const errorMsg = typeof errResponse === 'string' ? errResponse : 'خطا در دریافت اطلاعات'
        if (isTGroupsListErr) setTicketGroupErr(errorMsg)
    }, [isTGroupsListErr, tGroupsListErr])

    return (
        <Box width={{ xs: "100%", md: "60%", lg: "40%" }} display="flex" alignItems="center">
            {!!ticketGroupErr && <Typography variant='subtitle1' color='error'>{ticketGroupErr}</Typography>}
            <FormControl fullWidth
                error={touched.group_id && Boolean(errors.group_id)}>
                <InputLabel>گروه *</InputLabel>
                <Select
                    value={value}
                    onChange={(e) => setFieldValue("group_id", e.target.value)}
                    label="گروه"
                >
                    {!!ticketGroupsList && ticketGroupsList.map(group => (
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
            {isSelected && (
                <Button
                    variant='outlined' color='primary'
                    sx={{ p: 1.5, ml: 1, fontSize: 30 }}
                    title='ویرایش' onClick={() => handleGroupModal(true)}
                >
                    <Edit fontSize='inherit' />
                </Button>
            )}
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
    )
}
