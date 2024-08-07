import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectCompany = () => {
  const [value, setValue] = useState('');
  const [companyRole, setCompanyRole] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    if (value === '') {
      alert('Iltimos, biror kompaniya rolini tanlang.');
    } else {
      const selectedRole = companyRole.find((role) => role.id === parseInt(value));
      try {
        await axios.put(
          'https://api.2pay.uz/api/users/company-roles/update',
          {
            current_company: selectedRole.company?.id,
            role: selectedRole.role?.id,
          },
          {
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
            },
          }
        );
        navigate('/'); // Navigate to the home page
      } catch (error) {
        console.error(error);
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    }
  };

  useEffect(() => {
    const getDeviceStatus = async () => {
      try {
        const response = await axios.get('https://api.2pay.uz/api/users/company-roles/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          },
        });
        setCompanyRole(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getDeviceStatus();
  }, []);

  return (
    <Box
      sx={{
        minWidth: 275,
        display: 'flex',
        height: '80vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3">Kompaniya rolini tanlang</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {companyRole.map((item) => (
            <FormControlLabel
              sx={{ mt: 2 }}
              key={item.id}
              value={item.id.toString()}
              control={<Radio />}
              label={
                <span>
                  <Typography variant="h5">{item.company.name}</Typography>
                  <Typography variant="subtitle1">{item.role?.name}</Typography>
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={handleClick} sx={{ mt: 2 }}>
        Davom etish
      </Button>
    </Box>
  );
};

export default SelectCompany;