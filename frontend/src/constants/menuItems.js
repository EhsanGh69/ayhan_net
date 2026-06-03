import {
  Dashboard, ShoppingCart , People , Settings , ContactPhone,
  LocalOffer, Assessment , ShoppingBasket , Comment , Payment ,
  Store as StoreIcon, AssignmentReturn ,
  Engineering, AdminPanelSettings, SupervisedUserCircle
} from '@mui/icons-material';

export const menuItems = [
    { title: 'داشبورد', icon: Dashboard, path: '/' },
    {
        title: 'بازاریابی و فروش', icon: ShoppingCart, children: [
            { title: 'مشتری ها', icon: ContactPhone, path: '/subscribers', 
                subPaths: ['/subscribers/add', '/subscribers/edit']
            },
            { title: 'فروش / پیگیری اشتراک تلفن ثابت', icon: ShoppingBasket, path: '/phone' },
            { title: 'فروش / پیگیری اشتراک اینترنت', icon: ShoppingBasket, path: '/internet' },
            { title: 'فروش / پیگیری تجهیز انتهایی', icon: ShoppingBasket, path: '/tools' },
        ]
    },
    {
        title: 'فنی', icon: Engineering, children: [
            { title: 'جست و جوی مشتری', icon: AssignmentReturn, path: '/subscribers/search'},
            { title: 'کارتابل امکان سنجی اولیه', icon: AssignmentReturn, path: '/feasibility_cartable' },
            { title: 'کارتابل اجراها و هماهنگی', icon: AssignmentReturn, path: '/operations_cartable' },
            { title: 'کارتابل تیم اجرا(داخلی)', icon: AssignmentReturn, path: '/internal_opt_cartable' },
            { title: 'کارتابل تیم اجرا(فیوژن)', icon: AssignmentReturn, path: '/fusion_opt_cartable' },
            { title: 'کارتابل تیکت ها', icon: Comment, path: '/tickets/cartable' },
            { title: 'مدیریت تیکت ها', icon: Comment, path: '/tickets', 
                subPaths: ['/tickets/define', '/tickets/edit']
            },
        ]
    },
    {
        title: 'مالی', icon: Assessment, children: [
            { title: 'لیست تراکنش ها', icon: Payment, path: '/search_subscriber' },
            { title: 'زیر منو 1', icon: LocalOffer, path: '/feasibility_cartable' },
            { title: 'زیر منو 2', icon: LocalOffer, path: '/operations_cartable' },
        ]
    },
    {
        title: 'کاربران و نقش ها', icon: SupervisedUserCircle, children: [
            { title: 'کاربران', icon: People, path: '/users/staff', subPaths: [
                '/users/staff/add', '/users/staff/edit'
            ]},
            { title: 'نقش ها و دسترسی ها', icon: AdminPanelSettings, path: '/feasibility_cartable' },
        ]
    },
    {
        title: 'انبار', icon: StoreIcon, children: [
            { title: 'زیر منو 1', icon: LocalOffer, path: '/feasibility_cartable' },
        ]
    },
    { title: 'تنظیمات', icon: Settings, path: '/settings', subPaths: [
        '/settings/locations'
    ] },
];