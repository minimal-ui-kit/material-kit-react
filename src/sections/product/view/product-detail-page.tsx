// import { useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, Stack } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { ProductItemProps } from 'src/sections/product/product-item';
// ----------------------------------------------------------------

export function ProductDetailPage({ product }: { product: ProductItemProps }) {

    const router = useRouter();
      
          const data = {
              name: 'Activity Name',
              creditcost: 5,
              status: 'sale',
              description: 'Activity Description',
          };

          return (
            <Container maxWidth="sm">
              <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {data.name}
                  </Typography>
        
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Credit Cost:</strong> {data.creditcost}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Status:</strong> {data.status}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Description:</strong> {data.description}
                    </Typography>
                  </Stack>
        
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => (router.push(`/product/${product.id}/customers`))}>
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