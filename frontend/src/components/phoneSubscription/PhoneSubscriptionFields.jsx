import { 
    Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, 
    RadioGroup, TextField 
} from '@mui/material'

import { sipPhoneInputs } from '../../constants/formInputs'

export default function PhoneSubscriptionFields({ 
    values, touched, errors, setFieldValue, handleBlur, handleChange
}) {
    return (
        <>
            <Box
                textAlign="left" border="1px solid #bab9b9" borderRadius={1} p={1}
                mb={2}
            >
                <FormControl>
                    <FormLabel>نوع خط تلفن</FormLabel>
                    <RadioGroup
                        name="phone_type"
                        value={values.phone_type}
                        onChange={(e) => setFieldValue("phone_type", e.target.value)}
                    >
                        <FormControlLabel value="Sip Phone" control={<Radio />} label="Sip Phone" />
                        <FormControlLabel value="PSTN" control={<Radio />} label="PSTN" />
                    </RadioGroup>
                    <FormHelperText>
                        {touched.phone_type && errors.phone_type}
                    </FormHelperText>
                </FormControl>
                {values.phone_type !== '' && (
                    <FormControl fullWidth>
                        <TextField
                            autoComplete='off'
                            label='شماره تلفن'
                            name="phone_number"
                            value={values.phone_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone_number && Boolean(errors.phone_number)}
                            helperText={touched.phone_number && errors.phone_number}
                            sx={{ mb: 2 }}
                        />
                    </FormControl>
                )}
            </Box>
            {values.phone_type === 'Sip Phone' && (
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
                </Box>
            )}
        </>
    )
}
