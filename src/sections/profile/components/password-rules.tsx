import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PASSWORD_RULES } from 'src/utils/validators';
import { Iconify } from 'src/components/iconify';

// Şifre kuralları kontrolü için yardımcı fonksiyon
const checkPasswordRule = (password: string, rule: (pass: string) => boolean): boolean => {
  if (!password) return false;
  return rule(password);
};

interface PasswordRulesProps {
  password: string;
}

export function PasswordRules({ password }: PasswordRulesProps) {
  const { t } = useTranslation();
  
  const rules = [
    {
      check: (pass: string) => pass.length >= PASSWORD_RULES.minLength,
      text: t('validation:password.min', { length: PASSWORD_RULES.minLength })
    },
    {
      check: (pass: string) => /[A-Z]/.test(pass),
      text: t('validation:password.uppercase')
    },
    {
      check: (pass: string) => /[a-z]/.test(pass),
      text: t('validation:password.lowercase')
    },
    {
      check: (pass: string) => /\d/.test(pass),
      text: t('validation:password.number')
    },
    {
      check: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      text: t('validation:password.special')
    }
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
        {t('profile:security.passwordRules')}:
      </Typography>
      <Stack spacing={1}>
        {rules.map((rule, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            {checkPasswordRule(password, rule.check) ? (
              <Iconify icon="mdi:check-circle-outline" width={16} color="success.main" />
            ) : (
              <Iconify icon="mdi:radio-button-unchecked" width={16} sx={{ color: 'text.disabled' }} />
            )}
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {rule.text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
} 