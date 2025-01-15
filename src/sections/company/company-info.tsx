import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Grid,
  Card,
  Stack,
  Alert,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface CompanyData {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  website: string;
  description: string;
}

interface InfoFieldProps {
  icon: string;
  label: string;
  name: keyof CompanyData;
  value: string;
  error?: string;
  touched?: boolean;
  isEditing: boolean;
  multiline?: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({
  icon,
  label,
  name,
  value,
  error,
  touched,
  isEditing,
  multiline = false,
  onChange,
  onBlur,
}) => {
  const { t } = useTranslation();
  
  return (
    <Box>
      {isEditing ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            {label}
          </Typography>
          <TextField
            fullWidth
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={touched && Boolean(error)}
            helperText={touched && error}
            size="small"
            multiline={multiline}
            rows={multiline ? 3 : 1}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
              }
            }}
          />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          sx={{
            py: 2,
            '&:not(:last-child)': {
              borderBottom: '1px dashed',
              borderColor: 'divider',
            }
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              display: 'flex',
              bgcolor: 'background.neutral',
              color: 'text.secondary',
            }}
          >
            <Iconify icon={icon} width={24} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {label}
            </Typography>
            <Typography variant="body2">
              {value || '-'}
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

const validationSchema = Yup.object({
  name: Yup.string().required('Şirket adı zorunludur'),
  taxNumber: Yup.string().required('Vergi numarası zorunludur'),
  phone: Yup.string().required('Telefon zorunludur'),
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
  website: Yup.string().url('Geçerli bir website adresi giriniz'),
  address: Yup.string().required('Adres zorunludur'),
  description: Yup.string(),
});

export function CompanyInfo({ id }: { id?: string }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const formik = useFormik({
    initialValues: {
      id: id || '',
      name: 'ABC Lojistik Ltd. Şti.',
      address: 'Ankara Cad. No:123 İstanbul',
      phone: '0212 555 44 33',
      email: 'info@abclojistik.com',
      taxNumber: '1234567890',
      website: 'www.abclojistik.com',
      description: 'Uluslararası lojistik hizmetleri',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: API call to save data
        console.log('Saving...', values);
        setSnackbar({
          open: true,
          message: t('Şirket bilgileri başarıyla güncellendi'),
          severity: 'success',
        });
        setIsEditing(false);
      } catch (error) {
        setSnackbar({
          open: true,
          message: t('Bir hata oluştu'),
          severity: 'error',
        });
      }
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
        <Typography variant="h6">
          {t('Şirket Bilgileri')}
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={handleEdit}
            size="small"
          >
            {t('Düzenle')}
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Iconify icon="solar:disk-bold" />}
              onClick={() => formik.handleSubmit()}
              size="small"
            >
              {t('Kaydet')}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={handleCancel}
              size="small"
            >
              {t('İptal')}
            </Button>
          </Stack>
        )}
      </Stack>

      <Divider />

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoField
              icon="solar:buildings-3-bold"
              label={t('Şirket Adı')}
              name="name"
              value={formik.values.name}
              error={formik.errors.name}
              touched={formik.touched.name}
              isEditing={isEditing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoField
              icon="solar:document-bold"
              label={t('Vergi Numarası')}
              name="taxNumber"
              value={formik.values.taxNumber}
              error={formik.errors.taxNumber}
              touched={formik.touched.taxNumber}
              isEditing={isEditing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoField
              icon="solar:phone-bold"
              label={t('Telefon')}
              name="phone"
              value={formik.values.phone}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              isEditing={isEditing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoField
              icon="solar:letter-bold"
              label={t('E-posta')}
              name="email"
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              isEditing={isEditing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoField
              icon="solar:globe-bold"
              label={t('Website')}
              name="website"
              value={formik.values.website}
              error={formik.errors.website}
              touched={formik.touched.website}
              isEditing={isEditing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoField
              icon="solar:map-point-bold"
              label={t('Adres')}
              name="address"
              value={formik.values.address}
              error={formik.errors.address}
              touched={formik.touched.address}
              isEditing={isEditing}
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoField
              icon="solar:document-text-bold"
              label={t('Açıklama')}
              name="description"
              value={formik.values.description}
              error={formik.errors.description}
              touched={formik.touched.description}
              isEditing={isEditing}
              multiline
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}