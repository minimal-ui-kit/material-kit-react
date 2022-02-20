/* eslint-disable */ 
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function UpdateForm() {
const navigate = useNavigate();
const UpdateSettings = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    phoneNumber: Yup.number().required('Phone Number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
});

const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
    },
    validationSchema: UpdateSettings,
    onSubmit: () => {
        e.preventDefault();
        navigate('/dashboard/user', { replace: true });
    }
});
const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
return (
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        label="First name"
                        {...getFieldProps('firstName')}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                        fullWidth
                        label="Last name"
                        {...getFieldProps('lastName')}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                    />
                </Stack>
                <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Update
                </LoadingButton>
            </Stack>
        </Form>
    </FormikProvider>
);
}
