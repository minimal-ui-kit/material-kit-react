// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'POS',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Setup',
    icon: getIcon('eva:file-text-fill'),
    children: [
      {
        title: 'User Managment',
        path: '/dashboard/Managmentsetup',
        icon: getIcon('eva:folder-fill')
      },
      {
        title: 'Discount',
        path: '/dashboard/Discount',
        icon: getIcon('eva:folder-fill')
      },
      {
        title: 'Transaction Type',
        path: '/dashboard/TransactionType',
        icon: getIcon('eva:folder-fill')
      },
    ]

  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill')
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // }
];

export default sidebarConfig;
