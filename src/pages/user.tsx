import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import PartnersView from 'src/sections/user/view/patners-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Partners - ${CONFIG.appName}`}</title>
      </Helmet>

      <PartnersView />
    </>
  );
}
