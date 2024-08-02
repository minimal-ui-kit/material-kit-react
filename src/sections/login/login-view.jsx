import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/routes/context/auth-context';
// ----------------------------------------------------------------------

export default function LoginView() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.2pay.uz/api/users/login/',
        {
          phone_number: phone,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'Accsess-Control-Allow-Origin':  '*',
          },
        }
      );

      login(response.data.token);
      navigate('/', { replace: true });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="phone"
          label="Telefon raqami"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          label="Parol"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        style={{ marginTop: 20 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Kirish
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Box display="flex" alignItems="center">
            <Logo />
            <Typography variant="h4" sx={{ ml: 1, paddingTop: 1.5 }}>
              merchant.2pay.uz
            </Typography>
          </Box>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
