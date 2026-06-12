import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material'
import { Person, LocalPhone } from '@mui/icons-material'
import { Form, Formik } from 'formik'

import { modalBox } from '../../styles/globalStyles'
import { useChangeTechAction } from '../../hooks/usePhoneSubscription'
import { changeTechSchema } from '../../validations/sellServicesValidations'
import useErrorHandler from '../../hooks/useErrorHandler'
import { sipPhoneInputs } from '../../constants/formInputs'

export default function ChangeTechModal({ open, closeHandler, subs, setSnackbar }) {
    const { changeTechAction, changeTechActionErr, isChangeTechActionErr } = useChangeTechAction()

    useErrorHandler(isChangeTechActionErr, changeTechActionErr, setSnackbar)

    const handleChangeTech = async (values) => {
        if (subs.id) {
            await changeTechAction({ subsId: subs.id, techData: values })
            setSnackbar({ open: true, message: 'وضعیت مشترک با موفقیت تغییر یافت', severity: 'success' })
        }
        closeHandler()
    }

    return (
        <Modal open={open} onClose={closeHandler}>
            <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" justifyContent="center" alignItems="center"
                >
                    <Person fontSize='large' sx={{ color: '#b56c07', fontSize: '2.5rem' }} />
                    {subs.fullname}
                </Typography>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" justifyContent="center" alignItems="center"
                >
                    <LocalPhone fontSize='large' sx={{ color: '#b56c07', fontSize: '2.5rem' }} />
                    {subs.phoneNumber}
                </Typography>

                <Box width={{ xs: '100%', md: "80%" }} margin="auto">
                    <Formik
                        initialValues={{
                            user_sip_phone: '', pass_sip_phone: '', ip_sip_phone: ''
                        }}
                        validationSchema={changeTechSchema}
                        onSubmit={handleChangeTech}
                    >
                        {({ values, handleChange, handleBlur, errors, touched }) => (
                            <Form>
                                <Box>
                                    {sipPhoneInputs.map(input => (
                                        <FormControl fullWidth key={input.name}>
                                            <TextField
                                                autoComplete='off'
                                                label={input.label}
                                                name={input.name}
                                                value={values[input.name]}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched[input.name] && Boolean(errors[input.name])}
                                                helperText={touched[input.name] && errors[input.name]}
                                                sx={{
                                                    mb: 2,
                                                    '& .MuiInputBase-input': {
                                                        fontFamily: 'system-ui',
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    ))}

                                    <Box>
                                        <Button
                                            type='submit' color='primary'
                                            sx={{ mr: 2 }} variant='contained'
                                        >
                                            تایید
                                        </Button>
                                        <Button
                                            onClick={closeHandler}
                                            color='secondary' variant='outlined'
                                        >
                                            انصراف
                                        </Button>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    )
}
