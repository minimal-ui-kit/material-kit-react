import SvgColor from 'src/components/svg-color';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
const IconifyIcon = (name) => <Iconify icon={name} width={25} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Projects',
    path: '/files',
    icon: IconifyIcon('file-icons:microsoft-project'),
  },
  {
    title: 'Jira Projects',
    path: '/jira-projects',
    icon: IconifyIcon('mdi:jira'),
  },
  {
    title: 'Resources',
    path: '/resources',
    icon: IconifyIcon('la:users'),
  },
];

export default navConfig;
