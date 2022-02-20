/* eslint-disable */ 
import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ItemList
} from '../components/_dashboard/item';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function Item() {

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  return (
    <Page title="Dashboard: Item | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Item Page
        </Typography>
        <ItemList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
