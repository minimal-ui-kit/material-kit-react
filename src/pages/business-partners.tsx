import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card } from '@mui/material';

import { CompanyList } from 'src/sections/business-partners/company-list';
import { CONFIG } from 'src/config-global';

export default function BusinessPartnersPage() {
  return (
    <>
      <Helmet>
        <title> {`Şirketler - ${CONFIG.appName}`}</title>
      </Helmet>

      <CompanyList />
    </>
  );
} 