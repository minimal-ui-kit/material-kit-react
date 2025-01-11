import type React from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { validatePasswordChange } from 'src/utils/validators';

interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const usePasswordForm = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState<PasswordFormErrors>({});

  const validateForm = (): boolean => {
    const errors = validatePasswordChange(currentPassword, newPassword, confirmPassword, t);
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      // Şifre değiştirme API çağrısı burada yapılacak
      setSuccessMessage(t('profile:security.success'));
    } catch (err) {
      console.error(t('profile:security.error'), err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isSaving,
    successMessage,
    formErrors,
    setFormErrors,
    handleSubmit,
  };
}; 