// material
import { Stack, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  return (
    <>
      <Stack direction="row" spacing={2}>s
        
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          O
        </Typography>
      </Divider>
    </>
  );
}
