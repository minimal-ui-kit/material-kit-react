import { Helmet } from 'react-helmet-async';

import { FilesView } from '../sections/files/view';

// ----------------------------------------------------------------------

export default function FilesPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <FilesView />
    </>
  );
}
