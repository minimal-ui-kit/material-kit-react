import { Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { Status, statusValues } from '../../sections/products-v2/etsy/etsy-api.types.ts';
import Iconify from '../iconify';

interface MultiselectProps {
  items: string[];
  onStatusesChange: (event: unknown, newStatuses: Status[]) => void;
}
const MultiSelect = ({ items, onStatusesChange }: MultiselectProps) => {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Autocomplete
      sx={{ width: 300 }}
      multiple
      options={statusValues}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Status" />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option}
          value={option}
          sx={{ justifyContent: 'space-between' }}
        >
          <span>{option}</span>
          {selected ? <Iconify icon="eva:checkmark-outline" /> : null}
        </MenuItem>
      )}
      value={items}
      onChange={onStatusesChange}
    />
  );
};

export default MultiSelect;
