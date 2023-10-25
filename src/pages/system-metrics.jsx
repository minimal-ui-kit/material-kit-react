import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SystemMetrics() {
  return (
    <>
      <Helmet>
        <title> System Metrics </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
