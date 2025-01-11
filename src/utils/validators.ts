import type { TFunction } from 'i18next';

export const PASSWORD_RULES = {
  minLength: 8,
};

export const validateName = (value: string, t: TFunction): string | undefined => {
  if (!value) {
    return t('validation.required');
  }
  if (value.length < 2) {
    return t('validation.nameMinLength');
  }
  if (value.length > 50) {
    return t('validation.nameMaxLength');
  }
  return undefined;
};

export const validateEmail = (value: string, t: TFunction): string | undefined => {
  if (!value) {
    return t('validation.required');
  }
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return t('validation.invalidEmail');
  }
  return undefined;
};

export const validatePhone = (value: string, t: TFunction): string | undefined => {
  if (!value) {
    return t('validation.required');
  }
  const phoneRegex = /^\(\d{3}\) \d{3} \d{2} \d{2}$/;
  if (!phoneRegex.test(value)) {
    return t('validation.invalidPhone');
  }
  return undefined;
};

export const validatePasswordChange = (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  t: TFunction
): { currentPassword?: string; newPassword?: string; confirmPassword?: string } => {
  const errors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};

  if (!currentPassword) {
    errors.currentPassword = t('validation.required');
  }

  if (!newPassword) {
    errors.newPassword = t('validation.required');
  } else {
    if (newPassword.length < PASSWORD_RULES.minLength) {
      errors.newPassword = t('validation.passwordMinLength', { length: PASSWORD_RULES.minLength });
    }
    if (!/[A-Z]/.test(newPassword)) {
      errors.newPassword = t('validation.passwordRequireUppercase');
    }
    if (!/[a-z]/.test(newPassword)) {
      errors.newPassword = t('validation.passwordRequireLowercase');
    }
    if (!/\d/.test(newPassword)) {
      errors.newPassword = t('validation.passwordRequireNumber');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      errors.newPassword = t('validation.passwordRequireSpecialChar');
    }
  }

  if (!confirmPassword) {
    errors.confirmPassword = t('validation.required');
  } else if (confirmPassword !== newPassword) {
    errors.confirmPassword = t('validation.passwordMismatch');
  }

  return errors;
}; 