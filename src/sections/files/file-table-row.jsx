import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { useRouter } from '../../routes/hooks';

// ----------------------------------------------------------------------

export default function FileTableRow({
  id,
  selected,
  name,
  startDate,
  endDate,
  uploadedRecords,
  jiraUpload,
  username,
  jiraProfile,
  handleClick,
  handleDeleteClick,
  handleUpdateUpload,
}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewButton = () => {
    router.push(`/files/${id}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell align="left">{name}</TableCell>

        <TableCell align="left">{new Date(startDate).toLocaleDateString('en-US')}</TableCell>

        <TableCell align="left">{new Date(endDate).toLocaleDateString('en-US')}</TableCell>

        <TableCell align="center">{uploadedRecords}</TableCell>

        <TableCell align="center">
          <Label color={(jiraUpload === 'none' && 'error') || 'success'}>{jiraUpload}</Label>
        </TableCell>
        <TableCell align="center">{username}</TableCell>

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
          sx: { width: 300 },
        }}
      >
        <MenuItem onClick={handleViewButton} sx={{ color: 'success.main' }}>
          <Iconify icon="ic:baseline-pageview" sx={{ mr: 2 }} />
          View WBS
        </MenuItem>
        <MenuItem onClick={() => handleUpdateUpload(id)} sx={{ color: 'primary.main' }}>
          <Iconify icon="solar:upload-bold-duotone" sx={{ mr: 2 }} />
          Upload updated WBS
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

FileTableRow.propTypes = {
  id: PropTypes.string,
  jiraUpload: PropTypes.string,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  uploadedRecords: PropTypes.any,
  name: PropTypes.any,
  username: PropTypes.string,
  jiraProfile: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  handleDeleteClick: PropTypes.func,
  handleUpdateUpload: PropTypes.func,
};
