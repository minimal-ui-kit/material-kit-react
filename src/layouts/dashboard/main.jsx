import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';
import { useAuth } from 'src/context/loginContext';

import { NAV, HEADER } from './config-layout';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');
  const { logout, check } = useAuth();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {localStorage.getItem('token') && (
        <Button
          sx={{ position: 'fixed', right: '50px', backgroundColor: '#F1C0B6' }}
          variant="outlined"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>
      )}

      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
