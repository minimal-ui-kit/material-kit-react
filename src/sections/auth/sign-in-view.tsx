import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSignIn(); // Simulate button click when Enter is pressed
		}
	};

	const handleSignIn = useCallback(() => {
		fetch('http://localhost:3000/api/businesses/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "success") {
					localStorage.setItem("token", data.accessToken);
					setSnackbarMessage(data.message);
					setSnackbarSeverity("success");
					setOpenSnackbar(true);
					setTimeout(() => {
						router.push('/');
					}, 1000);
				} else {
					setSnackbarMessage(data.message);
					setSnackbarSeverity("error");
					setOpenSnackbar(true);
					setFormData({
						...formData,
						password: ""
					});
				}
			});
	}, [router, formData]);

	const renderForm = (
		<Box display="flex" flexDirection="column" alignItems="flex-end">
			<TextField
				fullWidth
				name="email"
				label="Email address"
				InputLabelProps={{ shrink: true }}
				sx={{ mb: 3 }}
				onChange={handleChange}
				required
				onKeyDown={handleKeyPress}
			/>

			<Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
				Forgot password?
			</Link>

			<TextField
				fullWidth
				name="password"
				label="Password"
				defaultValue="@demo1234"
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
				value={formData.password}
				required
				onKeyDown={handleKeyPress}
			/>

			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				color="inherit"
				variant="contained"
				onClick={handleSignIn}
			>
				Sign in
			</LoadingButton>
		</Box>
	);

	return (
		<>
			<Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
				<Typography variant="h5">Sign in</Typography>
				<Typography variant="body2" color="text.secondary">
					Don’t have an account?
					<Link href="/sign-up" variant="subtitle2" sx={{ ml: 0.5 }}>
						Get started
					</Link>
				</Typography>
			</Box>

			{renderForm}

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
					{snackbarMessage}
				</Alert>
			</Snackbar>

			{/* <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
		</>
	);
}
