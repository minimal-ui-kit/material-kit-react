
import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { ProductCustomerPage } from 'src/sections/product/view/product-customers-page';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
          <Helmet>
            <title> {`View Product Customers - ${CONFIG.appName}`}</title>
          </Helmet>
    
          <ProductCustomerPage />
        </>
      );
}