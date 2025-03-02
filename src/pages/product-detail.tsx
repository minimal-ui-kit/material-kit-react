import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { ProductDetailPage } from 'src/sections/product/view/product-detail-page';
import { getProductById } from 'src/utils/func';
// ----------------------------------------------------------------------

export default function Page() {
  const { productId } = useParams();
  if (productId === undefined) {
    return <div>Invalid product ID: {productId}</div>; // Handle undefined case
  } 
  const product = getProductById(productId);
  if (!product) {
    return <div>Product not found</div>; // Handle missing product case
  }
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductDetailPage product={product}/>
    </>
  );
}
