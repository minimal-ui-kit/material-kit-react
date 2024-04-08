import { Collapse } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import Iconify from '../../components/iconify';
import Label from '../../components/label';
import { Transaction } from './etsy/etsy-api.types.ts';
import TransactionList from './transaction-list.tsx';

// ----------------------------------------------------------------------
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface UserTableRowProps {
  selected: boolean;
  order: string;
  customer: string;
  date: string;
  items: Transaction[];
  subtotal: number;
  netProfit: number;
  status: string;
  avatarUrl: string;
  handleClick: (event: never) => void;
}
export default function UserTableRow({
  selected,
  order,
  customer,
  date,
  items,
  subtotal,
  netProfit,
  status,
  avatarUrl,
  handleClick,
}: UserTableRowProps) {
  const [open, setOpen] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{order}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={customer} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {customer}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{date}</TableCell>

        {/*<TableCell align="center">{items}</TableCell>*/}
        <TableCell>{`${subtotal} $`}</TableCell>
        <TableCell>{`${netProfit.toFixed(2)} $`}</TableCell>

        <TableCell>
          <Label
            color={
              (status === 'cancelled' && 'error') ||
              (status === 'pending' && 'warning') ||
              'success'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? (
              <Iconify icon={'eva:arrow-ios-upward-outline'} />
            ) : (
              <Iconify icon={'eva:arrow-ios-downward-outline'} />
            )}
          </ExpandMore>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {/*Collapsible section*/}
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={9}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <TransactionList items={items} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
