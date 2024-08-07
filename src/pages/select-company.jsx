import { Helmet } from 'react-helmet-async';

import { SelectCompanyView } from 'src/sections/select-company';

// ----------------------------------------------------------------------

export default function SelectCompanyPage() {
  return (
    <>
      <Helmet>
        <title> Kompaniya rolini tanlash| Minimal UI </title>
      </Helmet>

      <SelectCompanyView />
    </>
  );
}
