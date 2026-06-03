import * as Yup from 'yup'
import DateObject from "react-date-object"

const VALID_CARTABLE_TYPES = ['tickets', 'internal', 'fusion'];

const identityObject = {
    first_name: Yup.string().required('نام الزامی است')
        .min(3, 'نام باید حداقل ۳ کاراکتر باشد').max(50, 'نام باید حداکثر 50 کاراکتر باشد')
        .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید شامل حروف فارسی باشد'),
    last_name: Yup.string().required('نام خانوادگی الزامی است')
        .min(3, 'نام خانوادگی باید حداقل ۳ کاراکتر باشد').max(50, 'نام خانوادگی باید حداکثر 50 کاراکتر باشد')
        .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید شامل حروف فارسی باشد'),
    national_id: Yup.string().required('کد ملی الزامی است')
        .min(10, 'کد ملی معتبر نمی باشد').max(10, 'کد ملی معتبر نمی باشد')
        .matches(/^\d+$/, 'کد ملی معتبر نمی باشد'),
    birth_date: Yup.mixed().required('تاریخ تولد الزامی است')
    .test("valid-date", "فرمت تاریخ نامعتبر است (YYYY/MM/DD)", 
        (value) => {
        if (!value) return false;
        if (value instanceof DateObject && value.isValid) return true;
        if (typeof value === "string") {
            const regex = /^\d{4}\/\d{2}\/\d{2}$/;
            return regex.test(value);
        }
        return false;
    }),
    father_name: Yup.string().required('نام پدر الزامی می باشد')
        .min(3, 'نام پدر باید حداقل 3 کاراکتر باشد').max(50, 'نام پدر باید حداکثر 50 کاراکتر باشد')
        .matches(/^[\u0600-\u06FF\s]+$/, 'نام پدر باید شامل حروف فارسی باشد'),
    mobile: Yup.string().required('شماره همراه الزامی است').matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر نمی باشد'),
}

const staffObject = {
    username: Yup.string().required('نام کاربری الزامی است')
        .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد').max(50, 'نام کاربری باید حداکثر ۵۰ کاراکتر باشد'),
        // .matches(/[a-zA-Z0-9_.@\-]+$/, 'نام کاربری می‌تواند شامل حروف انگلیسی، اعداد و @ . - _ باشد')
        // .matches(/[A-Za-z]/, 'نام کاربری باید حداقل یک حرف داشته باشد')
        // .matches(/[0-9]/, 'نام کاربری باید حداقل یک عدد داشته باشد'),
    phone: Yup.string().required('شماره ثابت الزامی است').matches(/^0\d{2,3}[-\s]?\d{8}$/, 'شماره ثابت معتبر نمی باشد'),
    display_name: Yup.string().required('نام نمایشی الزامی است')
        .min(3, 'نام نمایشی باید حداقل ۳ کاراکتر باشد').max(50, 'نام نمایشی باید حداکثر 50 کاراکتر باشد')
        .matches(/^[A-Za-z0-9\u0600-\u06FF_.@\-\s]+$/, 'نام نمایشی می تواند شامل حروف، اعداد و @ . - _ باشد'),
    org_mobile: Yup.string().required('شماره همراه سازمانی الزامی است').matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل سازمانی معتبر نمی باشد'),
    org_phone: Yup.string().required('شماره داخلی سازمانی الزامی است').matches(/^\d{1,10}$/, 'شماره داخلی سازمانی معتبر نمی باشد'),
    address: Yup.string().max(200, "آدرس باید حداکثر 200 کاراکتر باشد").required('آدرس الزامی است')
        .matches(/^[\w\u0600-\u06FF\s\-,.،]+$/, 'آدرس می تواند شامل حروف، اعداد، فاصله و -،,. باشد'),
    org_image: Yup.mixed().nullable(),
    cartable_types: Yup.array().of(Yup.string().oneOf(VALID_CARTABLE_TYPES, 'نوع کارتابل نامعتبر است'))
        .max(3, 'حداکثر ۳ نوع کارتابل می‌توانید انتخاب کنید')
        .test('unique-values', 'نوع کارتابل نمی‌تواند تکراری باشد',
            (values) => {
                if (!values) return true;
                return new Set(values).size === values.length;
            }
        ).required()
}

export const addStaffSchema = Yup.object({
    ...identityObject,
    ...staffObject,
    password: Yup.string().required('رمز عبور الزامی می باشد')
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').max(20, 'رمز عبور باید حداکثر 20 کاراکتر باشد')
        .matches(/[a-zA-Z]/, 'رمز عبور باید شامل ترکیبی از حروف انگلیسی و اعداد باشد')
        .matches(/[0-9]/, 'رمز عبور باید شامل ترکیبی از حروف انگلیسی و اعداد باشد')
        .matches(/[_.@\-]/, 'رمز عبور باید شامل یکی از کاراکترهای @/./-/_ باشد'),
})

export const editStaffSchema = Yup.object({ ...identityObject, ...staffObject })

export const resetPassSchema = Yup.object({
    password: Yup.string().required('رمز عبور الزامی می باشد')
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').max(20, 'رمز عبور باید حداکثر 20 کاراکتر باشد')
        .matches(/[a-zA-Z]/, 'رمز عبور باید شامل ترکیبی از حروف انگلیسی و اعداد باشد')
        .matches(/[0-9]/, 'رمز عبور باید شامل ترکیبی از حروف انگلیسی و اعداد باشد')
        .matches(/[_.@\-]/, 'رمز عبور باید شامل یکی از کاراکترهای @/./-/_ باشد'),
    confirm_password: Yup.string().required('تایید رمز عبور الزامی است')
        .oneOf([Yup.ref('password')], 'رمز عبور و تکرار آن یکسان نیست')
})

export const subscriberSchema = Yup.object({
    ...identityObject,
    phone: Yup.string().required('شماره ثابت الزامی است').matches(/^[1-9]\d{9}$/, 'شماره ثابت معتبر نمی باشد'),
    certificate_number: Yup.string().required('شماره شناسنامه الزامی است')
        .matches(/^\d{1,10}$/, 'شماره شناسنامه معتبر نمی باشد'),
    province_id: Yup.string().required('انتخاب استان الزامی است'),
    city_id: Yup.string().required('انتخاب شهر الزامی است'),
    area: Yup.string().required('انتخاب منطقه الزامی است'),
    main_street: Yup.string().required('خیابان اصلی الزامی است'),
    side_street: Yup.string().optional(),
    alley: Yup.string().optional(),
    side_alley: Yup.string().optional(),
    floor: Yup.string().optional(),
    unit: Yup.string().optional(),
    building_name: Yup.string().max(50, 'نام ساختمان باید حداکثر 50 کاراکتر باشد').optional(),
    house_number: Yup.string().required('پلاک الزامی است')
        .max(10, 'پلاک حداکثر می تواند 10 کاراکتر باشد'),
    postal_code: Yup.string().required('کد پستی الزامی است')
        .max(10, 'کدپستی نامعتبر است').min(10, 'کدپستی نامعتبر است'),
    subscriber_type: Yup.string().required('انتخاب نوع مشترک الزامی است'),
    corporate_name: Yup.string().when('subscriber_type', {
        is: 'legal',
        then: (schema) => schema.required('نام سازمان/شرکت الزامی است'),
        otherwise: (schema) => schema.notRequired()
    }),
    registration_number: Yup.string().when('subscriber_type', {
        is: 'legal',
        then: (schema) => schema.required('شماره ثبت سازمان/شرکت الزامی است'),
        otherwise: (schema) => schema.notRequired()
    }),
    corporate_national_id: Yup.string().when('subscriber_type', {
        is: 'legal',
        then: (schema) => schema.required('شناسه ملی سازمان/شرکت الزامی است'),
        otherwise: (schema) => schema.notRequired()
    }),
})