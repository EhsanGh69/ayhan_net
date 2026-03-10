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
                phone: subscriberDetail?.phone ?? "",
                national_id: subscriberDetail?.national_id ?? "",
                father_name: subscriberDetail?.father_name ?? "",
                birth_date: subscriberDetail?.birth_date
                    ? moment(subscriberDetail.birth_date, "YYYY-MM-DD").locale("fa") : null,
                certificate_number: subscriberDetail?.certificate_number ?? "",
                subscriber_type: subscriberDetail?.subscriber_type ?? "",
                province_id: subscriberDetail?.province_id ? String(subscriberDetail.province_id) : "",
                city_id: subscriberDetail?.city_id ? String(subscriberDetail.city_id) : "",
                area: subscriberDetail?.area ? String(subscriberDetail.area) : "",
                main_street: subscriberDetail?.main_street ?? "",
                side_street: subscriberDetail?.side_street ?? "",
                alley: subscriberDetail?.alley ?? "",
                building_name: subscriberDetail?.building_name ?? "",
                house_number: subscriberDetail?.house_number ?? "",
            })
        }
    }, [subscriberDetail, subsDetailLoading])

    const handleEditSubscriber = async (values, { }) => {
        const preparedValues = {
            ...values,
            birth_date: values.birth_date.toDate().toISOString().slice(0, 10),
            province_id: Number(values.province_id),
            city_id: Number(values.city_id),
            area: Number(values.area)
        }
        await editSubscriber({ subsId: Number(subsId), subsData: preparedValues })
            .then(() => {
                setSnackbar({
                    open: true, message: 'مشترک با موفقیت ویرایش شد', severity: 'success'
                })
                setTimeout(() => navigate('/subscribers'), 500)
            })
    }

    useEffect(() => {
        const errResDetail = subsDetailErr?.response?.data?.detail
        const detailErrMsg = typeof errResDetail === 'string' ? errResDetail : 'خطا در دریافت اطلاعات'
        if (isSubsDetailErr) setSnackbar({ open: true, message: detailErrMsg, severity: 'error' })

        const errResEdit = editSubsError?.response?.data?.detail
        const editErrMsg = typeof errResEdit === 'string' ? errResEdit : 'خطا در دریافت اطلاعات'
        if (isEditSubsError) setSnackbar({ open: true, message: editErrMsg, severity: 'error' })
    }, [subsDetailErr, isSubsDetailErr, editSubsError, isEditSubsError])

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
