import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export type ContributionProps = {
  id: string;
  sender: {
    id: string;
    name: string;
  };
  amount: string;
  timestamp: string;
  status: 'pending' | 'success' | 'failed';
  months: string[];
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

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

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
          <Label color={(row.status === 'failed' && 'error') || 'success'}>{row.status}</Label>
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
