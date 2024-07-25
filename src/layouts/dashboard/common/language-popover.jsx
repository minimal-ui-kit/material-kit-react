import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LanguagePopover() {
  const [language, setLanguage] = React.useState('uz');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl>
        
        <Select
        
          id="demo-simple-select"
          value={language}
          
          defaultChecked
          onChange={handleChange}
        >
          <MenuItem value="uz">Uz</MenuItem>
          <MenuItem value="en">En</MenuItem>
          <MenuItem value="ru">Ru</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
