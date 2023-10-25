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
    path: '/enquiries',
    icon: icon('ic_enquiries'),
  },
  {
    // To-do
    title: 'sales',
    path: '/sales',
    icon: icon('ic_sales'),
  },
  {
    // To-do
    title: 'trouble tickets',
    path: '/trouble-tickets',
    icon: icon('ic_trouble-tickets'),
  },
  {
    // To-do
    title: 'orders',
    path: '/orders',
    icon: icon('ic_orders'),
  },
  {
    // To-do
    title: 'customer feedback',
    path: '/customer-feedback',
    icon: icon('ic_customer-feedback'),
  },
  {
    // To-do
    title: 'subscriber management',
    path: '/subscriber-management',
    icon: icon('ic_subscriber-management'),
  },
  {
    // To-do
    title: 'delivery tracking',
    path: '/delivery-tracking',
    icon: icon('ic_delivery-tracking'),
  },
  {
    // To-do
    title: 'inventory',
    path: '/inventory',
    icon: icon('ic_inventory'),
  },
  {
    // To-do
    title: 'salary-management',
    path: '/salary-management',
    icon: icon('ic_salary-management'),
  },
  {
    // To-do
    title: 'employee management',
    path: '/employee-management',
    icon: icon('ic_employee-management'),
  },
  {
    // To-do
    title: 'system performance',
    path: '/system-performance',
    icon: icon('ic_monitoring'),
  },
  {
    // To-do
    title: 'site view',
    path: '/site-view',
    icon: icon('ic_site-view'),
  },
  {
    // To-do
    title: 'system metrics',
    path: '/system-metrics',
    icon: icon('ic_metrics'),
  },
  {
    // To-do
    title: 'RBAC configuration',
    path: '/rbac-configuration',
    icon: icon('ic_rbac-configuration'),
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
