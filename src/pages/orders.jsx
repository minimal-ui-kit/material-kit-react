import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function Orders() {
  return (
    <>
      <Helmet>
        <title> Orders </title>
      </Helmet>
      {/* To-Do */}
      <LoginView />
    </>
  );
}
