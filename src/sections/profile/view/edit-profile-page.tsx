import React, { useState } from "react";
import { 
  TextField, Button, Container, Paper, Avatar, Typography, Grid, IconButton 
} from "@mui/material";
import { useRouter } from "src/routes/hooks";

export function EditProfileView({ profile }: { profile: { name: string; email: string; phone: string; address: string; imageUrl?: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState(profile);
  const [image, setImage] = useState(profile.imageUrl || "/default-profile.png");

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   // Handle Image Upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const imageUrl = URL.createObjectURL(e.target.files[0]);
//       setImage(imageUrl);
//     }
//   };

  // Handle Form Submission
  const handleSubmit = () => {
    console.log("Updated Profile:", formData);
    router.push("/profile"); // Navigate back to profile after saving
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>Edit Profile</Typography>

        {/* Profile Picture */}
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Avatar src={image} sx={{ width: 100, height: 100 }} />
          {/* <IconButton component="label">
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </IconButton> */}
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
    </Container>
  );
}
