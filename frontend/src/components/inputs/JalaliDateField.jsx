import { TextField } from '@mui/material'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DateObject from 'react-date-object'


export default function JalaliDateField({ field, form, label }) {
    const { name, value } = field
    const { setFieldValue, errors, touched } = form

    const maxBirthDate = new DateObject({ calendar: persian, }).subtract(18, "years");
    const minBirthDate = new DateObject({ calendar: persian, }).subtract(100, "years");

    return (
        <DatePicker
            value={value}
            onChange={(val) => setFieldValue(name, val)}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            minDate={minBirthDate}
            maxDate={maxBirthDate}
            currentDate={maxBirthDate}
            render={(inputProps, openCalendar) => (
                <TextField
                    fullWidth
                    label={label}
                    value={value ? value.format("YYYY/MM/DD") : ""}
                    onClick={openCalendar}
                    error={Boolean(touched[name] && errors[name])}
                    helperText={touched[name] && errors[name]}
                    readOnly
                />
            )}
        />

    )
}
