import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({title,  cash_summa, click_summa, cash_count, click_count, protsent, icon, color, sx, ...other }) {
  console.log(protsent)
  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center',  ml: 2, mb: 2 }}>
        <Typography  variant="h6">{title}</Typography>
      </Box>
      <Box
        
        sx={{
          ...sx,
          height: '200px',
          // width: '400px',
          padding: '15px',
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          backgroundColor: 'white',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        {...other}
      >
        <Box
          component="span"
          sx={{
            padding: '10px',
            fontSize: '40px',
            backgroundColor: color,
            color: 'white',
            borderRadius: '10px',
          }}
        >
          {icon}
        </Box>
        <Stack letterSpacing={0.5} sx={{ padding: '10px', pt: 0, ml:1 }}>
          <Typography variant="h4" sx={{ mb: 0.5, }}>{cash_summa + click_summa} so'm</Typography>
          <Typography variant="subtitle2" sx={{ color: '' }}>
            Click {`(${click_count})`}: {click_summa}
            {` (${protsent.click_protsent}%)`}
          </Typography>
          <Typography variant="subtitle2">
            Naqd {`(${cash_count})`}: {cash_summa}{` (${protsent.cash_protsent}%)`}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}

AppWidgetSummary.propTypes = {
  title: PropTypes.string,
  cash_summa: PropTypes.number,
  click_summa: PropTypes.number,
  cash_count: PropTypes.number,
  click_count: PropTypes.number,
  protsent: PropTypes.object,
  subTitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  color: PropTypes.string,
  sx: PropTypes.object,
};
