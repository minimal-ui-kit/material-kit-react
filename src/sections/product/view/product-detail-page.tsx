import { Container, Typography, Box, Button, Card, CardContent, Stack, Chip, Divider, Rating } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { ProductItemProps } from 'src/sections/product/product-item';


function formatTimeRange(frequencyTime: string, duration: string) {
    // Split the frequencyTime into hours and minutes
    const [hours, minutes] = frequencyTime.split(':').map(Number);
  
    // Create a date object using the current date and the provided time
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0); // Set start time with frequency time
  
    // Calculate the end time by adding the duration (in hours) to the start time
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + Number(duration));
  
    // Format the start and end times as "HH:mm"
    const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return `${formattedStartTime} - ${formattedEndTime}`;
}


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

    console.log('Product Detail Page:', product);

    return (
        <Container maxWidth="md">
            <Card sx={{ mt: 4, p: 3, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        {product.name}
                    </Typography>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                        <Chip label={data.status} color={data.status === 'Upcoming' ? 'primary' : 'secondary'} sx={{ alignSelf: 'flex-start' }} />
                        <Typography variant="body1"><strong>Day:</strong> {data.day}</Typography>
                        <Typography variant="body1"><strong>Time:</strong> {formatTimeRange(product.frequencyTime, product.duration)}</Typography>
                        <Typography variant="body1"><strong>Location:</strong> {product.location}</Typography>
                        <Typography variant="body1"><strong>Credit Cost:</strong> {product.creditCost}</Typography>
                        <Typography variant="body1"><strong>Total Slots:</strong> {product.totalSlots} (Signed Up: {product.signUps})</Typography>
                        <Typography variant="body1"><strong>One-Time Event:</strong> {product.isOneTime ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body1"><strong>Description:</strong> {product.description}</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1"><strong>Rating:</strong></Typography>
                            <Rating value={data.rating} precision={0.5} readOnly />
                        </Box>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="contained" color="secondary" onClick={() => router.push(`/product/${product._id}/customers`)}>
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
