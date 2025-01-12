import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function BackButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button
      color="inherit"
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      sx={{ mb: 3 }}
    >
      {t('common:back')}
    </Button>
  );
} 