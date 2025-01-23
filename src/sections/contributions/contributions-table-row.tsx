import type { LabelColor } from 'src/components/label';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import useUser from 'src/hooks/useUser';

import { fDateTime } from 'src/utils/format-time';

import PayService from 'src/services/pay';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type ContributionProps = {
  id: string;
  sender: {
    id: string;
    name: string;
  };
  amount: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'failed';
  months: string[];
  code: string;
};

type ContributionsTableRowProps = {
  row: ContributionProps;
  selected: boolean;
  noSelection?: boolean;
  onSelectRow: () => void;
};

export function ContributionsTableRow({
  row,
  selected,
  noSelection,
  onSelectRow,
}: ContributionsTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { user } = useUser();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const getStatus = (val: ContributionProps['status']): LabelColor => {
    if (val === 'failed') return 'error';
    if (val === 'pending') return 'info';
    return 'success';
  };

  const onResume = (code: string) => {
    PayService.resume(code);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {!noSelection && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
          </TableCell>
        )}

        <TableCell component="th" scope="row">
          <Box display="flex" alignItems="center">
            {row.sender.name}
          </Box>
        </TableCell>

        <TableCell>{row.months.join(', ')}</TableCell>

        <TableCell>{`GHS ${row.amount}`}</TableCell>

        <TableCell>{fDateTime(row.timestamp)}</TableCell>

        <TableCell>
          <Label color={getStatus(row.status)}>{row.status}</Label>
        </TableCell>

        <TableCell>
          <Box flex={1} display="flex" justifyContent="flex-end">
            {row.status === 'pending' && row.sender.id === user?.id ? (
              <Button onClick={() => onResume(row.code)} variant="contained">
                Resume
              </Button>
            ) : (
              ''
            )}
          </Box>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
