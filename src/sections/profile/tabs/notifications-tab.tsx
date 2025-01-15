import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography } from '@mui/material';

import { NotificationCard } from '../components/notification-card';

import type { NotificationType } from '../components/notification-card';

export function NotificationsTab() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Record<NotificationType, boolean>>({
    email: true,
    push: true,
    monthly: false,
    news: true,
  });

  const handleNotificationChange = (type: NotificationType, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: checked,
    }));
  };

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        {t('profile:notifications.title')}
      </Typography>

      <Stack spacing={2}>
        {(['email', 'push', 'monthly', 'news'] as NotificationType[]).map((type) => (
          <NotificationCard
            key={type}
            type={type}
            checked={notifications[type]}
            onChange={(checked) => handleNotificationChange(type, checked)}
          />
        ))}
      </Stack>
    </Box>
  );
} 