import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export function NewProductPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                Add New Activity
            </Typography>

            <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Activity Name"
                    {...register('name', { required: 'Activity name is required' })}
                />
                <TextField
                    fullWidth
                    label="Activity Credit Price"
                    {...register('price', { required: 'Activity credit price is required' })}
                />
                <TextField
                    fullWidth
                    label="Activity Status"
                    {...register('status', { required: 'Activity status is required' })}
                />
                <TextField
                    fullWidth
                    label="Activity Description"
                    {...register('description', { required: 'Activity description is required' })}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Add Activity
                </Button>
            </Box>
        </Container>
      );
}