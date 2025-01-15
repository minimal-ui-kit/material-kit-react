import * as React from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const { t } = useTranslation(['auth', 'common']);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const validateEmail = useCallback(() => {
    const email = document.getElementById('forgetPasswordEmail') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t('resetPassword.emailErrorMessage'));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  }, [t]);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail()) {
      return;
    }
    const email = (document.getElementById('forgetPasswordEmail') as HTMLInputElement).value;
    setLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage(true); // Show success message
      handleClose();
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setLoading(false);
    }
  }, [handleClose, validateEmail]);

  const handleSuccessClose = () => {
    setSuccessMessage(false);
  };

  const handleDialogClose = () => {
    setEmailError(false);
    setEmailErrorMessage('');
    handleClose();
  };

  return (
      <>
        <Dialog
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit,
              noValidate: true, // Disable HTML5 validation
              sx: { backgroundImage: 'none' },
            }}
        >
          <DialogTitle>{t('resetPassword.title')}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <DialogContentText>
              {t('resetPassword.description')}
            </DialogContentText>
            <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="forgetPasswordEmail"
                type="email"
                name="email"
                placeholder={t('resetPassword.emailPlaceholder')}
                autoComplete="email"
                label={t('resetPassword.emailLabel')}
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ mb: 3 }}
                InputLabelProps={{ shrink: true }}
                color={emailError ? 'error' : 'primary'}
            />
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleDialogClose} disabled={loading}>
              {t('resetPassword.cancel')}
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? t('resetPassword.loading') : t('resetPassword.continue')}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
            open={successMessage}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
            {t('resetPassword.successMessage')}
          </Alert>
        </Snackbar>
      </>
  );
}