import type { ContactPerson } from 'src/services/company/company-service.type';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

// Mock data - gerçek uygulamada API'den gelecek
const MOCK_CONTACTS: ContactPerson[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Ahmet Yılmaz',
    position: 'Operasyon Müdürü',
    department: 'Operasyon',
    phone: '05301234567',
    mobile: '05301234567',
    email: 'ahmet@abclojistik.com',
    isMainContact: true,
    availability: {
      workHours: '09:00-18:00',
      timezone: 'Europe/Istanbul',
      preferredContactMethod: 'PHONE',
    },
  },
  {
    id: '2',
    companyId: '1',
    name: 'Ayşe Demir',
    position: 'Muhasebe Müdürü',
    department: 'Finans',
    phone: '05307654321',
    mobile: '05307654321',
    email: 'ayse@abclojistik.com',
    isMainContact: false,
    availability: {
      workHours: '09:00-18:00',
      timezone: 'Europe/Istanbul',
      preferredContactMethod: 'EMAIL',
    },
  },
];

interface ContactListProps {
  id?: string;
}

export function ContactList({ id }: ContactListProps) {
  const { t } = useTranslation('business');
  const [contacts] = useState<ContactPerson[]>(MOCK_CONTACTS);

  const handleEdit = (contactId: string) => {
    console.log('Edit contact:', contactId);
  };

  const handleDelete = (contactId: string) => {
    console.log('Delete contact:', contactId);
  };

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
        <Typography variant="h6">{t('partners.sections.contacts')}</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="solar:add-square-bold-duotone" />}
        >
          {t('partners.contacts.new')}
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" noWrap>
                        {contact.name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {contact.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" noWrap>
                      {contact.position}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {contact.department}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      size="small"
                      label={contact.availability.workHours}
                      sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) }}
                    />
                    <Chip
                      size="small"
                      label={t(`partners.contacts.contactMethod.${contact.availability.preferredContactMethod.toLowerCase()}`)}
                      sx={{ bgcolor: (theme) => alpha(theme.palette.info.main, 0.08) }}
                    />
                    {contact.isMainContact && (
                      <Chip
                        size="small"
                        label={t('partners.contacts.mainContact')}
                        sx={{ bgcolor: (theme) => alpha(theme.palette.success.main, 0.08) }}
                      />
                    )}
                  </Stack>
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('partners.edit')}>
                      <IconButton onClick={() => handleEdit(contact.id)}>
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={t('partners.delete')}>
                      <IconButton onClick={() => handleDelete(contact.id)} color="error">
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
} 