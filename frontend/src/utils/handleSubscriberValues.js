import moment from "jalali-moment"
import getISODate from "./getISODate"

const optionalFields = {
    phone: "", national_id: "", father_name: "", birth_date: "", certificate_number: "",
    subscriber_type: "", province_id: "", city_id: "", area: "", main_street: "",
    side_street: "", alley: "", side_alley: "", building_name: "", floor: "", unit: "",
    house_number: "", corporate_name: "", registration_number: "", corporate_national_id: ""
}

export const handleOptionalFields = (subscriberDetail) => {
    Object.keys(optionalFields).forEach(field => {
        switch (field) {
            case "birth_date":
                optionalFields["birth_date"] = subscriberDetail.birth_date
                    ? moment(subscriberDetail.birth_date).format('jYYYY/jMM/jDD') : null
                break;
            case "province_id":
                optionalFields["province_id"] = subscriberDetail.province_id
                    ? String(subscriberDetail.province_id) : ""
                break;
            case "city_id":
                optionalFields["city_id"] = subscriberDetail.city_id
                    ? String(subscriberDetail.city_id) : ""
                break;
            case "area":
                optionalFields["area"] = subscriberDetail.area
                    ? String(subscriberDetail.area) : ""
                break;

            default:
                optionalFields[field] = subscriberDetail[field] ?? ""
                break;
        }
    })

    return optionalFields
}

export const handleSubscriberValues = (values) => {
    const corporate_data = values.subscriber_type === 'legal' ? {
        name: values.corporate_name,
        registration_number: values.registration_number,
        national_id: values.corporate_national_id
    } : null
    const preparedValues = {
        ...values,
        birth_date: getISODate(values.birth_date),
        province_id: Number(values.province_id),
        city_id: Number(values.city_id),
        area: Number(values.area)
    }
    const subs_data = {}

    Object.keys(preparedValues).forEach(key => {
        const corporateKeys = ['corporate_name', 'registration_number', 'corporate_national_id']
        if (!corporateKeys.includes(key)) {
            subs_data[key] = preparedValues[key]
        }
    })

    return corporate_data ? { subs_data, corporate_data } : { subs_data }
}
