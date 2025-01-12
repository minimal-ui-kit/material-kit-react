import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Tab, Card, Tabs, Stack, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { CompanyInfo } from './company-info';
import { Iconify } from '../../components/iconify';
import { useBoolean } from '../../hooks/use-boolean';
import { CompanyContacts } from './company-contacts';
import { Scrollbar } from '../../components/scrollbar';
import { BackButton } from '../../components/back-button';

const TABS = [
  {
    value: 'general',
    label: 'company.tabs.general',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'contacts',
    label: 'company.tabs.contacts',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'contracts',
    label: 'company.tabs.contracts',
    icon: <Iconify icon="solar:document-bold" width={24} />,
  },
  {
    value: 'performance',
    label: 'company.tabs.performance',
    icon: <Iconify icon="solar:chart-bold" width={24} />,
  },
  {
    value: 'pricing',
    label: 'company.tabs.pricing',
    icon: <Iconify icon="solar:dollar-minimalistic-bold" width={24} />,
  },
  {
    value: 'analytics',
    label: 'company.tabs.analytics',
    icon: <Iconify icon="solar:graph-new-bold" width={24} />,
  },
];

export function CompanyDetail() {
  const { t } = useTranslation('company');
  const { id } = useParams();
  const confirm = useBoolean();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleDelete = () => {
    confirm.onTrue();
  };

  return (
    <DashboardContent>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Typography variant="h4">{t('company.companyDetails')}</Typography>

        <Stack direction="row" spacing={1}>
          <BackButton />
        </Stack>
      </Stack>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${theme.palette.divider}`,
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={t(tab.label)}
              iconPosition="start"
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          <Scrollbar>
            {currentTab === 'general' && <CompanyInfo id={id as string} />}
            {currentTab === 'contacts' && <CompanyContacts companyId={id as string} />}
            {currentTab === 'contracts' && <Typography>Contracts</Typography>}
            {currentTab === 'performance' && <Typography>Performance</Typography>}
            {currentTab === 'pricing' && <Typography>Pricing</Typography>}
            {currentTab === 'analytics' && <Typography>Analytics</Typography>}
          </Scrollbar>
        </Box>
      </Card>
    </DashboardContent>
  );
}
