import { Box, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik'

import IdentityInputs from './IdentityInputs';
import ContactInputs from './ContactInputs';
import LocationInputs from './LocationInputs';

export default function SubscriberForm({
    initialValues, handleSubmit, validationSchema, isPending, btnTxt
}) {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                <Form encType='multipart/form-data'>
                    <IdentityInputs
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />

                    <ContactInputs
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />

                    <LocationInputs
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />

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
                            onClick={() => navigate('/subscribers')}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
