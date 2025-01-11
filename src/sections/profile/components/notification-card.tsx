import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Stack, Switch, Typography } from '@mui/material';

export type NotificationType = 'email' | 'push' | 'monthly' | 'news';

interface NotificationCardProps {
  type: NotificationType;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function NotificationCard({ type, checked, onChange }: NotificationCardProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        p: 2, 
        bgcolor: 'background.neutral',
        '&:hover': { bgcolor: 'background.default' },
        transition: theme.transitions.create('background-color'),
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2">
            {t(`profile:notifications.${type}.title`)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            {t(`profile:notifications.${type}.description`)}
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              color="primary"
            />
          }
          label=""
        />
      </Stack>
    </Card>
  );
} 