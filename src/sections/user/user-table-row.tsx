import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { useRouter } from 'src/routes/hooks';

import useUser from 'src/hooks/useUser';

import { fCurrency } from 'src/utils/format-number';

import UserService from 'src/services/user';
import { UserRole } from 'src/services/user/user.dto';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  email: string;
  pledge: number;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [updating, setUpdating] = useState(false);
  const { refresh } = useRouter();

  const user = useUser();

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const onClick = useCallback(
    async (val: 'makeAdmin' | 'delete') => {
      setOpenPopover(null);
      if (val === 'makeAdmin') {
        setUpdating(true);
        const userData = await UserService.get(row.id);
        if (userData) {
          const { role } = userData;
          if (!role.includes(UserRole.Admin)) {
            await UserService.update(row.id, { role: [...role, UserRole.Admin] });
          }
        }
      }
      refresh();
      setUpdating(false);
    },
    [row.id, refresh]
  );

  return (
    <>
      <TableRow hover tabIndex={-1}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}

        <TableCell scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} />
            {row.name} {row.email === user.user?.email ? '(You)' : ''}
          </Box>
        </TableCell>

        <TableCell>{row.role}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{`${fCurrency(row.pledge)}`}</TableCell>

        {/* <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          {updating ? (
            <CircularProgress thickness={10} size={14} />
          ) : (
            !row.role.includes(UserRole.Admin) && (
              <IconButton onClick={handleOpenPopover}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            )
          )}
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
          {!row.role.includes(UserRole.Admin) && (
            <MenuItem onClick={() => onClick('makeAdmin')}>
              <Iconify icon="solar:user-bold-duotone" />
              Make Admin
            </MenuItem>
          )}

          {/* TODO: Implement delete for collection and auth */}
          {/* <MenuItem onClick={() => onClick('delete')} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem> */}
        </MenuList>
      </Popover>
    </>
  );
}
