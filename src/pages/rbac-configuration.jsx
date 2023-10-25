import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function RBACConfiguration() {
  return (
    <>
      <Helmet>
        <title> RBAC Configuration </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
