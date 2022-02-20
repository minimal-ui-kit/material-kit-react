import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
// ----------------------------------------------------------------------

Engineer.propTypes = {
  sx: PropTypes.object
};

export default function Engineer({ sx }) {
  return <Box component="img" src="src/components/images/engineer.png" sx={{ width: 40, height: 40, ...sx }} />;
}
