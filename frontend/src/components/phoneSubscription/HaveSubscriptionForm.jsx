import { Box, Button } from '@mui/material'
import { Form, Formik } from 'formik'

import { useChangeSubscriptionStatus } from "../../hooks/usePhoneSubscription"
import { haveSubscriptionSchema } from '../../validations/sellServicesValidations'
import { sipPhoneInputs } from '../../constants/formInputs'
import useErrorHandler from '../../hooks/useErrorHandler'
import PhoneSubscriptionFields from './PhoneSubscriptionFields'

export default function HaveSubscriptionForm({ subsId, setSnackbar, closeHandler, children }) {
	const {
		changeSubsStatus, isChangeSubsStatusErr, changeSubsStatusErr
	} = useChangeSubscriptionStatus()

	useErrorHandler(isChangeSubsStatusErr, changeSubsStatusErr, setSnackbar)

	const handleChangeStatus = async (values) => {
		if (values.phone_type === 'PSTN') {
			await changeSubsStatus({
				subsId,
				subsData: {
					phone_number: values.phone_number,
					phone_type: values.phone_type
				}
			})
		} else {
			await changeSubsStatus({ subsId, subsData: values })
		}
		setSnackbar({ open: true, message: 'وضعیت مشترک با موفقیت تغییر یافت', severity: 'success' })
		closeHandler()
	}

	return (
		<Formik
			initialValues={{
				phone_number: '', phone_type: '', user_sip_phone: '',
				pass_sip_phone: '', ip_sip_phone: ''
			}}
			validationSchema={haveSubscriptionSchema}
			onSubmit={handleChangeStatus}
		>
			{({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
				<Form>
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
							<Button type='submit' color='primary' sx={{ mr: 2 }} variant='contained'>
								تایید
							</Button>
							{children}
						</Box>
					)}
				</Form>
			)}
		</Formik>
	)
}