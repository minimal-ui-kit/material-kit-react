// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Task',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Pending',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Finished',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Deleted',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Account',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
