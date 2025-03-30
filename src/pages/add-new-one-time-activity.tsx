
import { Helmet } from 'react-helmet-async';
import { NewOneTimeActivityPage } from 'src/sections/product/view/new-one-time-activity-page';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
          <Helmet>
            <title> {`Add New One Time Activity - ${CONFIG.appName}`}</title>
          </Helmet>
    
          <NewOneTimeActivityPage />
        </>
      );
}