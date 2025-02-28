
import { Helmet } from 'react-helmet-async';
import { NewProductPage } from 'src/sections/product/view/product-new-page';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
          <Helmet>
            <title> {`Add New Product - ${CONFIG.appName}`}</title>
          </Helmet>
    
          <NewProductPage />
        </>
      );
}