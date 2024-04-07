import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import Iconify from '../iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'rgba(249, 250, 251, 1)',
  border: '2px solid rgb(228, 231, 235)',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

// Custom backdrop with blur effect
const BlurBackdrop = (props) => (
  <Backdrop
    {...props}
    sx={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(249, 250, 251, 0.6)' }}
  />
);

export default function EmailSelectModal({
  handleClose,
  open,
  existingEmail,
  checkEmail,
  loading,
  handleEmailChange,
  emailVerified,
  syncWithJira,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        BackdropComponent={BlurBackdrop} // Use your custom BlurBackdrop component
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center', mb: 2 }}
            >
              Email Address Verification
            </Typography>
            {/* <Stack mt={5} flexDirection="row" alignItems="center" justifyContent="space-evenly"></Stack> */}
            <Grid
              direction="row"
              container
              spacing={1}
              sx={{ alignItems: 'center', width: '100%' }}
            >
              <Grid item xsOffset={2} xs={5} sx={{ alignItems: 'center' }}>
                <TextField
                  fullWidth
                  id="new-email"
                  label="JIRA Email Address"
                  variant="outlined"
                  value={existingEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} sx={{ alignItems: 'flex-start' }}>
                <LoadingButton
                  loading={loading}
                  startIcon={<Iconify icon="devicon:jira" />}
                  color="primary"
                  disabled={!existingEmail}
                  onClick={() => checkEmail(existingEmail)}
                >
                  Check on Jira
                </LoadingButton>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, width: '90%' }} />
            {/* <Box spacing={1} sx={{ width: '100%', alignItem: 'center' }}> */}
            <LoadingButton
              loading={loading}
              startIcon={<Iconify icon="material-symbols:sync" />}
              color="primary"
              disabled={!emailVerified}
              onClick={syncWithJira}
              sx={{ width: '70%' }}
            >
              Sync With Jira
            </LoadingButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

EmailSelectModal.propTypes = {
  open: PropTypes.bool,
  checkEmail: PropTypes.func,
  loading: PropTypes.bool,
  existingEmail: PropTypes.string,
  handleClose: PropTypes.func,
  handleEmailChange: PropTypes.func,
  emailVerified: PropTypes.bool,
  syncWithJira: PropTypes.func,
};
