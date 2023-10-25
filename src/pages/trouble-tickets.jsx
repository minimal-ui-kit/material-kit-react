import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function TroubleTickets() {
  return (
    <>
      <Helmet>
        <title> Trouble Tickets </title>
      </Helmet>
      {/* To-Do */}
      <ProductsView />
    </>
  );
}
