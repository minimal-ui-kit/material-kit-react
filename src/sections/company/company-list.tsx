import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Grid,
  Table,
  Stack,
  Button,
  Dialog,
  Divider,
  MenuItem,
  TableBody,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  InputAdornment,
  TablePagination,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { CompanyTableRow } from './company-table-row';
import { CompanyTableHead } from './company-table-head';
import { CompanyTableToolbar } from './company-table-toolbar';

const COMPANY_LIST = [
  {
    id: '1',
    name: 'ABC Lojistik Ltd. Şti.',
    phone: '0212 555 44 33',
    email: 'info@abclojistik.com',
    status: 'active' as const,
    verified: true,
  },
  {
    id: '2',
    name: 'XYZ Taşımacılık A.Ş.',
    phone: '0312 666 55 44',
    email: 'info@xyztasima.com',
    status: 'passive' as const,
    verified: false,
  },
];

const PHONE_REGEX = /^[0-9]{10,11}$/; // 10 veya 11 haneli telefon numarası
const TAX_NUMBER_REGEX = /^[0-9]{10}$/; // 10 haneli vergi numarası
const WEBSITE_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'company.validation.companyNameMin')
    .max(100, 'company.validation.companyNameMax')
    .required('company.validation.companyNameRequired'),
  phone: Yup.string()
    .matches(PHONE_REGEX, 'company.validation.phoneFormat')
    .required('company.validation.phoneRequired'),
  email: Yup.string()
    .email('company.validation.email')
    .required('company.validation.emailRequired'),
  status: Yup.string()
    .oneOf(['active', 'passive'])
    .required('company.validation.statusRequired'),
  taxNumber: Yup.string()
    .matches(TAX_NUMBER_REGEX, 'company.validation.taxNumberFormat')
    .required('company.validation.taxNumberRequired'),
  website: Yup.string()
    .matches(WEBSITE_REGEX, 'company.validation.url')
    .nullable(),
  address: Yup.string()
    .min(10, 'company.validation.addressMin')
    .max(500, 'company.validation.addressMax')
    .required('company.validation.addressRequired'),
  description: Yup.string()
    .max(1000, 'company.validation.descriptionMax'),
});

export function CompanyList() {
  const { t } = useTranslation('company');
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  const TABLE_HEAD = [
    { id: 'name', label: t('company.companyName'), align: 'left' },
    { id: 'phone', label: t('company.phone'), align: 'left' },
    { id: 'email', label: t('company.email'), align: 'left' },
    { id: 'status', label: t('company.status'), align: 'left' },
    { id: 'actions', label: '', align: 'right' },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      status: 'active' as const,
      taxNumber: '',
      website: '',
      address: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // TODO: API call to save data
      console.log('Saving...', values);
      setOpenDialog(false);
      resetForm();
    },
  });

  const handleSort = useCallback((id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  }, [order, orderBy]);

  const handleSelectAllRows = useCallback((checked: boolean) => {
    if (checked) {
      const newSelected = COMPANY_LIST.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, []);

  const handleFilterByName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  }, []);

  const handleSelectRow = useCallback((id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }, [selected]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const filteredCompanies = COMPANY_LIST.filter((company) =>
      company.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4">{t('company.title')}</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenDialog}
          sx={{
            bgcolor: 'black',
            color: 'white',
            '&:hover': { bgcolor: 'black' },
            borderRadius: '8px',
            textTransform: 'none',
            px: 2,
          }}
        >
          {t('company.newCompany')}
        </Button>
      </Box>

      <Card>
        <CompanyTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset', minWidth: 800 }}>
            <Table>
              <CompanyTableHead
                order={order}
                orderBy={orderBy}
                rowCount={COMPANY_LIST.length}
                numSelected={selected.length}
                onSort={handleSort}
                onSelectAllRows={handleSelectAllRows}
                headLabel={TABLE_HEAD}
              />

              <TableBody>
                {filteredCompanies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CompanyTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => handleSelectRow(row.id)}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            page={page}
            component="div"
            count={filteredCompanies.length}
            rowsPerPage={rowsPerPage}
            onPageChange={(_e, newPage) => setPage(newPage)}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={(e) => {
              setPage(0);
              setRowsPerPage(Number(e.target.value));
            }}
          />
        </Box>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="solar:buildings-2-bold-duotone" sx={{ width: 24, height: 24 }} />
            <Typography variant="h6">{t('company.newCompany')}</Typography>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('company.companyName')}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && t(formik.errors.name as string)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:buildings-3-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('company.taxNumber')}
                  name="taxNumber"
                  value={formik.values.taxNumber}
                  onChange={(e) => {
                    // Sadece rakam girişine izin ver
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    formik.setFieldValue('taxNumber', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.taxNumber && Boolean(formik.errors.taxNumber)}
                  helperText={formik.touched.taxNumber && t(formik.errors.taxNumber as string)}
                  inputProps={{
                    maxLength: 10,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:document-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('company.website')}
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && t(formik.errors.website as string)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:link-circle-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('company.phone')}
                  name="phone"
                  value={formik.values.phone}
                  onChange={(e) => {
                    // Sadece rakam girişine izin ver
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    formik.setFieldValue('phone', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && t(formik.errors.phone as string)}
                  inputProps={{
                    maxLength: 11,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:phone-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('company.email')}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && t(formik.errors.email as string)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:letter-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label={t('company.status')}
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && t(formik.errors.status as string)}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: { maxHeight: 240 },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:flag-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="active">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                        }}
                      />
                      {t('company.active')}
                    </Stack>
                  </MenuItem>
                  <MenuItem value="passive">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'error.main',
                        }}
                      />
                      {t('company.passive')}
                    </Stack>
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label={t('company.address')}
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && t(formik.errors.address as string)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:map-point-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label={t('company.description')}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && t(formik.errors.description as string)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:notebook-bold-duotone" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 2.5, gap: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleCloseDialog}
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            sx={{
              borderColor: 'action.hover',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            {t('company.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
            startIcon={<Iconify icon="eva:checkmark-fill" />}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
              px: 3,
            }}
          >
            {t('company.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}