import { useEffect } from 'react'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { CommentOutlined } from '@mui/icons-material'
import { Form, Formik } from 'formik'

import { useAddTicketGroup, useEditTicketGroup } from '../../hooks/useTicket';
import { modalBox } from "../../styles/globalStyles";
import { addTicketGroupSchema } from "../../validations/ticketsValidations";

export default function TicketGroupModal({ open, closeHandler, group = null, setSnackbar }) {
  const { addTicketGroup, addTGroupPending, isAddTGroupError, addTGroupError } = useAddTicketGroup()
  const { editTicketGroup, editTGroupPending, isEditTGroupError, editTGroupError } = useEditTicketGroup()

  const handleSubmitTicketGroup = async (values, { }) => {
    if (group) {
      await editTicketGroup({ groupId: group?.id, groupData: { ...values } })
      setSnackbar({ open: true, message: 'عنوان گروه با موفقیت ویرایش شد', severity: 'success' })
      closeHandler()
    } else {
      await addTicketGroup(values)
      setSnackbar({ open: true, message: 'گروه جدید با موفقیت اضافه شد', severity: 'success' })
      closeHandler()
    }
  }

  useEffect(() => {
    const addErrResponse = addTGroupError?.response?.data?.detail
    const editErrResponse = editTGroupError?.response?.data?.detail
    const addErrorMsg = typeof addErrResponse === 'string' ? addErrResponse : 'خطا در ارسال اطلاعات'
    const editErrorMsg = typeof editErrResponse === 'string' ? editErrResponse : 'خطا در ارسال اطلاعات'
    if (isAddTGroupError) {
      setSnackbar({ open: true, message: addErrorMsg, severity: 'error' })
      closeHandler()
    }
    if (isEditTGroupError) {
      setSnackbar({ open: true, message: editErrorMsg, severity: 'error' })
      closeHandler()
    }
  }, [isAddTGroupError, addTGroupError, isEditTGroupError, editTGroupError])

  return (
    <Modal open={open} onClose={closeHandler}>
      <Box sx={modalBox}
        width={{ xs: "80%", sm: "50%", md: "45%", lg: "30%", xl: "25%" }}>
        <Typography
          variant='h5' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
          component="div" display="flex" flexDirection="column" alignItems="center"
        >
          <CommentOutlined fontSize='large' color='info' sx={{ fontSize: '2.5rem' }} />
          {group
            ? <span>ویرایش عنوان گروه</span>
            : <span>افزودن گروه جدید</span>
          }
        </Typography>

        <Formik
          initialValues={{ title: group ? group.title : '' }}
          validationSchema={addTicketGroupSchema}
          onSubmit={handleSubmitTicketGroup}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <TextField
                autoComplete='off'
                fullWidth
                label="عنوان گروه"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ mb: 2 }}
              />
              <Button
                type='submit'
                disabled={group ? editTGroupPending : addTGroupPending}
                color='primary' sx={{ mr: 2 }}
                variant='contained'
              >
                {group ? 'ذخیره تغییرات' : 'افزودن'}
              </Button>
              <Button
                color='secondary'
                variant='outlined'
                onClick={closeHandler}
              >
                انصراف
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  )
}
