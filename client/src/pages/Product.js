import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Typography } from '@mui/material';
// components
import { NewProductCard, ProductCartWidget } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
const product = {
  id: '1tre546',
  cover: `/assets/images/products/product_1.jpg`,
  name: 'Nike Air Force 1 NDESTRUKT',
  price: 24,
  priceSale: 10,
  colors: PRODUCT_COLOR,
  status: 'Sale',
};

const Product = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Product
        </Typography>
        <NewProductCard product={product} />
        <ProductCartWidget />
      </Container>
    </>
  );
};

export default Product;
