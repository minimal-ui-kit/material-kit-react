import { Helmet } from 'react-helmet-async';
// import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { ProductDetailPage } from 'src/sections/product/view/product-detail-page';

// ----------------------------------------------------------------------

export default function Page() {

  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductDetailPage />
    </>
  );
}
