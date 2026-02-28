export const staffHeadCells = [
    { id: 'full_name', label: 'نام و نام خانوادگی', sortable: true },
    { id: 'is_active', label: 'وضعیت', sortable: true },
    { id: 'formal_name', label: 'نام نمایشی', sortable: false },
    { id: 'mobile', label: 'شماره موبایل', sortable: false },
    { id: 'cartable_types', label: 'کارتابل', sortable: false },
    { id: 'actions', label: ' ', sortable: false }
]

export const baseSubsHeadCells = [
    { id: 'first_name', label: 'نام', sortable: true },
    { id: 'last_name', label: 'نام خانوادگی', sortable: true },
    { id: 'national_id', label: 'کد ملی', sortable: false },
    { id: 'phone', label: 'شماره تلفن', sortable: false },
]

export const subscriberHeadCells = [
   ...baseSubsHeadCells,
    { id: 'status', label: 'وضعیت', sortable: true },
    { id: 'actions', label: ' ', sortable: false }
]

export const searchSubsHeadCells = [
   ...baseSubsHeadCells,
    { id: 'actions', label: ' ', sortable: false }
]

export const ticketHeadCells = [
    { id: 'group', label: 'گروه', sortable: true },
    { id: 'name', label: 'نام', sortable: true },
    { id: 'description', label: 'توضیحات', sortable: true },
    { id: 'actions', label: ' ', sortable: false }
]
