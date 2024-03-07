import React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';

import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/context/loginContext';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// ----------------------------------------------------------------------

const top100Films = [{ title: 'volunteer' }, { title: 'executive' }, { title: 'head' }];

export default function HeadView() {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };
  const [namee, setName] = useState('');
  const [rolee, setRole] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [password, setPassword] = useState('');
  const flatProps = {
    options: top100Films.map((option) => option.title),
  };
  const [value, setValue] = React.useState(null);
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    console.log(namee, rolee, password, enrollment);
    const data = {
      name: namee,
      password: password,
      role: rolee,
      enrollment: enrollment,
    };
    // console.log('data: ', data);
    // fetch('http://localhost:8000/api/auth/register/', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log('Error: ', err);
    //   });
    await axios
      .post('http://localhost:8000/api/auth/register/', data)
      //   .post('https://app-admin-api.asmitaiiita.org/api/auth/register/', data)
      .then(() => {
        alert('Added user');
      })
      .catch((err) => {
        console.log(err);
        alert('Error');
      });
  };
  const decoded = jwtDecode(localStorage.getItem('token'));
  console.log(decoded.exp);
  console.log(Date.now() / 1000);
  let role;
  if (decoded.exp > Date.now() / 1000) {
    role = decoded.role;
  }
  console.log('role: ', role);
  //   const { login, name, role, check } = useAuth();
  //   console.log(role);

  const renderForm = (
    <>
      <Stack spacing={3} mb={3}>
        <TextField
          name="username"
          label="Name"
          value={namee}
          onChange={(e) => {
            setName(e.target.value);
            // console.log(namee)
          }}
        />
        <TextField
          name="username"
          label="Enrollmemt"
          value={enrollment}
          onChange={(e) => {
            setEnrollment(e.target.value);
            // console.log(namee)
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            //console.log(password)
          }}
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

        <Autocomplete
          {...defaultProps}
          id="role"
          disableCloseOnSelect
          renderInput={(params) => <TextField {...params} label="Role" variant="standard" />}
          onChange={(event, newValue) => {
            console.log(newValue);
            setRole(newValue.title);
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Add
      </LoadingButton>
    </>
  );
  if (role === 'head') {
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
<<<<<<< HEAD
        >
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );}
    else{
    return (
        <h1>You are not a head</h1>
    )}
=======
          >
            {renderForm}
          </Card>
        </Stack>
      </Box>
    );
  }
  return <h1>You are not a head</h1>;
>>>>>>> a3938c593652e352df9e9ac565f1f17fd54fc5a7
}
