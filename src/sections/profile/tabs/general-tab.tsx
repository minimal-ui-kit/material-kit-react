import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Alert,
  Stack,
  Button,
  Select,
  Divider,
  MenuItem,
  TextField,
  InputAdornment,

} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { useProfileForm } from '../hooks/use-profile-form';

const COUNTRY_CODES = [
  { code: '+90', country: 'TR', flag: '🇹🇷' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
] as const;

export function GeneralTab() {
  const { t } = useTranslation(['profile', 'validation', 'common']);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    status,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    handlePhoneChange,
  } = useProfileForm();

  return (
    <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ px: 3 }}>
          {status?.error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {t('error.update')}
            </Alert>
          )}

          {status?.success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('success')}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              name="firstName"
              label={t('name')}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              InputProps={{
                startAdornment: (
                  <Iconify
                    icon="solar:user-bold"
                    width={24}
                    sx={{ color: 'text.disabled', mr: 1 }}
                  />
                ),
              }}
            />

            <TextField
              fullWidth
              name="lastName"
              label={t('lastName')}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              InputProps={{
                startAdornment: (
                  <Iconify
                    icon="solar:user-bold"
                    width={24}
                    sx={{ color: 'text.disabled', mr: 1 }}
                  />
                ),
              }}
            />
          </Stack>

          <TextField
            fullWidth
            name="email"
            label={t('email')}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <Iconify icon="solar:mail-bold" width={24} sx={{ color: 'text.disabled', mr: 1 }} />
              ),
            }}
          />

          <TextField
            fullWidth
            name="phone"
            label={t('phone')}
            value={values.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
            placeholder={t('phoneFormat')}
            inputProps={{
              maxLength: 15,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Select
                      value={values.countryCode}
                      onChange={(e) => setFieldValue('countryCode', e.target.value)}
                      sx={{
                        minWidth: 100,
                        '& .MuiSelect-select': {
                          py: 1,
                          pr: '24px !important',
                          pl: 1,
                        },
                        '&:before, &:after': { display: 'none' },
                        '& fieldset': { display: 'none' },
                      }}
                    >
                      {COUNTRY_CODES.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box component="span" sx={{ fontSize: 16 }}>
                              {item.flag}
                            </Box>
                            <Box component="span" sx={{ fontSize: 14, fontWeight: 500 }}>
                              {item.country}
                            </Box>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                    <Divider orientation="vertical" flexItem />
                    <Iconify icon="solar:phone-bold" width={24} sx={{ color: 'text.disabled' }} />
                  </Stack>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            name="about"
            label={t('about')}
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.about && Boolean(errors.about)}
            helperText={touched.about && errors.about}
            placeholder={t('aboutPlaceholder')}
            InputProps={{
              startAdornment: (
                <Iconify
                  icon="solar:notebook-bold"
                  width={24}
                  sx={{
                    color: 'text.disabled',
                    mr: 1,
                    alignSelf: 'flex-start',
                    mt: 1,
                  }}
                />
              ),
            }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => resetForm()}
              startIcon={<Iconify icon="solar:refresh-bold" />}
              sx={{
                borderColor: 'text.disabled',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {t('reset')}
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              startIcon={<Iconify icon="solar:disk-bold" />}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 3,
              }}
            >
              {t('save')}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
  );
}
