import { Helmet } from 'react-helmet-async';

import { ReportView } from 'src/sections/report/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Report | Minimal UI </title>
      </Helmet>

      <ReportView />
    </>
  );
}
