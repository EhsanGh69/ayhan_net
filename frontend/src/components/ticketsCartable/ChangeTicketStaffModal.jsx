import { useEffect, useState } from 'react'
import {
    Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, Typography
} from '@mui/material'
import { PersonPinCircle } from '@mui/icons-material'

import { useTicketCartableStaffs, useChangeTicketRecordStaff } from '../../hooks/useTicketRecord'
import { modalBox } from "../../styles/globalStyles";

export default function ChangeTicketStaffModal({
    open, closeHandler, setSnackbar, recordId, recordStaffId
}) {
    const [staffId, setStaffId] = useState(null)

    const { ticketCartableStaffs, isTcStaffsErr } = useTicketCartableStaffs(open)
    const {
        changeTicketRecordStaff, changeTRStaffPending, isChangeTRStaffErr
    } = useChangeTicketRecordStaff()

    const changeTicketStaffHandler = async () => {
        if (staffId) {
            await changeTicketRecordStaff({ recordId, staffData: { staff_id: staffId } })
                .then(() => setSnackbar({
                    open: true, message: 'کارتابل تیکت با موفقیت تغییر یافت', severity: 'success'
                }))
        }
        closeHandler()
    }

    useEffect(() => {
        if (recordStaffId) setStaffId(recordStaffId)
    }, [recordStaffId])

    useEffect(() => {
        if (isTcStaffsErr) {
            setSnackbar({ open: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
            closeHandler()
        }
        if (isChangeTRStaffErr) {
            setSnackbar({ open: true, message: 'خطا در ارسال اطلاعات', severity: 'error' })
            closeHandler()
        }
    }, [isTcStaffsErr, isChangeTRStaffErr])

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <PersonPinCircle
                        fontSize='large'
                        sx={{ color: '#076ab5', fontSize: '2.5rem' }}
                    />
                    تغییر کارتابل تیکت
                </Typography>

                <Box
                    width={{ xs: "100%", md: "80%" }} mb={2} py={1} mx="auto"
                    bgcolor="#e3e3e3ff" borderRadius={1}
                    display="flex" flexDirection="column"
                >
                    <FormControl fullWidth>
                        <InputLabel>انتخاب کارتابل *</InputLabel>
                        <Select
                            value={staffId ?? ''}
                            onChange={(e) => setStaffId(e.target.value)}
                            label="انتخاب کارتابل"
                            sx={{ textAlign: 'left' }}
                        >
                            {!!ticketCartableStaffs && ticketCartableStaffs.map(staff => (
                                <MenuItem key={staff.id} value={staff.id}>
                                    {staff.display_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box mt={1}>
                        <Button
                            size='large' sx={{ fontSize: 20 }} disabled={!staffId}
                            endIcon={changeTRStaffPending ? <CircularProgress size={20} /> : null}
                            variant='contained' color='success'
                            onClick={changeTicketStaffHandler}
                        >
                            تایید
                        </Button>
                        <Button
                            size='large' type='button'
                            variant='outlined' color='error'
                            sx={{ ml: 2, fontSize: 20 }}
                            onClick={closeHandler}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
