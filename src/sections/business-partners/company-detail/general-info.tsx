import type { CompanyDetails } from 'src/services/company/company-service.type';

import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_COMPANY: CompanyDetails = {
  id: '1',
  name: 'ABC Lojistik Ltd. Şti.',
  type: 'CARRIER',
  taxNumber: '1234567890',
  taxOffice: 'İstanbul',
  phone: '02121234567',
  email: 'info@abclojistik.com',
  website: 'www.abclojistik.com',
  address: 'Ataşehir, İstanbul',
  status: 'active',
  foundedYear: 2010,
  employeeCount: 50,
  certifications: ['ISO 9001', 'TSE'],
  operationAreas: ['Yurtiçi Taşımacılık', 'Depolama'],
  description: 'Türkiye\'nin önde gelen lojistik şirketlerinden biri.',
  insuranceInfo: {
    provider: 'XYZ Sigorta',
    policyNumber: 'POL123',
    coverage: 'Tam Kapsamlı',
    expiryDate: new Date('2024-12-31'),
  },
  bankAccounts: [
    {
      bankName: 'ABC Bank',
      branch: 'İstanbul',
      accountNumber: '12345678',
      iban: 'TR123456789012345678901234',
      currency: 'TRY',
    },
  ],
};

interface InfoItemProps {
  icon: string;
  label: string;
  value?: string | number;
  sx?: object;
}

function InfoItem({ icon, label, value, sx }: InfoItemProps) {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ 
        py: 1,
        ...sx,
      }}
    >
      <Iconify icon={icon} width={24} sx={{ color: 'text.secondary' }} />
      
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        
        <Typography variant="subtitle2">
          {value || '-'}
        </Typography>
      </Stack>
    </Stack>
  );
}

interface GeneralInfoProps {
  id?: string;
}

export function GeneralInfo({ id }: GeneralInfoProps) {
  const { t } = useTranslation('business');

  // Gerçek uygulamada bu veri API'den id'ye göre çekilecek
  const company = MOCK_COMPANY;

  return (
    <Box>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h6">{t('partners.sections.basicInfo')}</Typography>
              <Stack spacing={1}>
                <InfoItem
                  icon="solar:buildings-3-bold-duotone"
                  label={t('partners.companyName')}
                  value={company.name}
                />
                <InfoItem
                  icon="solar:hashtag-square-bold-duotone"
                  label={t('partners.taxNumber')}
                  value={company.taxNumber}
                />
                <InfoItem
                  icon="solar:phone-bold-duotone"
                  label={t('partners.phone')}
                  value={company.phone}
                />
                <InfoItem
                  icon="solar:letter-bold-duotone"
                  label={t('partners.email')}
                  value={company.email}
                />
                <InfoItem
                  icon="solar:global-bold-duotone"
                  label={t('partners.website')}
                  value={company.website}
                />
                <InfoItem
                  icon="solar:map-point-bold-duotone"
                  label={t('partners.address')}
                  value={company.address}
                />
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6">{t('partners.sections.companyDetails')}</Typography>
              <Stack spacing={1}>
                <InfoItem
                  icon="solar:calendar-bold-duotone"
                  label={t('partners.foundedYear')}
                  value={company.foundedYear}
                />
                <InfoItem
                  icon="solar:users-group-rounded-bold-duotone"
                  label={t('partners.employeeCount')}
                  value={company.employeeCount}
                />
                <InfoItem
                  icon="solar:medal-ribbons-star-bold-duotone"
                  label={t('partners.certifications')}
                  value={company.certifications?.join(', ')}
                />
                <InfoItem
                  icon="solar:map-bold-duotone"
                  label={t('partners.operationAreas')}
                  value={company.operationAreas?.join(', ')}
                />
              </Stack>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="h6">{t('partners.sections.insurance')}</Typography>
              <Stack spacing={1}>
                <InfoItem
                  icon="solar:shield-bold-duotone"
                  label={t('partners.insurance.provider')}
                  value={company.insuranceInfo?.provider}
                />
                <InfoItem
                  icon="solar:document-text-bold-duotone"
                  label={t('partners.insurance.policyNumber')}
                  value={company.insuranceInfo?.policyNumber}
                />
                <InfoItem
                  icon="solar:shield-check-bold-duotone"
                  label={t('partners.insurance.coverage')}
                  value={company.insuranceInfo?.coverage}
                />
                <InfoItem
                  icon="solar:calendar-date-bold-duotone"
                  label={t('partners.insurance.expiryDate')}
                  value={company.insuranceInfo?.expiryDate.toLocaleDateString('tr-TR')}
                />
              </Stack>
            </Stack>

            {company.bankAccounts && company.bankAccounts.length > 0 && (
              <Stack spacing={1}>
                <Typography variant="h6">{t('partners.sections.bankAccounts')}</Typography>
                {company.bankAccounts.map((account, index) => (
                  <Card key={index} sx={{ p: 2, bgcolor: 'background.neutral' }}>
                    <Stack spacing={1}>
                      <InfoItem
                        icon="solar:bank-bold-duotone"
                        label={t('partners.bank.name')}
                        value={account.bankName}
                      />
                      <InfoItem
                        icon="solar:buildings-2-bold-duotone"
                        label={t('partners.bank.branch')}
                        value={account.branch}
                      />
                      <InfoItem
                        icon="solar:card-bold-duotone"
                        label={t('partners.bank.accountNumber')}
                        value={account.accountNumber}
                      />
                      <InfoItem
                        icon="solar:money-bag-bold-duotone"
                        label={t('partners.bank.iban')}
                        value={account.iban}
                      />
                      <InfoItem
                        icon="solar:dollar-minimalistic-bold-duotone"
                        label={t('partners.bank.currency')}
                        value={account.currency}
                      />
                    </Stack>
                  </Card>
                ))}
              </Stack>
            )}

            {company.description && (
              <Stack spacing={1}>
                <Typography variant="h6">{t('partners.sections.description')}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {company.description}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
} 