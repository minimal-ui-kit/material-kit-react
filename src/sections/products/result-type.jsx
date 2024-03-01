import { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import { Container, Select,FormControl,InputLabel,Button,MenuItem,Stack } from '@mui/material';

import { useRouter } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export default function Screen1() {
    const router =useRouter();
    const [type,setType]=useState("");

    const handleChange = (event) => {
        setType(event.target.value);
      };
      const handleSubmit = (event) => {

        router.replace(type);
      };
    
  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Select Result Type: </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Result Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChange}
            >
                <MenuItem value="football">Football</MenuItem>
                <MenuItem value="cricket">Cricket</MenuItem>
                <MenuItem value="athletics">Athletics</MenuItem>
            </Select>
        </FormControl>
        </Stack>
        <Button onClick={handleSubmit} variant="contained" color="inherit" >
          Next
        </Button>
       
    </Container>
  );
}