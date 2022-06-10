// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    },
  {
    title: 'usuarios',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'vehículos',
    path: '/dashboard/products',
    icon: getIcon('fa-solid:car-alt'),
  },
  {
    title: 'Cerrar Sesión',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
];

export default navConfig;
