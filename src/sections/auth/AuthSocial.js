// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startFacebookLogin, startGoogleLogin } from '../../redux/actions/authReducer'
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => dispatch(startGoogleLogin())}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => dispatch(startFacebookLogin())}>
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          O
        </Typography>
      </Divider>
    </>
  );
}
