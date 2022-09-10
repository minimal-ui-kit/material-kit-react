import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import axios from 'axios';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

// @ts-ignore
>>>>>>> Stashed changes
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/products', { replace: true });
  };
<<<<<<< Updated upstream
=======
  const logout = () =>{
    document.cookie = `${document.cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setAuthen(false)
  }
  const [show, setShow] = useState(false)
  const [valphone, setPhone] = useState("")
  const [valpassword, setPassword] = useState("")
  const [isAuthen, setAuthen] = useState(false)
  const [user, setUser] = useState("")
  const submitForm = () =>{
    document.cookie = `${document.cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    axios({
      method: 'post',
      url: `/.netlify/functions/api/login`,
      data: { "phone": valphone, "passwd": valpassword },
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    }).then(res => {
      
      if (res.data.authen === true){
        setUser(res.data.user)
        setAuthen(true)
      }
      else {
        setShow(true)
      }
    
    });
      
    
    
  }

  useEffect(()=>{
    axios({
      method: 'post',
      url: `/.netlify/functions/api/login`,
      data: { "phone": '', "passwd": ''},
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      
    }).then(res => {
      if (res.data.authen === true){
        setUser(res.data.user)
        setAuthen(true)
      }});
    
  }, [])

>>>>>>> Stashed changes

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
<<<<<<< Updated upstream
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
=======
        {isAuthen && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" icon={false} severity="success">
            <List>
              <ListItemText>
                Tài khoản: {user}
              </ListItemText>
              <ListItemText>
                Số dư: 0d
              </ListItemText>
            </List>
          </Alert>
        </Stack>}
        {!isAuthen && show && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
            Đăng nhập thất bại
          </Alert>
        </Stack>
        }
        {isAuthen && <LoadingButton fullWidth size="large" type="button" variant="contained" onClick={()=>logout()} loading={isSubmitting}>
        Đăng Xuất
        </LoadingButton>
        }
       
          {!isAuthen && <TextField id="outlined-basic" name="phone" onChange={(e)=> setPhone(e.target.value)} label="Số điện thoại" variant="outlined" />}
          {!isAuthen && <TextField
            name="password"
            label="Mật khẩu"
            onChange={(e)=> setPassword(e.target.value)}
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
          />}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {!isAuthen && <RHFCheckbox name="remember" label="Ghi nhớ mật khẩu" />}
        {!isAuthen &&<Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>}
      </Stack>
      {!isAuthen &&<LoadingButton fullWidth size="large" type="button" variant="contained" onClick={()=>submitForm()} loading={isSubmitting}>
        Đăng nhập
      </LoadingButton>}
>>>>>>> Stashed changes
    </FormProvider>
  );
}
