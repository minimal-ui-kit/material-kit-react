import { Icon, IconifyIcon } from '@iconify/react';
import Box from '@mui/material/Box';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------
interface IconifyProps {
  icon: IconifyIcon | string;
  dimension?: number;
  sx?: object;
}
// eslint-disable-next-line react/display-name
const Iconify = forwardRef(
  ({ icon, dimension = 20, sx, ...other }: IconifyProps, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width: dimension, height: dimension, ...sx }}
      {...other}
    />
  ),
);

export default Iconify;
