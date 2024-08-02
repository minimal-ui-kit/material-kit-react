import DevicesIcon from '@mui/icons-material/Devices';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
/* eslint-disable */
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
/* eslint-disable */
import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Boshqaruv paneli',
    path: '/',
    icon: <DonutSmallIcon />,
  },
  {
    title: 'Hisobot',
    path: '/report',
    icon: <DashboardCustomizeIcon />,
  },
  {
    title: 'Qurilma faoliyati',
    path: '/devices-activity',
    icon: <DevicesIcon />,
  },
  {
    title: 'Moliya',
    path: '/financing',
    icon: <AttachMoneyIcon />,
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: "Bo'sh",
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
