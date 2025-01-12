import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompanyList } from 'src/sections/company/company-list';

export default function CompanyListPage() {
  return (
    <>
      <Helmet>
        <title> {`Şirketler - ${CONFIG.appName}`}</title>
      </Helmet>

      <CompanyList />
    </>
  );
} 