import type React from "react";

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useUser } from 'src/contexts/user-context';

export const useProfileForm = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('validation:required.firstName'))
      .min(2, t('validation:length.name.min'))
      .max(50, t('validation:length.name.max')),
    lastName: Yup.string()
      .required(t('validation:required.lastName'))
      .min(2, t('validation:length.name.min'))
      .max(50, t('validation:length.name.max')),
    email: Yup.string()
      .required(t('validation:required.email'))
      .email(t('validation:invalid.email')),
    phone: Yup.string()
      .required(t('validation:required.phone'))
      .matches(/^\(\d{3}\) \d{3} \d{2} \d{2}$/, t('validation:invalid.phone')),
    about: Yup.string()
      .max(500, t('validation:length.about.max')),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      about: '',
      countryCode: '+90',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(null);

        // Sadece değişen alanları gönder
        const updatedFields: Partial<typeof user> = {};

        if (values.firstName !== user?.firstName) updatedFields.firstName = values.firstName;
        if (values.lastName !== user?.lastName) updatedFields.lastName = values.lastName;
        if (values.email !== user?.email) updatedFields.email = values.email;
        if (values.phone !== user?.phone) updatedFields.phone = values.phone;

        await updateUser(updatedFields);
        setStatus({ success: t('profile:success') });
      } catch (error) {
        setStatus({ error: t('profile:error.update') });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    let formatted = '';
    if (numbersOnly.length > 0) formatted += '(';
    if (numbersOnly.length > 0) formatted += numbersOnly.substring(0, 3);
    if (numbersOnly.length > 3) formatted += ') ';
    if (numbersOnly.length > 3) formatted += numbersOnly.substring(3, 6);
    if (numbersOnly.length > 6) formatted += ' ';
    if (numbersOnly.length > 6) formatted += numbersOnly.substring(6, 8);
    if (numbersOnly.length > 8) formatted += ' ';
    if (numbersOnly.length > 8) formatted += numbersOnly.substring(8, 10);
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    formik.setFieldValue('phone', formatted);
  };

  return {
    ...formik,
    handlePhoneChange,
  };
};