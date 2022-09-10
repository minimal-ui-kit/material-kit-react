import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import axios from 'axios';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';

>>>>>>> Stashed changes
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    
    formState: { isSubmitting },
  } = methods;

<<<<<<< Updated upstream
  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };
=======
  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });
  // };
  const [valfullname, setFullName] = useState("")
  const [valphone, setPhone] = useState("")
  const [valpassword, setPassword] = useState("")
  const [valrepassword, setRePassword] = useState("")
  const [passwderror, setPasswdError] = useState("")
  const [lengthpasswderror, setLengthPasswdError] = useState("")
  const [fullnameerror, setFullNameError] = useState("")
  const [phoneerror, setPhoneError] = useState("")

  const submitForm = () =>{
    
    if (valpassword === valrepassword && valpassword.length >=8){
      axios({
        method:'post',
        url: `/.netlify/functions/api/register`,
        data: { "phone": valphone, "fullname":valfullname ,"passwd": valpassword }
      }).then(res => {
        if (res.data.etype === 'fullname'){
          setFullNameError(res.data.message)
        }
        if (res.data.etype === 'phone'){
          setPhoneError(res.data.message)
        }
        if (res.data.status === true){
          setRegStatus(true)
          setTimeout(() => {
            return navigate('/login', { replace: true });
          }, 1500);
          
        }
      })
    }
    else if (valpassword !== valrepassword ){
      setPasswdError("Xác nhận mật khẩu không chính xác")
    }
    else if (valpassword.replace(' ', '').length< 8 ){
      setLengthPasswdError("Mật khẩu phải dài hơn 8 chữ số")
    }
    
  }
>>>>>>> Stashed changes

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
