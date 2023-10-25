import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SystemPerformance() {
  return (
    <>
      <Helmet>
        <title> System Performance </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
