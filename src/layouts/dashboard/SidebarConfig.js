import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import tvFill from '@iconify/icons-eva/tv-fill';
import monitorFill from '@iconify/icons-eva/monitor-fill';
import Iconm from '@mdi/react';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
const getIconM = (name) => <Iconm path={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'drawing room',
    path: '/dashboard/drawing',
    icon: getIcon(tvFill)
  },
  {
    title: 'office room',
    path: '/dashboard/office',
    icon: getIcon(monitorFill)
  },
  {
    title: 'dining & balcony',
    path: '/dashboard/balcony',
    icon: getIconM(mdiFoodForkDrink)
  },
  {
    title: 'living',
    path: '/dashboard/living',
    icon: getIconM(mdiSofa)
  }
  ,
  {
    title: 'bedroom',
    path: '/dashboard/bedroom',
    icon: getIconM(mdiBed)
  },
  {
    title: 'kids',
    path: '/dashboard/kids',
    icon: getIconM(mdiTeddyBear)
  },
  {
    title: 'kitchen',
    path: '/dashboard/kitchen',
    icon: getIconM(mdiCountertop)
  }
];

export default sidebarConfig;
