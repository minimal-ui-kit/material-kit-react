import { useState, useCallback, ChangeEvent } from 'react';
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handlePhoneChange = (value: string, data: CountryData, event: ChangeEvent<HTMLInputElement>, formattedValue: string) => {
        setFormData({
            ...formData,
            phone: formattedValue,
        });
    };


    const handleSignUp = useCallback(() => {
        fetch('http://localhost:3000/api/businesses/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.accessToken);
                router.push('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [router, formData]);

    const renderForm = (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <TextField
                fullWidth
                name="name"
                label="Business name"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                name="email"
                label="Email address"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                name="password"
                label="Password"
                InputLabelProps={{ shrink: true }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 3 }}
                onChange={handleChange}
            />

            <PhoneInput
                country="sg" // Default country (Singapore, for example)
                onChange={handlePhoneChange}
                inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                }}
                containerStyle={{ marginBottom: "16px" }}
                inputStyle={{
                    width: "100%",
                    height: "56px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    paddingLeft: "48px",
                }}
            />

            <TextField
                fullWidth
                name="address"
                label="Address"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                onChange={handleChange}
            />

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={handleSignUp}
            >
                Sign Up
            </LoadingButton>
        </Box>
    );

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign Up</Typography>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?
                    <Link href="/sign-in" variant="subtitle2" sx={{ ml: 0.5 }}>
                        Log In
                    </Link>
                </Typography>
            </Box>

            {renderForm}
        </>
    );
}