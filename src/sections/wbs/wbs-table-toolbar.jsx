import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import MultipleSelectChip from '../../components/multi-select';

// ----------------------------------------------------------------------

export default function WbsTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  wbsData,
  wbsFilteredData,
  onWbsFilteredData,
  onFilterClear,
  onUploadClick,
  disableUpload,
}) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
          <OutlinedInput
            sx={{ marginRight: '16px', height: 'auto' }}
            value={filterName}
            onChange={onFilterName}
            placeholder="Search WBS Item..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
          <MultipleSelectChip
            data={wbsData}
            filteredData={wbsFilteredData}
            onFilteredData={onWbsFilteredData}
          />
          {/* <OutlinedInput */}
          {/*  value={filterName} */}
          {/*  onChange={onFilterName} */}
          {/*  placeholder="Search WBS Item..." */}
          {/*  startAdornment={ */}
          {/*    <InputAdornment position="start"> */}
          {/*      <Iconify */}
          {/*        icon="eva:search-fill" */}
          {/*        sx={{ color: 'text.disabled', width: 20, height: 20 }} */}
          {/*      /> */}
          {/*    </InputAdornment> */}
          {/*  } */}
          {/* /> */}
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title={
            disableUpload
              ? 'You must setup the project via JIRA Projects'
              : 'Upload Tickets on Jira'
          }
          disableFocusListener={!disableUpload}
          disableTouchListener={!disableUpload}
        >
          <span>
            <Button
              disabled={disableUpload}
              onClick={onUploadClick}
              startIcon={<Iconify icon="simple-icons:jira" />}
            >
              Upload
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Clear Filtered Result">
          <IconButton onClick={onFilterClear}>
            <Iconify icon="ic:twotone-layers-clear" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

WbsTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  wbsData: PropTypes.array,
  wbsFilteredData: PropTypes.array,
  onWbsFilteredData: PropTypes.array,
  onFilterClear: PropTypes.func,
  onUploadClick: PropTypes.func,
  disableUpload: PropTypes.bool,
};
