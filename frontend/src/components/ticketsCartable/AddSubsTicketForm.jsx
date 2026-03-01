import { useEffect, useState } from 'react'
import {
    Box, Button, CircularProgress, Grid, FormControlLabel, Checkbox, TextField
} from '@mui/material';
import { Form, Formik, Field } from 'formik'

import { addSubsTicketSchema } from '../../validations/ticketsValidations';
import { useTicketsInGroup, useTicketCartableStaffs } from '../../hooks/useTicketRecord';
import SelectTicketGroupTitle from './SelectTicketGroupTitle';
import SelectTicketName from './SelectTicketName';
import SelectTicketCartable from './SelectTicketCartable';


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
                        {!!ticketGroupsList && (
                            <SelectTicketGroupTitle
                                ticketGroupsList={ticketGroupsList}
                                setGroupId={setGroupId}
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                                touched={touched}
                            />
                        )}

                        <SelectTicketName
                            ticketsInGroup={ticketsInGroup}
                            groupId={groupId}
                            values={values}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                        />

                        <Box width="100%">
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

                        <SelectTicketCartable
                            ticketCartableStaffs={ticketCartableStaffs}
                            values={values}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                        />
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
