import * as Yup from 'yup'

const userPassRegex = /^[A-Za-z0-9@_\-\.]+$/
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const userSipField = (requiredMsg) => Yup.string()
    .matches(userPassRegex, 'نام کاربری نمیتواند شامل حروف و اعداد فارسی باشد')
    .concat(requiredMsg ? Yup.string().required(requiredMsg) : Yup.string().notRequired())

const passSipField = (requiredMsg) => Yup.string()
    .matches(userPassRegex, 'کلمه عبور نمیتواند شامل حروف و اعداد فارسی باشد')
    .concat(requiredMsg ? Yup.string().required(requiredMsg) : Yup.string().notRequired())

const ipSipField = (requiredMsg) => Yup.string()
    .matches(ipRegex, 'آی پی وارد شده معتبر نمی باشد')
    .concat(requiredMsg ? Yup.string().required(requiredMsg) : Yup.string().notRequired())

export const subscriptionSchema = {
    phone_number: Yup.string().required('شماره تلفن الزامی است')
        .matches(/^[1-9]\d{9}$/, 'شماره تلفن معتبر نمی باشد'),
    phone_type: Yup.string().required('انتخاب نوع خط تلفن الزامی می باشد'),

    user_sip_phone: userSipField().when('phone_type', {
        is: "Sip Phone",
        then: (schema) => schema.required('نام کاربری الزامی است'),
        otherwise: (schema) => schema.notRequired()
    }),
    pass_sip_phone: passSipField().when('phone_type', {
        is: "Sip Phone",
        then: (schema) => schema.required('کلمه عبور الزامی است'),
        otherwise: (schema) => schema.notRequired()
    }),
    ip_sip_phone: ipSipField().when('phone_type', {
        is: "Sip Phone",
        then: (schema) => schema.required('آی پی الزامی است'),
        otherwise: (schema) => schema.notRequired()
    })
}

export const haveSubscriptionSchema = Yup.object({ ...subscriptionSchema })

export const newApplicantSchema = Yup.object({
    file_number: Yup.string().required("شماره پرونده الزامی است")
        .min(6, "شماره پرونده نمیتواند کمتر از 6 رقم باشد")
        .max(10, "شماره پرونده نمی تواند بیشتر از 10 رقم باشد")
        .matches(/^[0-9]+$/, "شماره پرونده نمی تواند شامل حروف باشد"),
    ...subscriptionSchema
})

export const changeTechSchema = Yup.object({
    user_sip_phone: userSipField('نام کاربری الزامی است'),
    pass_sip_phone: passSipField('کلمه عبور الزامی است'),
    ip_sip_phone: ipSipField('آی پی الزامی است')
})
