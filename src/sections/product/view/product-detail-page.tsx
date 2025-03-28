import { Container, Typography, Box, Button, Card, CardContent, Stack, Chip, Divider, Rating } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { ProductItemProps } from 'src/sections/product/product-item';

export function ProductDetailPage({ product }: { product: ProductItemProps }) {
    const router = useRouter();
    
    const data = {
        name: 'Yoga Classes',
        day: 'Monday',
        time: '10:00 AM - 11:00 AM',
        location: 'Anytime Fitness',
        creditcost: 5,
        status: 'Upcoming',
        description: 'Join our Yoga classes for a relaxing and rejuvenating experience. Suitable for all levels.',
        isOneTime: true,
        totalSlots: 20,
        signUps: 10,
        rating: 4.5,
        imageUrl: '/assets/images/products/product_1.jpg',
    };

    return (
        <Container maxWidth="md">
            <Card sx={{ mt: 4, p: 3, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        {data.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img src={data.imageUrl} alt={data.name} style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', objectFit: 'cover' }} />
                    </Box>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                        <Chip label={data.status} color={data.status === 'Upcoming' ? 'primary' : 'secondary'} sx={{ alignSelf: 'flex-start' }} />
                        <Typography variant="body1"><strong>Day:</strong> {data.day}</Typography>
                        <Typography variant="body1"><strong>Time:</strong> {data.time}</Typography>
                        <Typography variant="body1"><strong>Location:</strong> {data.location}</Typography>
                        <Typography variant="body1"><strong>Credit Cost:</strong> {data.creditcost}</Typography>
                        <Typography variant="body1"><strong>Total Slots:</strong> {data.totalSlots} (Signed Up: {data.signUps})</Typography>
                        <Typography variant="body1"><strong>One-Time Event:</strong> {data.isOneTime ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body1"><strong>Description:</strong> {data.description}</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1"><strong>Rating:</strong></Typography>
                            <Rating value={data.rating} precision={0.5} readOnly />
                        </Box>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => router.push(`/product/${product.id}/customers`)}>
                            View Customers
                        </Button>
                        <Button variant="contained" color="primary">
                            Edit Activity
                        </Button>
                        <Button variant="contained" color="error">
                            Delete Activity
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
