import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { Person, Edit } from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom';
import moment from "jalali-moment"

import MainPage from '../MainPage';
import SnackAlert from '../../components/SnackAlert';
import { useEditSubscriber, useSubscriber } from '../../hooks/useSubscriber'
import SubscriberForm from '../../components/subscriber/SubscriberForm';
import { subscriberSchema } from '../../validations/usersValidations'
import LoadingBox from '../../components/LoadingBox';
import getISODate from '../../utils/getISODate';
import useErrorHandler from '../../hooks/useErrorHandler';
import { handleSubscriberValues, handleOptionalFields } from '../../utils/handleSubscriberValues';

export default function EditSubscriber() {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const [initValues, setInitValues] = useState(null)
    const { subsId } = useParams()
    const navigate = useNavigate()
    const {
        subscriberDetail, subsDetailLoading, subsDetailErr, isSubsDetailErr
    } = useSubscriber(Number(subsId))
    const { editSubscriber, editSubsPending, editSubsError, isEditSubsError } = useEditSubscriber()

    useEffect(() => {
        if (!subsDetailLoading && subscriberDetail) {
            setInitValues({
                // required fields
                first_name: subscriberDetail.first_name,
                last_name: subscriberDetail.last_name,
                mobile: subscriberDetail.mobile,
                postal_code: subscriberDetail.postal_code,
                // optional fields
                ...handleOptionalFields(subscriberDetail)
            })
        }
    }, [subscriberDetail, subsDetailLoading])

    const handleEditSubscriber = async (values, { }) => {
        const finalData = handleSubscriberValues(values)
        await editSubscriber({ subsId: Number(subsId), subsData: finalData })
            .then(() => {
                setSnackbar({
                    open: true, message: 'مشترک با موفقیت ویرایش شد', severity: 'success'
                })
                setTimeout(() => navigate('/subscribers'), 500)
            })
    }

    useErrorHandler(isSubsDetailErr, subsDetailErr, setSnackbar)
    useErrorHandler(isEditSubsError, editSubsError, setSnackbar)

    if (subsDetailLoading) {
        return <LoadingBox />
    }

    return (
        <MainPage>
            <Box width="100%" mb={2} bgcolor="#e3e3e3ff" py={1} borderRadius={1}>
                <Typography variant='h4' color='success'
                    display="flex" alignItems="center" justifyContent="center">
                    <Edit fontSize='large' sx={{ fontSize: '3rem', m: 0, p: 0 }} />
                    <Person fontSize='large' sx={{ fontSize: '3rem', ml: 0, p: 0 }} />
                    <span>ویرایش اطلاعات مشترک</span>
                </Typography>
            </Box>

            {!!initValues && (
                <SubscriberForm
                    initialValues={{ ...initValues }}
                    handleSubmit={handleEditSubscriber}
                    validationSchema={subscriberSchema}
                    isPending={editSubsPending}
                    btnTxt="ویرایش اطلاعات"
                />
            )}
            <SnackAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </MainPage>
    )
}
