import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function Enquiries() {
  return (
    <>
      <Helmet>
        <title> Enquiries </title>
      </Helmet>
      {/* To-Do */}
      <BlogView/>
    </>
  );
}
