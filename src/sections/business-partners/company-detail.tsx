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

import { useBoolean } from 'src/hooks/use-boolean';

import {DashboardContent} from 'src/layouts/dashboard/dashboard-content';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { CompanyInfo } from './company-info';
import { CompanyContacts } from './company-contacts';
import { useSettingsContext } from '../../components/settings/context/settings-context';

const TABS = [
  {
    value: 'general',
    label: 'partners.tabs.general',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'contacts',
    label: 'partners.tabs.contacts',
    icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'contracts',
    label: 'partners.tabs.contracts',
    icon: <Iconify icon="solar:document-bold" width={24} />,
  },
  {
    value: 'performance',
    label: 'partners.tabs.performance',
    icon: <Iconify icon="solar:chart-bold" width={24} />,
  },
  {
    value: 'pricing',
    label: 'partners.tabs.pricing',
    icon: <Iconify icon="solar:dollar-minimalistic-bold" width={24} />,
  },
  {
    value: 'analytics',
    label: 'partners.tabs.analytics',
    icon: <Iconify icon="solar:graph-new-bold" width={24} />,
  },
];

export default function CompanyDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const [currentTab, setCurrentTab] = useState('general');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleEdit = () => {
    router.push(paths.dashboard.partners.edit(id as string));
  };

  const handleDelete = () => {
    confirm.onTrue();
  };

  return (
      <DashboardContent>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: { xs: 3, md: 5 },
              }}
          >
            <Typography variant="h4">{t('partners.companyDetails')}</Typography>

            <Stack direction="row" spacing={1}>
              <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:pen-bold" />}
                  onClick={handleEdit}
              >
                {t('partners.edit')}
              </Button>

              <Button
                  color="error"
                  variant="outlined"
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
        </Container>
      </DashboardContent>
  );
}