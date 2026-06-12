export const staffHeadCells = [
    { id: 'full_name', label: 'نام و نام خانوادگی', sortable: true },
    { id: 'is_active', label: 'وضعیت', sortable: true },
    { id: 'formal_name', label: 'نام نمایشی', sortable: true },
    { id: 'mobile', label: 'شماره موبایل', sortable: true },
    { id: 'cartable_types', label: 'کارتابل', sortable: true },
    { id: 'actions', label: ' ', sortable: false }
]

export const baseSubsHeadCells = [
    { id: 'first_name', label: 'نام', sortable: true },
    { id: 'last_name', label: 'نام خانوادگی', sortable: true },
    { id: 'national_id', label: 'کد ملی', sortable: true },
    { id: 'subscriber_code', label: 'کد مشترک', sortable: false },
]

export const changeTechHeadCells = [
    { id: 'first_name', label: 'نام', sortable: true },
    { id: 'last_name', label: 'نام خانوادگی', sortable: true },
    { id: 'phone_number', label: 'شماره تلفن', sortable: true },
    { id: 'phone_type', label: 'نوع خط تلفن', sortable: true },
    { id: 'status', label: 'وضعیت', sortable: false },
    { id: 'actions', label: ' ', sortable: false }
]

export const newApplicantHeadCells = [
    { id: 'first_name', label: 'نام', sortable: true },
    { id: 'last_name', label: 'نام خانوادگی', sortable: true },
    { id: 'status', label: 'وضعیت', sortable: false },
    { id: 'actions', label: ' ', sortable: false }
]

export const subscriberHeadCells = [
    ...baseSubsHeadCells,
    { id: 'status', label: 'وضعیت', sortable: false },
    { id: 'actions', label: ' ', sortable: false }
]

export const searchSubsHeadCells = [
    ...baseSubsHeadCells,
    { id: 'actions', label: ' ', sortable: false }
]

export const ticketHeadCells = [
    { id: 'row', label: 'ردیف', sortable: true },
    { id: 'group', label: 'گروه تیکت', sortable: true },
    { id: 'name', label: 'نام تیکت', sortable: true },
    { id: 'description', label: 'توضیحات نام تیکت', sortable: true },
    { id: 'actions', label: ' ', sortable: false }
]

export const subsTicketHeadCells = [
    { id: 'row', label: 'ردیف', sortable: true },
    { id: 'group', label: 'گروه تیکت', sortable: true },
    { id: 'name', label: 'نام تیکت', sortable: true },
    { id: 'user', label: 'کاربر ثبت کننده', sortable: true },
    { id: 'datetime', label: 'زمان ثبت', sortable: true },
    { id: 'staff', label: 'ارجاع شده به کارتابل', sortable: true },
    { id: 'status', label: 'وضعیت', sortable: true },
    { id: 'actions', label: ' ', sortable: false }
]
