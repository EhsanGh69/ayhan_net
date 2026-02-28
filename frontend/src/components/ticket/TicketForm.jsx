import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik'

import { ticketInputs } from '../../constants/formInputs'
import SelectTicketGroup from '../table/SelectTicketGroup';

export default function TicketForm({
    initialValues, handleSubmit, validationSchema, isPending, btnTxt, handleGroupModal, handleSelectGroup,
    isSelected
}) {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                <Form noValidate>
                    <Grid container bgcolor="#e3e3e3ff" my={1} p={2} borderRadius={1} gap={1}
                    display="flex" flexDirection="column" alignItems="center">
                        {ticketInputs.map(input => {
                            if (input.name === 'group_id') return (
                                <SelectTicketGroup
                                    key={input.name}
                                    value={values.group_id}
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    errors={errors}
                                    handleGroupModal={handleGroupModal}
                                    handleSelectGroup={handleSelectGroup}
                                    isSelected={isSelected}
                                />
                            )
                            else return (
                                <Box key={input.name} width={{ xs: "100%", md: "60%", lg: "40%" }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label={input.label}
                                        name={input.name}
                                        value={values[input.name]}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched[input.name] && Boolean(errors[input.name])}
                                        helperText={touched[input.name] && errors[input.name]}
                                        sx={{ mb: 2 }}
                                        multiline={input.name === 'description'}
                                        minRows={3}
                                    />
                                </Box>
                            )
                        })}
                    </Grid>

                    <Box
                        width="100%" mb={2} py={1}
                        bgcolor="#e3e3e3ff" borderRadius={1}
                        display="flex" justifyContent="center"
                    >
                        <Button size='large' sx={{ fontSize: 20 }} type='submit'
                            endIcon={isPending ? <CircularProgress size={20} /> : null}
                            variant='contained' color='success'>{btnTxt}</Button>
                        <Button
                            size='large' type='button'
                            variant='outlined' color='error'
                            sx={{ ml: 2, fontSize: 20 }}
                            onClick={() => navigate('/tickets')}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
