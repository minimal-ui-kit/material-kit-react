import { Helmet } from 'react-helmet-async';

import { DevicesActivityView } from 'src/sections/devices-activity/view';

// ----------------------------------------------------------------------

export default function DevicesActivityPage() {
  return (
    <>
      <Helmet>
        <title> Qurilma faoliyati | Minimal UI </title>
      </Helmet>

      <DevicesActivityView />
    </>
  );
}
