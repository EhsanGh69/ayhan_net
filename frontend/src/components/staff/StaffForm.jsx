import { Box, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik'

import PersonalInputs from './PersonalInputs'
import UserInputs from './UserInputs'
import JobInputs from './JobInputs'


export default function StaffForm({ 
    initialValues, handleSubmit, validationSchema, imageError, isPending, btnTxt
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
                    <PersonalInputs
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    <UserInputs
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                        btnTxt={btnTxt}
                    />

                    <JobInputs
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        imageError={imageError}
                        btnTxt={btnTxt}
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
                            onClick={() => navigate('/users/staff')}
                        >
                            انصراف
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
