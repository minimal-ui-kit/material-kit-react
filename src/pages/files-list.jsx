import { Helmet } from 'react-helmet-async';

import { FilesView } from '../sections/files/view';
// ----------------------------------------------------------------------

export default function FilesPage() {
  // const { fetchUser } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title> Files </title>
      </Helmet>

      <FilesView />
    </>
  );
}
