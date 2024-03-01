import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ShopResultCard({ result }) {
  
  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text',
        }}
      >
        {result.Date}
      </Typography>
      
    </Typography>
  );

  return (
    <Card>
      
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {result.MatchName}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopResultCard.propTypes = {
  result: PropTypes.object,
};
