import * as Yup from 'yup'

export const loginSchema = Yup.object({
    username: Yup.string().required('لطفا نام کاربری خود را وارد کنید'),
    password: Yup.string().required('لطفا رمز عبور خود را وارد کنید'),
    captcha: Yup.string().required('لطفا کد امنیتی را وارد کنید')
})

export const subsRegisterSchema = Yup.object({
    first_name: Yup.string().required('نام الزامی است')
        .min(3, 'نام باید حداقل ۳ کاراکتر باشد').max(50, 'نام باید حداکثر 50 کاراکتر باشد')
        .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید شامل حروف فارسی باشد'),

    last_name: Yup.string().required('نام خانوادگی الزامی است')
        .min(3, 'نام خانوادگی باید حداقل ۳ کاراکتر باشد').max(50, 'نام خانوادگی باید حداکثر 50 کاراکتر باشد')
        .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید شامل حروف فارسی باشد'),

    mobile: Yup.string().required('شماره همراه الزامی است')
        .matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر نمی باشد'),

    postal_code: Yup.string().required('کد پستی الزامی است')
        .max(10, 'کدپستی نامعتبر است').min(10, 'کدپستی نامعتبر است'),
})