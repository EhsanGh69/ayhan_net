import { useEffect, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { Upload } from '@mui/icons-material'

import { useUploadNidImage } from "../../hooks/usePhoneSubscription"
import useErrorHandler from '../../hooks/useErrorHandler'


export default function NIdUploadForm({ setSnackbar, subsId, closeHandler, children }) {
  const [filename, setFilename] = useState(null)
  const [fileValue, setFileValue] = useState(null)

  const handleSelectedFile = (event) => {
    const file = event.currentTarget.files[0]
    setFileValue(file)
    setFilename(file.name)
  }

  const { uploadNidImage, isUploadNidImageErr, uploadNidImageErr } = useUploadNidImage()

  const handleUpload = async () => {
    const formData = new FormData()
    if (fileValue) formData.append("nid_image", fileValue)
    await uploadNidImage({ subsId, nidImage: formData })
    .then(() => {
      setSnackbar({ open: true, message: 'وضعیت مشترک با موفقیت تغییر یافت', severity: 'success' })
      closeHandler()
    })
  }

  useErrorHandler(isUploadNidImageErr, uploadNidImageErr, setSnackbar)

  return (
    <Box display="flex" flexDirection="column" >
      <Box border="1px solid #bab9b9" p={1} borderRadius={1}>
        <input
          id="nidImage"
          type="file"
          name="nidImage"
          style={{ display: 'none' }}
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleSelectedFile}
        />
        <label htmlFor="nidImage">
          <IconButton component="span" color="primary">
            <Typography>بارگذاری تصویر کارت ملی</Typography>
            <Upload />
          </IconButton>
        </label>

        {filename && (
          <Typography variant="subtitle2">
            فایل انتخاب شده: <strong>{filename}</strong>
          </Typography>
        )}
      </Box>

      <Box mt={3}>
        <Button
          onClick={handleUpload} disabled={!fileValue}
          color='primary' sx={{ mr: 2 }} variant='contained'>تایید</Button>
        {children}
      </Box>
    </Box>
  )
}
