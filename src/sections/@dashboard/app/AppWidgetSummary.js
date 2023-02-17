// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const Greeting = styled('div')(({ theme }) => ({
  // marginLeft: 'auto',
  paddingTop: '3%',
  width: '100%',
  display: 'flex',
  borderRadius: '50%',
//   alignItems: 'center',
//   justifyContent: 'center',
  color: "#FFFFFF",
  margin: 'auto',
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ height, width, title, subtitle, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Greeting>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="h5" sx={{ mx: 'auto', opacity:1 }}>
        {title}
      </Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {subtitle}
      </Typography>
    </Greeting>
  );
}
