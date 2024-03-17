import { Helmet } from 'react-helmet-async';

import ProductsV2View from '../sections/products-v2/view/products-v2-view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <ProductsV2View />
    </>
  );
}
