import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Box, Alert, Stack, TextField, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { usePasswordForm } from '../hooks/use-password-form';
import { PasswordRules } from '../components/password-rules';

export function SecurityTab() {
  const { t } = useTranslation();
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isSaving,
    successMessage,
    formErrors,
    setFormErrors,
    handleSubmit,
  } = usePasswordForm();

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        {t('profile:security.title')}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="password"
            label={t('profile:security.currentPassword')}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setFormErrors(prev => ({ ...prev, currentPassword: undefined }));
            }}
            error={!!formErrors.currentPassword}
            helperText={formErrors.currentPassword}
            InputProps={{
              startAdornment: <Iconify icon="solar:lock-bold" width={24} sx={{ color: 'text.disabled', mr: 1 }} />,
            }}
          />

          <PasswordRules password={newPassword} />

          <TextField
            fullWidth
            type="password"
            label={t('profile:security.newPassword')}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setFormErrors(prev => ({ ...prev, newPassword: undefined, confirmPassword: undefined }));
            }}
            error={!!formErrors.newPassword}
            helperText={formErrors.newPassword}
            InputProps={{
              startAdornment: <Iconify icon="solar:lock-password-bold" width={24} sx={{ color: 'text.disabled', mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            type="password"
            label={t('profile:security.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setFormErrors(prev => ({ ...prev, confirmPassword: undefined }));
            }}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            InputProps={{
              startAdornment: <Iconify icon="solar:lock-password-bold" width={24} sx={{ color: 'text.disabled', mr: 1 }} />,
            }}
          />

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {successMessage}
            </Alert>
          )}

          <LoadingButton 
            loading={isSaving}
            type="submit"
            variant="contained" 
            color="primary"
            startIcon={<Iconify icon="solar:lock-password-bold" />}
          >
            {t('profile:security.changePassword')}
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
} 