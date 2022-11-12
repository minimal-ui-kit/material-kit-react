import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Iconify from '../iconify';

// ----------------------------------------------------------------------

Icon.propTypes = {
  sx: PropTypes.object,
  checked: PropTypes.bool,
  whiteColor: PropTypes.bool,
};

export default function Icon({ checked, whiteColor, sx, ...other }) {
  const shadow = (
    <Box
      sx={{
        width: 1,
        height: 1,
        opacity: 0.48,
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: '4px 4px 8px 0 currentColor',
      }}
    />
  );

  const icon = (
    <Iconify
      icon="eva:checkmark-fill"
      sx={{
        opacity: 0,
        ...(checked && {
          opacity: 1,
          color: 'common.white',
          ...(whiteColor && {
            color: 'common.black',
          }),
        }),
      }}
    />
  );

  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        ...(whiteColor && {
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          boxShadow: (theme) => `4px 4px 8px 0 ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
        ...(checked && {
          transform: 'scale(1.4)',
        }),
        ...sx,
      }}
      {...other}
    >
      {checked && shadow}

      {icon}
    </Box>
  );
}
