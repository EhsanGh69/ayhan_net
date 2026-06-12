import { useState } from 'react'
import {
    Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, InputLabel,
    MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography
} from '@mui/material'


import { modalBox } from "../../styles/globalStyles"
import { Person } from '@mui/icons-material'
import { Field } from 'formik'
import NIdUploadForm from './NIdUploadForm'
import HaveSubscriptionForm from './HaveSubscriptionForm'


const CancelBtn = ({ setPhoneStatus, closeHandler }) => {
    return (
        <Button
            onClick={() => {
                setPhoneStatus('')
                closeHandler()
            }}
            color='secondary' variant='outlined'
        >
            انصراف
        </Button>
    )
}

export default function ChangeStatusModal({ open, closeHandler, subs, setSnackbar }) {
    const [phoneStatus, setPhoneStatus] = useState('')

    return (
        <Modal open={open}
            onClose={() => {
                setPhoneStatus('')
                closeHandler()
            }}
        >
            <Box sx={modalBox} width={{ xs: "80%", md: "60%", lg: "40%", xl: "35%" }}>
                <Typography
                    variant='h6' mb={2} sx={{ fontFamily: 'Vazir', textAlign: "center" }}
                    component="div" display="flex" flexDirection="column" alignItems="center"
                >
                    <Person fontSize='large' sx={{ color: '#b56c07', fontSize: '2.5rem' }} />
                    {subs.fullname}
                </Typography>

                <Box display="flex" flexDirection="column"
                    width={{ xs: '100%', md: "80%" }} margin="auto">
                    <FormControl fullWidth sx={{ mb: 2 }} margin='dense'>
                        <InputLabel>وضعیت اشتراک تلفن</InputLabel>
                        <Select
                            value={phoneStatus}
                            onChange={(e) => setPhoneStatus(e.target.value)}
                            label="وضعیت اشتراک تلفن"
                            sx={{ textAlign: 'left' }}
                        >
                            <MenuItem value="دارای اشتراک تلفن" >
                                دارای اشتراک تلفن
                            </MenuItem>
                            <MenuItem value="متقاضی جدید">
                                متقاضی جدید
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {phoneStatus === "متقاضی جدید" && (
                        <NIdUploadForm
                            setSnackbar={setSnackbar}
                            subsId={subs.id}
                            closeHandler={closeHandler}
                        >
                            <CancelBtn
                                closeHandler={closeHandler}
                                setPhoneStatus={setPhoneStatus}
                            />
                        </NIdUploadForm>
                    )}

                    {phoneStatus === "دارای اشتراک تلفن" && (
                        <HaveSubscriptionForm
                            subsId={subs.id}
                            setSnackbar={setSnackbar}
                            closeHandler={closeHandler}
                        >
                            <CancelBtn
                                closeHandler={closeHandler}
                                setPhoneStatus={setPhoneStatus}
                            />
                        </HaveSubscriptionForm>
                    )}
                </Box>
            </Box>
        </Modal>
    )
}
