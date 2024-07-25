import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
/* eslint-disable */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

// import Iconify from 'src/components/iconify';

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';
// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('https://api.2pay.uz/api/users/request-user/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });

        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);
  useEffect(() => {
    const getDevices = async () => {
      try {
        const response = await axios.get(
          'https://api.2pay.uz/api/merchant/devices/broker-status-count/',
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDevices();
  }, []);

  return (
    <AppBar
      sx={{
        borderBottom: '4px solid blue',
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1, color: 'black' }}>
          {data?.current_company?.name}
        </Typography>
        <Box
          sx={{ flexGrow: 1, color: 'black' }}
          display="flex"
          justifyContent="flex-between"
          alignItems={'center'}
        >
          <Typography variant="h" sx={{ color: 'green', marginRight: '20px' }}>
            Filiallar: {data?.current_company?.filials_count}
          </Typography>
          <Typography variant="h" sx={{ color: 'red' }}>
            Qurilmalar: {data?.current_company?.devices_count}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={5}
            sx={{ color: 'black', marginLeft: '40px' }}
          >
            <Box
              sx={{
                width: '120px',
                color: 'black',
                padding: '10px',
                backgroundColor: 'rgb(143, 242, 171)',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              {devices.active_devices_count}-faol
            </Box>
            <Box
              sx={{
                width: '120px',
                color: 'black',
                padding: '10px',
                backgroundColor: 'rgb(214, 148, 166)',
                borderRadius: '10px',
                textAlign: 'center',
              }}
            >
              {devices.inactive_devices_count}-faol emas
            </Box>
          </Stack>
        </Box>
        

        <Stack direction="row" alignItems="center" spacing={1}>
          <LanguagePopover />
          {/* <NotificationsPopover /> */}
          <AccountPopover data={data} />{' '}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
//   <AppBar
//     sx={{
//       borderBottom: '4px solid blue',
//       boxShadow: 'none',
//       height: HEADER.H_MOBILE,
//       zIndex: theme.zIndex.appBar + 1,
//       ...bgBlur({
//         color: theme.palette.background.default,
//       }),
//       transition: theme.transitions.create(['height'], {
//         duration: theme.transitions.duration.shorter,
//       }),
//       ...(lgUp && {
//         width: `calc(100% - ${NAV.WIDTH + 1}px)`,
//         height: HEADER.H_DESKTOP,
//       }),
//     }}
//   >
//     <Toolbar
//       sx={{
//         height: 1,
//         px: { lg: 5 },
//       }}
//     >

//       <Typography variant="h3" sx={{ flexGrow: 1, color: 'black' }}>
//         Car
//       </Typography>

//       <Box sx={{ flexGrow: 1 }} />

//       <Stack direction="row" alignItems="center" spacing={1}>
//         <LanguagePopover />
//         <NotificationsPopover />
//         <AccountPopover />
//       </Stack>
//     </Toolbar>
//   </AppBar>
// );

// Header.propTypes = {
//   onOpenNav: PropTypes.func,
// };
