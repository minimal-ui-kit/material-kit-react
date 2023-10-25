import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Inventory() {
  return (
    <>
      <Helmet>
        <title> Inventory </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
