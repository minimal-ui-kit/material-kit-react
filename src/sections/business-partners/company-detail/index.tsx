import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { GeneralInfo } from './general-info';
import { ContactList } from './contact-list';

const TABS = [
  {
    value: 'general',
    label: 'partners.tabs.general',
    icon: 'solar:file-bold-duotone',
  },
  {
    value: 'contacts',
    label: 'partners.tabs.contacts',
    icon: 'solar:users-group-rounded-bold-duotone',
  },
  {
    value: 'contracts',
    label: 'partners.tabs.contracts',
    icon: 'solar:document-text-bold-duotone',
  },
  {
    value: 'performance',
    label: 'partners.tabs.performance',
    icon: 'solar:chart-2-bold-duotone',
  },
  {
    value: 'pricing',
    label: 'partners.tabs.pricing',
    icon: 'solar:tag-price-bold-duotone',
  },
  {
    value: 'analytics',
    label: 'partners.tabs.analytics',
    icon: 'solar:chart-square-bold-duotone',
  },
];

export default function CompanyDetailPage() {
  const { t } = useTranslation('business');
  const router = useRouter();
  const { id } = useParams();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleEdit = () => {
    console.log('Edit company:', id);
  };

  const handleDelete = () => {
    console.log('Delete company:', id);
    router.push(paths.dashboard.partners.list);
  };

  return (
    <DashboardContent>
      <Container maxWidth={false}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h4">ABC Lojistik Ltd. Şti.</Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('partners.taxNumber')}: 1234567890
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={handleEdit}
            >
              {t('partners.edit')}
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={handleDelete}
            >
              {t('partners.delete')}
            </Button>
          </Stack>
        </Stack>

        <Card>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              px: 3,
              boxShadow: (theme) => `inset 0 -1px 0 ${theme.palette.divider}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={t(tab.label)}
                icon={<Iconify icon={tab.icon} sx={{ mr: 1 }} />}
                iconPosition="start"
              />
            ))}
          </Tabs>

          <Box
            sx={{
              p: 3,
              minHeight: 400,
            }}
          >
            <Scrollbar>
              {currentTab === 'general' && <GeneralInfo id={id} />}
              {currentTab === 'contacts' && <ContactList id={id} />}
              {currentTab === 'contracts' && <Typography>Contracts</Typography>}
              {currentTab === 'performance' && <Typography>Performance</Typography>}
              {currentTab === 'pricing' && <Typography>Pricing</Typography>}
              {currentTab === 'analytics' && <Typography>Analytics</Typography>}
            </Scrollbar>
          </Box>
        </Card>
      </Container>
    </DashboardContent>
  );
} 