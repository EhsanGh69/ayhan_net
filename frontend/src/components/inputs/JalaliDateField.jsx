import { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DateObject from 'react-date-object'
import { CalendarToday } from '@mui/icons-material'


export default function JalaliDateField({ field, form, label }) {
    const { name, value } = field
    const { setFieldValue, errors, touched, handleBlur } = form
    const [open, setOpen] = useState(false)

    const maxBirthDate = new DateObject({ calendar: persian, }).subtract(18, "years");
    const minBirthDate = new DateObject({ calendar: persian, }).subtract(100, "years");

    const handleDateChange = (val) => {
        setFieldValue(name, val)
        setOpen(false)
    }

    const handleInputChange = (e) => {
        if(/[^0-9/]/.test(e.target.value)) setFieldValue(name, "")
        else setFieldValue(name, e.target.value) 
    }


    const displayValue = value?.isValid ? value.format("YYYY/MM/DD") : (value || "")

    return (
        <DatePicker
            value={value?.isValid ? value : null}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            minDate={minBirthDate}
            maxDate={maxBirthDate}
            currentDate={maxBirthDate}
            containerStyle={{ width: "100%", fontFamily: "Vazir" }}
            render={(_, openCalendar) => (
                <TextField
                    fullWidth
                    label={label}
                    value={displayValue}
                    onChange={handleInputChange}
                    error={Boolean(touched[name] && errors[name])}
                    helperText={touched[name] && errors[name]}
                    placeholder="1403/01/15"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={openCalendar} edge="end">
                                        <CalendarToday />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
            )}
        />
    )
}
