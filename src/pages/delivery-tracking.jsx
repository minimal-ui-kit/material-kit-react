import { Helmet } from 'react-helmet-async';

import { BlogView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function DeliveryTracking() {
  return (
    <>
      <Helmet>
        <title> Delivery Tracking </title>
      </Helmet>
      {/* To-Do */}
      <BlogView/>
    </>
  );
}
