// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'Quản lý khách hàng',
    path: '/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Khoá học',
    path: '/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Đăng nhập',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Đăng ký',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
