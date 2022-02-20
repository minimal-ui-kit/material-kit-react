/* eslint-disable */ 
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ItemCard from './ItemCard';

// ----------------------------------------------------------------------

ItemList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ItemList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard key= {product.id} product={product} />
        </Grid>
      ))}
      
    </Grid>
  );
}
