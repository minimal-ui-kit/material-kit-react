import { Collapse } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useState } from 'react';
import Iconify from 'src/components/iconify';

import MultiSelect from '../../components/multi-select/multi-select.tsx';
import { Status } from './etsy/etsy-api.types.ts';
import { ExpandMore } from './user-table-row.tsx';

// ----------------------------------------------------------------------
interface UserTableToolbarProps {
  numSelected: number;
  filterName: string;
  onFilterName: (event: ChangeEvent<HTMLInputElement>) => void;
  statuses: string[];
  onStatusesChange: (event, newStatuses: Status[]) => void;
}
export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  statuses,
  onStatusesChange,
}: UserTableToolbarProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <Grid container sx={{ width: '100%', py: 2 }}>
        <Grid item xs={11} sx={{ pb: 1 }}>
          {numSelected > 0 ? (
            <Typography component="div" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <OutlinedInput
              value={filterName}
              onChange={onFilterName}
              placeholder="Search receipt by id..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
            />
          )}
        </Grid>

        <Grid item xs={1} alignContent="center" justifyContent="right">
          <Tooltip title="Filter list">
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Iconify icon="ic:round-filter-list" />
            </ExpandMore>
          </Tooltip>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid item xs={2} sx={{ pt: 2 }}>
            <MultiSelect items={statuses} onStatusesChange={onStatusesChange} />
          </Grid>
        </Collapse>
      </Grid>
    </Toolbar>
  );
}
