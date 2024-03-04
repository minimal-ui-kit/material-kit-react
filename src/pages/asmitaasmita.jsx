import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

import Results from 'src/components/result/results';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

     

      <UserView />
    </>
  );
}
