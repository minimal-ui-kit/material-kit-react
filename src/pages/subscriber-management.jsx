import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SubscriberManagement() {
  return (
    <>
      <Helmet>
        <title> Subscriber Management </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
