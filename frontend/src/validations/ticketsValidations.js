import * as Yup from 'yup'

export const defineTicketSchema = Yup.object({
    group_id: Yup.string().required('انتخاب گروه تیکت الزامی است'),

    name: Yup.string().required('نام تیکت الزامی است')
        .min(3, "نام تیکت باید حداقل 3 کاراکتر باشد").max(50, "نام تیکت باید حداکثر 50 کاراکتر باشد"),
    description: Yup.string().required("توضیحات تیکت الزامی است")
        .max(200, "توضیحات باید حداکثر 200 کاراکتر باشد")
})

export const addTicketGroupSchema = Yup.object({
    title: Yup.string().required('عنوان گروه را وارد نمایید')
        .min(3, "عنوان گروه باید حداقل 3 کاراکتر باشد").max(50, "عنوان گروه باید حداکثر 50 کاراکتر باشد")
})

export const addSubsTicketSchema = Yup.object({
    group: Yup.string().required('انتخاب گروه تیکت الزامی است'),
    name: Yup.string().required('انتخاب نام تیکت الزامی است'),
    content: Yup.string().required('توضیحات تیکت الزامی است'),
    isRefer: Yup.boolean(),
    staff_id: Yup.string().when('isRefer', {
        is: true,
        then: (schema) => schema.required('انتخاب کارتابل الزامی است'),
        otherwise: (schema) => schema.notRequired()
    })
})