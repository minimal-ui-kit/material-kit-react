import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export function NewProductPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                Add New Product
            </Typography>

            <Box component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Product Name"
                    {...register('name', { required: 'Product name is required' })}
                />
                <TextField
                    fullWidth
                    label="Product Description"
                    {...register('description', { required: 'Product description is required' })}
                />
                <TextField
                    fullWidth
                    label="Product Price"
                    {...register('price', { required: 'Product price is required' })}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Add Product
                </Button>
            </Box>
        </Container>
      );
}