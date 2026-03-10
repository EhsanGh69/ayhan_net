import { useEffect, useState } from 'react'
import {
    Box, Button, CircularProgress, Grid, FormControlLabel,
    Checkbox, FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField
} from '@mui/material';
import { Form, Formik, Field } from 'formik'

import { addSubsTicketSchema } from '../../validations/ticketsValidations';
import { useTicketsInGroup, useTicketCartableStaffs } from '../../hooks/useTicketRecord';


export default function AddSubsTicketForm({
    handleSubmit, isPending, ticketGroupsList, handleClose, setSnackbar
}) {
    const [groupId, setGroupId] = useState(null)
    const [isReferVal, setIsReferVal] = useState(false)

    const { ticketsInGroup, isTInGroupErr } = useTicketsInGroup(groupId)
    const { 
        ticketCartableStaffs, tcStaffsLoading, isTcStaffsErr 
    } = useTicketCartableStaffs(isReferVal)

    useEffect(() => {
        if (isTInGroupErr || isTcStaffsErr) {
            setSnackbar({ open: true, message: 'خطا در دریافت اطلاعات', severity: 'error' })
        }
    }, [isTInGroupErr, isTcStaffsErr])

    return (
        <Formik
            initialValues={{ group: '', name: '', content: '', isRefer: false, staff_id: '' }}
            validationSchema={addSubsTicketSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form noValidate>
                    <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}
                        display="flex" flexDirection="column" alignItems="center">
                        <Box width={{ xs: "100%", md: "60%" }}>
                            <FormControl fullWidth
                                error={touched.group && Boolean(errors.group)}>
                                <InputLabel>گروه تیکت *</InputLabel>
                                <Select
                                    value={values.group ?? ''}
                                    onChange={(e) => setFieldValue("group", e.target.value)}
                                    label="گروه تیکت"
                                    sx={{ textAlign: 'left' }}
                                >
                                    {!!ticketGroupsList && ticketGroupsList.map(group => (
                                        <MenuItem key={group.id} value={group.title}
                                            onClick={() => setGroupId(Number(group.id))}
                                        >
                                            {group.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {touched.group && errors.group}
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        <Box width={{ xs: "100%", md: "60%" }}>
                            <FormControl fullWidth
                                error={touched.name && Boolean(errors.name)}>
                                <InputLabel>نام تیکت *</InputLabel>
                                <Select
                                    value={values.name ?? ''}
                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                    label="نام تیکت"
                                    disabled={!values.group}
                                    sx={{ textAlign: 'left' }}
                                >
                                    {!!ticketsInGroup && ticketsInGroup.map(ticket => (
                                        <MenuItem key={ticket.id} value={ticket.name}
                                            onClick={() => setFieldValue("content", ticket.description)}
                                        >
                                            {ticket.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {touched.name && errors.name}
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        <Box width={{ xs: "100%", md: "60%" }}>
                            <TextField
                                fullWidth
                                required
                                label="توضیحات"
                                name="content"
                                value={values.content}
                                onChange={handleChange}
                                error={touched.content && Boolean(errors.content)}
                                helperText={touched.content && errors.content}
                                sx={{ mb: 2 }}
                                multiline
                                minRows={3}
                            />
                        </Box>

                        <Box width={{ xs: "100%", md: "60%" }} textAlign="left">
                            <FormControlLabel
                                control={
                                    <Field
                                        name="isRefer"
                                        as={Checkbox}
                                        checked={values.isRefer}
                                        onChange={(e, isChecked) => {
                                            setFieldValue('isRefer', isChecked)
                                            if (!tcStaffsLoading) setIsReferVal(isChecked)
                                        }}
                                    />
                                }
                                label="ارجاع"
                            />
                        </Box>

                        <Box width={{ xs: "100%", md: "60%" }}>
                            <FormControl fullWidth
                                error={touched.staff_id && Boolean(errors.staff_id)}>
                                <InputLabel>انتخاب کارتابل *</InputLabel>
                                <Select
                                    value={values.staff_id ? values.staff_id : ''}
                                    onChange={(e) => setFieldValue("staff_id", e.target.value)}
                                    label="انتخاب کارتابل"
                                    disabled={!values.isRefer}
                                    sx={{ textAlign: 'left' }}
                                >
                                    {!!ticketCartableStaffs && ticketCartableStaffs.map(staff => (
                                        <MenuItem key={staff.id} value={staff.id}>
                                            {staff.display_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {touched.staff_id && errors.staff_id}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Box
                        width="100%" mb={2} py={1}
                        bgcolor="#e3e3e3ff" borderRadius={1}
                        display="flex" justifyContent="center"
                    >
                        <Button size='large' sx={{ fontSize: 20 }} type='submit'
                            endIcon={isPending ? <CircularProgress size={20} /> : null}
                            variant='contained' color='success'>ثبت تیکت</Button>
                        <Button
                            size='large' type='button'
                            variant='outlined' color='error'
                            sx={{ ml: 2, fontSize: 20 }}
                            onClick={handleClose}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
