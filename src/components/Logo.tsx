import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

export default function Logo({ sx }: any) {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
}
