import { Helmet } from 'react-helmet-async';

import { WBSView } from '../sections/wbs/view';

// ----------------------------------------------------------------------

export default function WBSPage() {
  // const { fetchUser } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title> Files </title>
      </Helmet>

      <WBSView />
    </>
  );
}
