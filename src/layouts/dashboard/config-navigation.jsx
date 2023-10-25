import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    // To-do
    title: 'enquiries',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    // To-do
    title: 'sales',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    // To-do
    title: 'trouble tickets',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    // To-do
    title: 'orders',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'customer feedback',
    path: '/blog',
    icon: icon('ic_circle'),
  },
  {
    // To-do
    title: 'subscriber management',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'delivery tracking',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'inventory',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'salary management',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'employee management',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'system performance',
    path: '/blog',
    icon: icon('ic_monitoring'),
  },
  {
    // To-do
    title: 'site view',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'system metrics',
    path: '/blog',
    icon: icon('ic_metrics'),
  },
  {
    // To-do
    title: 'RBAC configuration',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    // To-do
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // NA
  // {
  //   // To-do
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
