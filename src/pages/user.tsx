import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/Bookings/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Bookings - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
