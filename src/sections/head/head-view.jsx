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

// ----------------------------------------------------------------------

const top100Films = [
    { title: 'Volunteer'},
    { title: 'Executive' },
    { title: 'Heads' },
];

export default function HeadView() {
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
    };
    const flatProps = {
        options: top100Films.map((option) => option.title),
    };
    const [value, setValue] = React.useState(null);
    const theme = useTheme();

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        router.push('/dashboard');
    };
    const {login,name,role, check} = useAuth()

    const renderForm = (
       
        <>
       
            <Stack spacing={3} mb={3}>
                <TextField name="username" label="Username" />

                <TextField
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

                <Autocomplete
                    {...defaultProps}
                    id="role"
                    disableCloseOnSelect
                    renderInput={(params) => (
                        <TextField {...params} label="Role" variant="standard" />
                    )}
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
    if(role==="head"){
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
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );}
    return (
        <h1>You are not a head</h1>
    )
}
