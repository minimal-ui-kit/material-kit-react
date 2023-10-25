import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Sales() {
  return (
    <>
      <Helmet>
        <title> Sales </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
