/* eslint-disable */ 
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';


// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ItemCard.propTypes = {
  product: PropTypes.object
};

export default function ItemCard({ product }) {
  const { name, cover, price } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link 
        color="inherit" 
        underline="hover" 
        component={RouterLink} 
        to="#" >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            ${price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
