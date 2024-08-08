// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Grid, Typography } from '@mui/material';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import { useResponsive } from 'src/hooks/use-responsive';
// import { bgBlur } from 'src/theme/css';
// import { NAV, HEADER } from './config-layout';
// import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
// import { useAuth } from 'src/routes/context/auth-context';
// import axiosInstance from 'src/routes/axios-config';
// export default function Header({ onOpenNav }) {
//   const theme = useTheme();
//   const [data, setData] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const lgUp = useResponsive('up', 'lg');
//   const { user } = useAuth();
//   useEffect(() => {
//     async function getUser() {
//       try {
//         const response = await axiosInstance.get('/users/request-user/');
//         setData(response.data);
//         user(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     getUser();
//   }, []);

//   useEffect(() => {
//     const getDevices = async () => {
//       try {
//         const response = await axiosInstance.get('/merchant/devices/broker-status-count/');
//         setDevices(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getDevices();
//   }, []);

//   return (
//     <AppBar
//       sx={{
//         px: { lg: 5 },
//         borderBottom: '4px solid blue',
//         boxShadow: 'none',
//         height: HEADER.H_MOBILE,
//         zIndex: theme.zIndex.appBar + 1,
//         ...bgBlur({
//           color: theme.palette.background.default,
//         }),
//         transition: theme.transitions.create(['height'], {
//           duration: theme.transitions.duration.shorter,
//         }),
//         ...(lgUp && {
//           width: `calc(100% - ${NAV.WIDTH + 1}px)`,
//           height: HEADER.H_DESKTOP,
//         }),
//       }}
//     >
//       <Toolbar sx={{ height: 1, px: { lg: 5 } }}>
//         {!lgUp && (
//           <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
//             <FormatAlignLeftIcon />
//           </IconButton>
//         )}
//         <Box
//           component={'div'}
//           sx={{
//             display: 'flex',
//             marginRight: { xs: 0, md: 2 },
//             flexGrow: 1,
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             flexDirection: { xs: 'column', md: 'row' },
//             width: { xs: '100%', md: 'auto' },
//             mb: { xs: 2, md: 0 },
//             mt: { xs: 2, md: 0 },
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               sm: 1,
//               ml: 1,
//               mt: 1,
//               flexGrow: 1,
//               color: 'black',
//               fontSize: { xs: '1rem', md: '2.125rem' },
//               whiteSpace: 'nowrap',
//               marginRight: '15px',
//             }}
//           >
//             {data?.current_company?.name}
//           </Typography>
//           <Box
//             sx={{ flexGrow: 1, color: 'black' }}
//             display="flex"
//             justifyContent="flex-between"
//             alignItems={'center'}
//           >
//             <Grid sx={{ marginRight: { xs: 1 } }} container spacing={0}>
//               <Grid item>
//                 <Typography
//                   variant="h"
//                   sx={{
//                     color: 'green',
//                     marginRight: '10px',
//                     fontSize: { xs: '0.5rem', md: '1rem', sm: '0.75rem' },
//                   }}
//                 >
//                   Filiallar: {data?.current_company?.filials_count}
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography
//                   variant="h"
//                   sx={{ color: 'red', fontSize: { xs: '0.5rem', md: '1rem', sm: '0.75rem' } }}
//                 >
//                   Qurilmalar: {data?.current_company?.devices_count}
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Stack direction="row" alignItems="center" spacing={2} sx={{ color: 'black' }}>
//               <Box
//                 sx={{
//                   width: { xs: '25px', sm: '40px', md: '120px' },
//                   height: { xs: '25px', sm: '40px', md: 'auto' },
//                   color: 'black',
//                   padding: { xs: '1px', md: '8px' },
//                   backgroundColor: 'rgb(143, 242, 171)',
//                   borderRadius: { xs: '50%', md: '10px' },
//                   textAlign: 'center',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   fontSize: { xs: '0.75rem', md: '1rem' },
//                   flexDirection: { xs: 'column', md: 'row' },
//                 }}
//               >
//                 <Box sx={{ display: { xs: 'none', md: 'block' }, mr: { md: 1 } }}>faol</Box>
//                 {devices.active_devices_count}
//               </Box>
//               <Box
//                 sx={{
//                   width: { xs: '25px', sm: '40px', md: '120px' },
//                   height: { xs: '25px', sm: '40px', md: 'auto' },
//                   color: 'black',
//                   padding: { xs: '3px', md: '10px' },
//                   backgroundColor: 'rgb(214, 148, 166)',
//                   borderRadius: { xs: '50%', md: '10px' },
//                   textAlign: 'center',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   fontSize: { xs: '0.5rem', md: '1rem' },
//                   flexDirection: { xs: 'column', md: 'row' },
//                 }}
//               >
//                 <Box sx={{ display: { xs: 'none', md: 'block' }, mr: { md: 1 } }}>faol emas</Box>
//                 {devices.inactive_devices_count}
//               </Box>
//             </Stack>
//           </Box>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <LanguagePopover />
//           <AccountPopover data={data} />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// Header.propTypes = {
//   onOpenNav: PropTypes.func,
// };
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import IconButton from '@mui/material/IconButton';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import { useAuth } from 'src/routes/context/auth-context';
import axiosInstance from 'src/routes/axios-config';
import LoadingSpinner from 'src/components/loading/loading';

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { user } = useAuth();

  // Fetch user data
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => axiosInstance.get('/users/request-user/').then((res) => res.data),
    onSuccess: (data) => {
      user(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // Fetch device data
  const {
    data: deviceData,
    error: deviceError,
    isLoading: isDeviceLoading,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: () =>
      axiosInstance.get('/merchant/devices/broker-status-count/').then((res) => res.data),
    onError: (error) => {
      console.error(error);
    },
  });

  if (isUserLoading || isDeviceLoading) {
    return (
      <AppBar
        sx={{
          px: { lg: 5 },
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
        <Toolbar sx={{ height: 1, px: { lg: 5 } }}>
          {!lgUp && (
            <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
              <FormatAlignLeftIcon />
            </IconButton>
          )}
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              marginRight: { xs: 0, md: 2 },
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              width: { xs: '100%', md: 'auto' },
              mb: { xs: 2, md: 0 },
              mt: { xs: 2, md: 0 },
            }}
          >
            {/* <Typography
            
              variant="h3"
              sx={{
                sm: 1,
                ml: 1,
                mt: 1,
                flexGrow: 1,
                color: 'black',
                fontSize: { xs: '1rem', md: '2.125rem' },
                whiteSpace: 'nowrap',
                marginRight: '15px',
              }}
            >
              Loading...
            </Typography> */}
            <Box
              sx={{ flexGrow: 1, color: 'black' }}
              display="flex"
              justifyContent="flex-between"
              alignItems={'center'}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ color: 'black' }}>
                <LoadingSpinner /> {/* Use your Loading component here */}
              </Stack>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  if (userError || deviceError) {
    return <div>Error loading data</div>;
  }

  return (
    <AppBar
      sx={{
        px: { lg: 5 },
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
      <Toolbar sx={{ height: 1, px: { lg: 5 } }}>
        {!lgUp && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <FormatAlignLeftIcon />
          </IconButton>
        )}
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            marginRight: { xs: 0, md: 2 },
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            width: { xs: '100%', md: 'auto' },
            mb: { xs: 2, md: 0 },
            mt: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              sm: 1,
              ml: 1,
              mt: 1,
              flexGrow: 1,
              color: 'black',
              fontSize: { xs: '1rem', md: '2.125rem' },
              whiteSpace: 'nowrap',
              marginRight: '15px',
            }}
          >
            {userData?.current_company?.name}
          </Typography>
          <Box
            sx={{ flexGrow: 1, color: 'black' }}
            display="flex"
            justifyContent="flex-between"
            alignItems={'center'}
          >
            <Grid sx={{ marginRight: { xs: 1 } }} container spacing={0}>
              <Grid item>
                <Typography
                  variant="h"
                  sx={{
                    color: 'green',
                    marginRight: '10px',
                    fontSize: { xs: '0.5rem', md: '1rem', sm: '0.75rem' },
                  }}
                >
                  Filiallar: {userData?.current_company?.filials_count}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h"
                  sx={{ color: 'red', fontSize: { xs: '0.5rem', md: '1rem', sm: '0.75rem' } }}
                >
                  Qurilmalar: {userData?.current_company?.devices_count}
                </Typography>
              </Grid>
            </Grid>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ color: 'black' }}>
              <Box
                sx={{
                  width: { xs: '25px', sm: '40px', md: '120px' },
                  height: { xs: '25px', sm: '40px', md: 'auto' },
                  color: 'black',
                  padding: { xs: '1px', md: '8px' },
                  backgroundColor: 'rgb(143, 242, 171)',
                  borderRadius: { xs: '50%', md: '10px' },
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: { xs: '0.75rem', md: '1rem' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' }, mr: { md: 1 } }}>faol</Box>
                {deviceData?.active_devices_count}
              </Box>
              <Box
                sx={{
                  width: { xs: '25px', sm: '40px', md: '120px' },
                  height: { xs: '25px', sm: '40px', md: 'auto' },
                  color: 'black',
                  padding: { xs: '3px', md: '10px' },
                  backgroundColor: 'rgb(214, 148, 166)',
                  borderRadius: { xs: '50%', md: '10px' },
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: { xs: '0.75rem', md: '1rem' },
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box sx={{ display: { xs: 'none', md: 'block' }, mr: { md: 1 } }}>faol emas</Box>
                {deviceData?.inactive_devices_count}
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Stack direction="row" spacing={1}>
            <LanguagePopover />
            <AccountPopover data={userData} />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

