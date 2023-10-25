import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function EmployeeManagement() {
  return (
    <>
      <Helmet>
        <title> Employee Management </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
