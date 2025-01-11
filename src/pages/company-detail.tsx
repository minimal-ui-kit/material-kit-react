import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import {
  Box,
  Tab,
  Card,
  Tabs,
  Divider,
  Container,
  Typography,
} from '@mui/material';

import { CompanyInfo } from 'src/sections/business-partners/company-info';
import { CompanyContacts } from 'src/sections/business-partners/company-contacts';


export default function CompanyDetailPage() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('info');

  const TABS = [
    {
      value: 'info',
      label: 'Şirket Bilgileri',
      component: <CompanyInfo id={id} />,
    },
    {
      value: 'contacts',
      label: 'İletişim Kişileri',
      component: <CompanyContacts companyId={id} />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Şirket Detayı | Lojistik Yönetim Sistemi</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Şirket Detayı
        </Typography>

        <Card>
          <Tabs
            value={currentTab}
            onChange={(_e, newValue) => setCurrentTab(newValue)}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Divider />

          <Box sx={{ p: 3 }}>
            {TABS.map(
              (tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>
            )}
          </Box>
        </Card>
      </Container>
    </>
  );
} 