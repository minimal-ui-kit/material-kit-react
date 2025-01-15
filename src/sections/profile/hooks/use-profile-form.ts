import * as Yup from 'yup';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useUser } from 'src/contexts/user-context';
import { useLoading } from "src/contexts/loading-context";
import { useUnsavedChanges } from "src/contexts/unsaved-changes-context";

export const useProfileForm = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useUser();
  const { showLoading, hideLoading } = useLoading();
  const { setHasUnsavedChanges } = useUnsavedChanges();

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
      showLoading();
      
      try {
        setStatus(null);
        setSubmitting(true);

        const updatedFields: Partial<typeof user> = {};

        if (values.firstName !== user?.firstName) updatedFields.firstName = values.firstName;
        if (values.lastName !== user?.lastName) updatedFields.lastName = values.lastName;
        if (values.email !== user?.email) updatedFields.email = values.email;
        if (values.phone !== user?.phone) updatedFields.phone = values.phone;

        await updateUser(updatedFields);
        setStatus({ success: t('profile:success') });
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error('Form submission error:', error);
        setStatus({ error: t('profile:error.update') });
      } finally {
        hideLoading();
        setSubmitting(false);
      }
    },
  });

  // Form değişikliklerini takip et
  useEffect(() => {
    const hasChanges = Object.keys(formik.values).some((key) => {
      const value = formik.values[key as keyof typeof formik.values];
      const initialValue = formik.initialValues[key as keyof typeof formik.initialValues];
      return value !== initialValue;
    });

    setHasUnsavedChanges(hasChanges);
  }, [formik.values, formik.initialValues, setHasUnsavedChanges, formik]);

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