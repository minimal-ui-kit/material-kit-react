// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    icon: icon('ic_analytics'),
    child: [
      {
        title: 'Home',
        icon: icon('ic_analytics'),
        path: '/dashboard/app',
      },
    ],
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    child: [
      {
        title: 'User',
        icon: icon('ic_user'),
        path: '/dashboard/user',
      },
    ],
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
    child: [
      {
        title: 'Blog',
        icon: icon('ic_blog'),
        path: '/dashboard/blog',
      },
    ],
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
    child: [
      {
        title: 'login',
        icon: icon('ic_lock'),
        path: '/login',
      },
    ],
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
    child: [
      {
        title: 'Not found',
        icon: icon('ic_disabled'),
        path: '/404',
      },
    ],
  },
];

export default navConfig;
