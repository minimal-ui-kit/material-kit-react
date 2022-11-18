/* eslint-disable */

import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const dev_BASE_URL = "http://localhost:8080/" 
const BASE_URL = "https://gct-ac-api.herokuapp.com/" 
const axios = require('axios');
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};
let currentTemp = 0
let maxTemp = 65


export default function GyserForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Current Temperature Required'),
    password: Yup.string().required('Max Temperature is required')
  });

  const formik = useFormik({
    initialValues: {
      maxTemp: 65,
      currentTemp: 0,
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      validateLoginUser();
      updateLimitTemp()
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  setTimeout( () => 
    validateLoginUser(),5000);
  
    const validateLoginUser = async () => {
    const loginObject = {
      currentTemp : {...getFieldProps('currentTemp')},
      maxTemp : {...getFieldProps('maxTemp')}
    }
    
    try {
      await axios.get(BASE_URL + 'buckets/2',{
        mode: 'cors',
        headers: headers
      })
      .then(function(response) {
        navigate('/gyser', { replace: true });
      }).catch(function(error) {
        console.log('',error);
        navigate('/gyser', { replace: true });
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updateLimitTemp = async () => {
    console.log("updateLimitTemp")
    const temp = {
      limitTemp : {...getFieldProps('limitTemp')}
    }
    
    const PATH = "setlimittemp/"+(temp.limitTemp.value)+"/2";

    try {
      await axios.put(BASE_URL + PATH,{
        mode: 'cors',
        headers: headers
      })
      .then(function(response) {
        navigate('/gyser', { replace: true });

      }).catch(function(error) {
        console.log('',error);
        navigate('/gyser', { replace: true });

      });
    } catch (err) {
      console.log(err);
      throw err;
    }
 
  };
  

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

            <TextField
              fullWidth
              label="Current Temperature"
              readOnly
              {...getFieldProps('currentTemp')}
              error={Boolean(touched.currentTemp && errors.currentTemp)}
              helperText={touched.currentTemp && errors.currentTemp}
              value={currentTemp}
            />

            <TextField
              fullWidth
              label="Maximum Temperature"
              {...getFieldProps('maxTemp')}
                        error={Boolean(touched.maxTemp && errors.maxTemp)}
              helperText={touched.maxTemp && errors.maxTemp}
              value={maxTemp}
            />
          </Stack>
          <TextField
              fullWidth
              label="Update Limit Temperature"
              {...getFieldProps('limitTemp')}
                        error={Boolean(touched.limitTemp && errors.limitTemp)}
              helperText={touched.limitTemp && errors.limitTemp}
            />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={updateLimitTemp}
          >
            Update Configuration
          </LoadingButton>
        </Stack>

      </Form>
    </FormikProvider>
  );
}
