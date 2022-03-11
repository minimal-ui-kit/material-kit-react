import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography, Box, Grid } from '@mui/material';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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
import CreateProduct from 'src/_mocks_/products/Creatproduct';
import AddMenu from 'src/_mocks_/products/AddMenu';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [excelOpen, setExcelOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickOpenExcel = () => {
    setExcelOpen(true);
  };
  const handleClickCloseExcel = () => {
    setExcelOpen(false);
  };



  return (
    <Page title="Dashboard: Products ">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Products</Typography>
        </Box>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={12} md={12}>
            <UserManagment/>
          </Grid>
        </Grid>
        <CreateProduct open={open}onClose={handleClickClose} />
        <AddMenu open={excelOpen} onClose={handleClickCloseExcel} />
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon color="secondary" />}
        >
          <SpeedDialAction
            key="Add Product"
            icon={<AddCircleOutlineIcon />}
            tooltipTitle="Add Product"
            onClick={handleClickOpen}
          />
          <SpeedDialAction
            key="Upload Excel Sheet"
            icon={<UploadFileIcon />}
            tooltipTitle="Upload Excel Sheet"
            onClick={handleClickOpenExcel}
          />
        </SpeedDial>
      </Container>
    </Page>
  );
}
