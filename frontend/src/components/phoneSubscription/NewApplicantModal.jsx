import {
    Box, Button, CircularProgress, FormControl, IconButton, Modal, TextField, Typography
} from '@mui/material'
import { Person, Download } from '@mui/icons-material'
import { Form, Formik } from 'formik'


import { modalBox } from '../../styles/globalStyles'
import { useNewApplicantAction, useDownloadNidImage } from '../../hooks/usePhoneSubscription'
import { newApplicantSchema } from '../../validations/sellServicesValidations'
import useErrorHandler from '../../hooks/useErrorHandler'
import PhoneSubscriptionFields from './PhoneSubscriptionFields'


export default function NewApplicantModal({ open, closeHandler, subs, setSnackbar }) {
    const {
        downloadNidImage, downloadNidImageErr, downloadNidImagePending, isDownloadNidImageErr
    } = useDownloadNidImage()

    useErrorHandler(isDownloadNidImageErr, downloadNidImageErr, setSnackbar)

    const handleDownloadNidImage = async () => {
        if (subs.id) {
            await downloadNidImage({ id: subs.id, fullname: subs.fullname })
        }
    }

    const {
        newApplicantAction, isNewApplicantActionErr, newApplicantActionErr
    } = useNewApplicantAction()

    useErrorHandler(isNewApplicantActionErr, newApplicantActionErr, setSnackbar)

    const handleRegisterNewApplicant = async (values) => {
        if (subs.id) {
            await newApplicantAction({ subsId: subs.id, applicantData: values })
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

                <Box  
                    width={{ xs: '100%', md: "80%" }} mb={2}  mx="auto"
                     border="1px solid #c1c0c0" borderRadius={1}>
                    <IconButton component="span" color="primary" 
                        onClick={handleDownloadNidImage}
                    >
                        {downloadNidImagePending
                            ? <><Typography>در حال دانلود ...</Typography><CircularProgress size={20} /></>
                            : <><Typography>بارگذاری تصویر کارت ملی</Typography><Download /></>
                        }
                    </IconButton>
                </Box>

                <Box width={{ xs: '100%', md: "80%" }} margin="auto">
                    <Formik
                        initialValues={{
                            phone_number: '', phone_type: '', user_sip_phone: '',
                            pass_sip_phone: '', ip_sip_phone: '', file_number: ''
                        }}
                        validationSchema={newApplicantSchema}
                        onSubmit={handleRegisterNewApplicant}
                    >
                        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                            <Form>
                                <FormControl fullWidth>
                                    <TextField
                                        autoComplete='off'
                                        label='شماره پرونده'
                                        name="file_number"
                                        value={values.file_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.file_number && Boolean(errors.file_number)}
                                        helperText={touched.file_number && errors.file_number}
                                        sx={{ mb: 2 }}
                                    />
                                </FormControl>
                                <PhoneSubscriptionFields
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />

                                {values.phone_type !== '' && (
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
                                )}
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Modal>
    )
}
