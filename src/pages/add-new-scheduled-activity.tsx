
import { Helmet } from 'react-helmet-async';
import { NewScheduledActivityPage } from 'src/sections/product/view/new-scheduled-activity-page';
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
          <Helmet>
            <title> {`Add New Scheduled Activity - ${CONFIG.appName}`}</title>
          </Helmet>
    
          <NewScheduledActivityPage />
        </>
      );
}