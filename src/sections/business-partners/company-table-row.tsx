import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

export type CompanyProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'passive';
  verified: boolean;
};

type CompanyTableRowProps = {
  row: CompanyProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function CompanyTableRow({ row, selected, onSelectRow }: CompanyTableRowProps) {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/business-partners/${row.id}`);
  };

  return (
    <TableRow 
      hover 
      tabIndex={-1} 
      role="checkbox" 
      selected={selected}
      onClick={handleNavigateToDetail}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
        <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <Iconify icon="solar:shop-2-bold" sx={{ color: 'primary.main', width: 20, height: 20 }} />
        </Box>
        {row.name}
      </TableCell>

      <TableCell>{row.phone}</TableCell>

      <TableCell>{row.email}</TableCell>

      <TableCell>
        <Chip
          label={row.status === 'active' ? 'Aktif' : 'Pasif'}
          color={row.status === 'active' ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      </TableCell>

      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
        <IconButton 
          color="primary"
          onClick={() => navigate(`/business-partners/${row.id}`)}
        >
          <Iconify icon="solar:pen-bold" />
        </IconButton>
        <IconButton 
          color="error"
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
} 