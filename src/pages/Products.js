import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography,Box ,Grid} from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import UserManagment from 'src/_mocks_/steup/UserManagment';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

 

  return (
    <Page title="Dashboard: Products ">
    <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
 
          <Grid item xs={12} sm={12} md={12}>
            <UserManagment/>
          </Grid>
  

        
        </Grid>
      </Container>
    </Page>
  );
}
