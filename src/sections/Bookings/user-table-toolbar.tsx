import { useState} from 'react';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Iconify } from 'src/components/iconify';
import { red } from '@mui/material/colors';

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStatus: (value: string) => void;
};

export function UserTableToolbar({ numSelected, filterName, onFilterName, onFilterStatus }: UserTableToolbarProps) {
  // Confirm delete pop up will appear after delete button is clicked 
  const [popUp, onPopUp] = useState(false);

  const openPopUp = () => {
	onPopUp(true);
  };

  const closePopUp = () => {
	onPopUp(false);
  };

  // once click confirmed, remove from data 

  // Make filter for subscription status
  const [filter, onFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const openFilter = () => {
	onFilter(true);
  };

  const closeFilter = () => {
	onFilter(false);
  };

  // Once choose filter, filter staff data

  const confirmFilter = () => {
	onFilterStatus(selectedFilter);
	closeFilter();
  }
  
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
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
		<>
			<Tooltip title="Delete">
			<IconButton onClick={openPopUp}>
				<Iconify icon="solar:trash-bin-trash-bold" />
			</IconButton>
			</Tooltip>
				<Dialog
					open={popUp}
					onClose={closePopUp}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						Confirm Delete?
					</DialogTitle>
					<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Once confirmed, all user data can not be recovered. 
					</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button sx={{ color: red[500] }} onClick={closePopUp}>Cancel</Button>
					<Button onClick={closePopUp} autoFocus>
						Confirm
					</Button>
					</DialogActions>
				</Dialog>
		</>
      ) : (
		<Box>
			<Tooltip title="Filter list">
			<IconButton onClick={openFilter}>
				<Iconify icon="ic:round-filter-list" />
			</IconButton>
			</Tooltip>
			<Dialog
					open={filter}
					onClose={closeFilter}
					aria-labelledby="filter-popUp"
					aria-describedby="filter-description"
				>
					<DialogTitle id="filter-title">
						Filter by Status
					</DialogTitle>
					<DialogContent>
					<FormControl component="fieldset" sx={{ mt: 2 }}>
						<RadioGroup
						value={selectedFilter}
						onChange={(event) => setSelectedFilter(event.target.value)}
						>
						<FormControlLabel value="all" control={<Radio />} label="All" />
						<FormControlLabel value="cancelled" control={<Radio />} label="Cancelled" />
						<FormControlLabel value="completed" control={<Radio />} label="Completed" />
						</RadioGroup>
					</FormControl>
					</DialogContent>
					<DialogActions>
					<Button sx={{ color: red[500] }} onClick={closeFilter}>Cancel</Button>
					<Button onClick={confirmFilter} autoFocus>
						Confirm
					</Button>
					</DialogActions>
			</Dialog>
		</Box>
      )}
    </Toolbar>
  );
}
