import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import _countries from 'src/_mock/_countries';
import { Iconify } from '../iconify';

function CountrySelect({ label = 'Country', ...props }: SelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="country-label">{label}</InputLabel>
      <Select
        labelId="country-label"
        fullWidth
        label="Country"
        placeholder="Ghana"
        sx={{ display: 'flex' }}
        defaultValue=""
        SelectDisplayProps={{ style: { display: 'flex', gap: 8 } }}
        MenuProps={{ sx: { height: 250 } }}
        {...props}
      >
        {_countries.map((item) => (
          <MenuItem
            sx={{ display: 'flex', gap: 2, justifyItems: 'center', alignItems: 'center' }}
            key={item.code}
            value={item.code}
          >
            <Iconify icon={item.icon} /> {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountrySelect;
