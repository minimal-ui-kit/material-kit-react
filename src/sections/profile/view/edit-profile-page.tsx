import React, { useState } from "react";
import {
	TextField, Button, Container, Paper, Avatar, Typography, Grid, Snackbar, Alert, IconButton
} from "@mui/material";
import { useRouter } from "src/routes/hooks";
import { MdPhotoCamera } from "react-icons/md";
import { ProfileViewProps } from "./profile-page";


export function EditProfileView({ profile }: ProfileViewProps) {
	const router = useRouter();
	const [formData, setFormData] = useState(profile);
	const [image, setImage] = useState(profile.profileImage || "/default-profile.png");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

	// Handle Input Changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle Image Upload
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSelectedFile(file);

			// Preview the image
			const imageUrl = URL.createObjectURL(file);
			setImage(imageUrl);
		}
	};

	// Handle Form Submission
	const handleSubmit = () => {
		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			if (key !== 'profileImage') { // avoid appending profileImage directly
				formDataToSend.append(key, value);
			}
		});

		// Append the profile image to FormData
		formDataToSend.append("profileImage", image);

		// Append the selected file if it exists
		if (selectedFile) {
			formDataToSend.append("file", selectedFile);
		}

		fetch("http://localhost:3000/api/businesses/editProfile", {
			method: "PUT",
			
			body: formDataToSend,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "success") {
					setSnackbarMessage(data.message);
					setSnackbarSeverity("success");
					setOpenSnackbar(true);
					setTimeout(() => {
						router.push('/profile');
					}, 1000);
				} else {
					setSnackbarMessage(data.message);
					setSnackbarSeverity("error");
					setOpenSnackbar(true);
					setFormData(profile); // Reset form data on error
				}
			});
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
				<Typography variant="h5" gutterBottom>Edit Profile</Typography>

				{/* Profile Picture */}
				<Grid container justifyContent="center" sx={{ mt: 2 }}>
					<Avatar src={image} sx={{ width: 100, height: 100 }} />
				</Grid>
				<Grid container justifyContent="center" sx={{ my: 2 }}>
					<Button variant="outlined" component="label">
						<MdPhotoCamera size={18} color="black" />
						<Typography sx={{ ml: 1 }} variant="body2">Upload Image</Typography>
						<input type="file" name="file" hidden accept="image/*" onChange={handleImageUpload} />
					</Button>
				</Grid>

				{/* Form Fields */}
				<TextField
					fullWidth label="Name" name="name" value={formData.name}
					onChange={handleChange} sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth label="Email" name="email" value={formData.email}
					onChange={handleChange} sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth label="Phone" name="phone" value={formData.phone}
					onChange={handleChange} sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth label="Address" name="address" value={formData.address}
					onChange={handleChange} sx={{ mb: 2 }}
				/>

				{/* Buttons */}
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
							Save Changes
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button fullWidth variant="outlined" onClick={() => router.push("/profile")}>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</Paper>

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
		</Container>
	);
}
