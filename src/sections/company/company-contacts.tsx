import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  Grid,
  Table,
  Alert,
  Stack,
  Button,
  Dialog,
  Divider,
  TableRow,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

interface Contact {
  id: number;
  name: string;
  position: string;
  department: string;
  phone: string;
  email: string;
}

interface CompanyContactsProps {
  companyId?: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Ad Soyad zorunludur'),
  position: Yup.string().required('Pozisyon zorunludur'),
  department: Yup.string().required('Departman zorunludur'),
  phone: Yup.string().required('Telefon zorunludur'),
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
});

export function CompanyContacts({ companyId }: CompanyContactsProps) {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      position: 'Operasyon Müdürü',
      department: 'Operasyon',
      phone: '0532 555 44 33',
      email: 'ahmet.yilmaz@abclojistik.com',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const formik = useFormik({
    initialValues: {
      name: '',
      position: '',
      department: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values: any, { resetForm }: { resetForm: () => void }) => {
      try {
        if (editingId) {
          setContacts(contacts.map(contact =>
              contact.id === editingId
                  ? { ...contact, ...values }
                  : contact
          ));
          setSnackbar({
            open: true,
            message: t('Kişi başarıyla güncellendi'),
            severity: 'success',
          });
        } else {
          setContacts([...contacts, { id: contacts.length + 1, ...values }]);
          setSnackbar({
            open: true,
            message: t('Kişi başarıyla eklendi'),
            severity: 'success',
          });
        }
        handleCloseDialog();
        resetForm();
      } catch (error) {
        setSnackbar({
          open: true,
          message: t('Bir hata oluştu'),
          severity: 'error',
        });
      }
    },
  });

  const handleOpenDialog = (contact?: Contact) => {
    if (contact) {
      setEditingId(contact.id);
      formik.setValues({
        name: contact.name,
        position: contact.position,
        department: contact.department,
        phone: contact.phone,
        email: contact.email,
      });
    } else {
      setEditingId(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    formik.resetForm();
  };

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setSnackbar({
      open: true,
      message: t('Kişi başarıyla silindi'),
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
      <>
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
            <Typography variant="h6">
              {t('İletişim Kişileri')}
            </Typography>
            <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => handleOpenDialog()}
            >
              {t('Yeni Kişi')}
            </Button>
          </Stack>

          <Divider />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset', minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('Ad Soyad')}</TableCell>
                    <TableCell>{t('Departman')}</TableCell>
                    <TableCell>{t('İletişim')}</TableCell>
                    <TableCell align="right">{t('İşlemler')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact) => (
                      <TableRow key={contact.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 1,
                                  bgcolor: 'primary.lighter',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                            >
                              <Iconify icon="solar:user-bold" sx={{ color: 'primary.main', width: 20, height: 20 }} />
                            </Box>
                            <Box>
                              {contact.name}
                              <Label
                                  variant="soft"
                                  color="default"
                                  sx={{ ml: 1, textTransform: 'capitalize' }}
                              >
                                {contact.position}
                              </Label>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{contact.department}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {contact.phone}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {contact.email}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" onClick={() => handleOpenDialog(contact)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(contact.id)}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
        >
          <DialogTitle>
            {editingId ? t('Kişi Düzenle') : t('Yeni Kişi Ekle')}
          </DialogTitle>

          <DialogContent dividers>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      label={t('Ad Soyad')}
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label={t('Pozisyon')}
                      name="position"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.position && Boolean(formik.errors.position)}
                      helperText={formik.touched.position && formik.errors.position}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label={t('Departman')}
                      name="department"
                      value={formik.values.department}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.department && Boolean(formik.errors.department)}
                      helperText={formik.touched.department && formik.errors.department}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label={t('Telefon')}
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      fullWidth
                      label={t('E-posta')}
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleCloseDialog}>
              {t('İptal')}
            </Button>
            <Button variant="contained" onClick={() => formik.handleSubmit()}>
              {editingId ? t('Güncelle') : t('Ekle')}
            </Button>
          </DialogActions>
        </Dialog>

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
      </>
  );
}