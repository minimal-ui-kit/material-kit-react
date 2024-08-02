import { Helmet } from 'react-helmet-async';

import { FinancingView } from 'src/sections/financing/view';

// ----------------------------------------------------------------------

export default function FinancingPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <FinancingView />
    </>
  );
}
