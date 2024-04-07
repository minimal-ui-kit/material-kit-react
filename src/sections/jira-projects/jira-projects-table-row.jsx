import { useState } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

import Iconify from '../../components/iconify';
import { useRouter } from '../../routes/hooks';

// ----------------------------------------------------------------------

export default function JiraProjectsTableRow({
  id,
  avatarUrl,
  name,
  jKey,
  files,
  handleProjectChange,
}) {
  const [value, setValue] = useState(
    files.find((item) => item?.jiraProject === id)?.jiraProject || ''
  );
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewButton = () => {
    router.push(`/jira-projects/${value}`);
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell>
          <Avatar src={avatarUrl} alt="photoURL" sx={{ width: 35, height: 'auto' }} />
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="center">{jKey}</TableCell>
        <TableCell align="left">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Projects</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Select Project"
              onChange={(event) => {
                const selected = event.target.value;
                console.log(selected);
                if (selected) {
                  handleProjectChange(
                    files.find((item) => item._id === selected || item.jiraProject === selected)
                      ._id,
                    id
                  );
                  setValue(id);
                }
              }}
            >
              {files.map((file) => (
                <MenuItem
                  key={file._id}
                  disabled={file?.jiraProject}
                  name={file.name}
                  value={file?.jiraProject || file._id}
                >
                  {file.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        {value && (
          <TableCell align="center">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={handleViewButton} sx={{ color: 'success.main' }}>
          <Iconify icon="ic:baseline-pageview" sx={{ mr: 2 }} />
          View Project Fields
        </MenuItem>

        {/* <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}> */}
        {/*  <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} /> */}
        {/*  Delete */}
        {/* </MenuItem> */}
      </Popover>
    </>
  );
}

JiraProjectsTableRow.propTypes = {
  id: PropTypes.string,
  avatarUrl: PropTypes.string,
  jKey: PropTypes.string,
  files: PropTypes.array,
  name: PropTypes.string,
  handleProjectChange: PropTypes.func,
};
