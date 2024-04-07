import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'rgba(249, 250, 251, 1)',
  border: '2px solid rgb(228, 231, 235)',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  alignItems: 'center',
};

// Custom backdrop with blur effect
const BlurBackdrop = (props) => (
  <Backdrop
    {...props}
    sx={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(249, 250, 251, 0.6)' }}
  />
);

export default function TicketsUploadModal({ open, text }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={null}
        // closeAfterTransition
        BackdropComponent={BlurBackdrop} // Use your custom BlurBackdrop component
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              {text}
            </Typography>
            <Stack mt={5} flexDirection="row" alignItems="center" justifyContent="space-evenly">
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

TicketsUploadModal.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
};
