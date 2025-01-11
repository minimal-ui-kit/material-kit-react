import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Tab, Card, Tabs, Stack, Divider, Container, Typography } from '@mui/material';

import { useUser } from 'src/contexts/user-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { GeneralTab } from '../tabs/general-tab';
import { SecurityTab } from '../tabs/security-tab';
import { ProfileAvatar } from '../components/profile-avatar';
import { NotificationsTab } from '../tabs/notifications-tab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export function ProfileView() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <DashboardContent>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            {t('profile:title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('profile:subtitle')}
          </Typography>
        </Box>

        <Stack spacing={3}>
          <Card>
            <Box
              sx={{
                py: 3,
                px: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }}
            >
              <ProfileAvatar avatarUrl={user?.avatarUrl} name={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`} />

              <Box sx={{ color: 'common.white' }}>
                <Typography variant="h6">{`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.72 }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                px: 3,
                '& .MuiTab-root': {
                  minHeight: 48,
                  fontWeight: 600,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tab label={t('profile:tabs.general')} />
              <Tab label={t('profile:tabs.security')} />
              <Tab label={t('profile:tabs.notifications')} />
            </Tabs>

            <Divider />

            <TabPanel value={activeTab} index={0}>
              <GeneralTab />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <SecurityTab />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <NotificationsTab />
            </TabPanel>
          </Card>
        </Stack>
      </Container>
    </DashboardContent>
  );
} 