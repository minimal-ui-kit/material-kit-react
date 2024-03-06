import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/noti';


// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Leaderboard edit </title>
      </Helmet>

     

      <UserView />
    </>
  );
}
