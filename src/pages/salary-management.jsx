import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SalaryManagement() {
  return (
    <>
      <Helmet>
        <title> Salary Management </title>
      </Helmet>
      {/* To-Do */}
      <UserView />
    </>
  );
}
