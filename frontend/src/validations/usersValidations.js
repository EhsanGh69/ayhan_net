import * as Yup from 'yup'

const VALID_CARTABLE_TYPES = ['tickets', 'internal', 'fusion'];

export const addStaffSchema = Yup.object({
    username: Yup.string().required('نام کاربری الزامی است')
        .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد').max(150, 'نام کاربری باید حداکثر ۱۵۰ کاراکتر باشد')
        .matches(/^[a-zA-Z0-9@\.\+\-_]+$/, 'نام کاربری می‌تواند شامل حروف، اعداد و @/./+/-/_ باشد')
        .test('not-only-numbers', 'نام کاربری نمی‌تواند فقط شامل اعداد باشد', (value) => !/^\d+$/.test(value)),
    password: Yup.string().required('رمز عبور الزامی می باشد')
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد').max(128, 'رمز عبور باید حداکثر ۱۲۸ کاراکتر باشد')
        .matches(/[a-z]/, 'رمز عبور باید حداقل یک حرف کوچک داشته باشد')
        .matches(/[A-Z]/, 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد')
        .matches(/[0-9]/, 'رمز عبور باید حداقل یک عدد داشته باشد')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'رمز عبور باید حداقل یک کاراکتر خاص داشته باشد'),
    first_name: Yup.string().required('نام الزامی است').min(3, 'نام باید حداقل ۳ کاراکتر باشد'),
    last_name: Yup.string().required('نام خانوادگی الزامی است').min(3, 'نام خانوادگی باید حداقل ۳ کاراکتر باشد'),
    formal_name: Yup.string().required('نام نمایشی الزامی است')
        .min(3, 'نام نمایشی باید حداقل ۳ کاراکتر باشد').max(250, 'نام نمایشی باید حداکثر 250 کاراکتر باشد'),
    national_id: Yup.string().required('کد ملی الزامی است')
        .min(10, 'کد ملی معتبر نمی باشد').max(10, 'کد ملی معتبر نمی باشد')
        .matches(/^\d+$/, 'کد ملی معتبر نمی باشد'),
    birth_date: Yup.string().required('تاریخ تولد الزامی است'),
    // birth_date: Yup.date().required().typeError('تاریخ تولد معتبر وارد کنید')
    //     .max(new Date(), 'تاریخ تولد نمی‌تواند در آینده باشد')
    //     .min(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), 'تاریخ تولد معتبر نیست'),
    father_name: Yup.string().required('نام پدر الزامی می باشد')
        .min(3, 'نام پدر باید حداقل 3 کاراکتر باشد').max(150, 'نام پدر باید حداکثر 250 کاراکتر باشد'),
    mobile: Yup.string().required('شماره همراه الزامی است').matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر نمی باشد'),
    phone: Yup.string().required('شماره ثابت الزامی است').matches(/^0\d{2,3}[-\s]?\d{8}$/, 'شماره ثابت معتبر نمی باشد'),
    org_mobile: Yup.string().required('شماره همراه سازمانی الزامی است').matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل سازمانی معتبر نمی باشد'),
    org_phone: Yup.string().required('شماره داخلی سازمانی الزامی است').matches(/^\d+$/, 'شماره داخلی سازمانی معتبر نمی باشد'),
    address: Yup.string().required('آدرس الزامی است'),
    org_image: Yup.mixed().nullable(),
    cartable_types: Yup.array().of(Yup.string().oneOf(VALID_CARTABLE_TYPES, 'نوع کارتابل نامعتبر است'))
        .min(1, 'حداقل یک نوع کارتابل باید انتخاب شود').max(3, 'حداکثر ۳ نوع کارتابل می‌توانید انتخاب کنید')
        .test('unique-values', 'نوع کارتابل نمی‌تواند تکراری باشد',
        (values) => {
            if (!values) return true;
            return new Set(values).size === values.length;
        }
    ).required()
})