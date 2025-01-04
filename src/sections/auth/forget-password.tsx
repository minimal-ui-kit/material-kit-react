import * as React from 'react';
import { useState, useCallback } from 'react';

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
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const validateEmail = () => {
    const email = document.getElementById('forgetPasswordEmail') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = useCallback(async () => {
    if (!validateEmail()) {
      return;
    }
    const email = (document.getElementById('forgetPasswordEmail') as HTMLInputElement).value;
    setLoading(true);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage(true); // Başarılı mesajını göster
      handleClose();
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setLoading(false);
    }
  }, [handleClose]);

  const handleSuccessClose = () => {
    setSuccessMessage(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none' },
        }}
      >
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a link to reset your
            password.
          </DialogContentText>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="forgetPasswordEmail"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            label="Email address"
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
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
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
          Password reset link successfully sent!
        </Alert>
      </Snackbar>
    </>
  );
}
