import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '50%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

NewProductCard.propTypes = {
  product: PropTypes.object,
};

export default function NewProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ width: '50%' }} image={cover} alt="Live from space album cover" />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h4">
            {name}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ p: 3 }} alignItems="center" justifyContent="space-between">
            <ColorPreview colors={colors} />
            <Typography variant="h5">
              Price:
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {fCurrency(price)}
              </Typography>
              &nbsp;
              {priceSale && fCurrency(priceSale)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
              Add to Cart
            </Button>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
