import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  TextField,
  inputLabelClasses,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
// mock
import { Individual, Organisation, Operator, Billing, Installation, Proof } from '../layouts/user/inputname';

export default function AddUser() {
  const [mapdata, setmapdata] = useState('Individual');
  const [DropdownData, setDropdownData] = useState([]);
  const [Individualdata, setIndividualdata] = useState([{}]);
  const [Organisationdata, setOrganisationdata] = useState([{}]);
  const [Operatordata, setOperatordata] = useState([{}]);
  const [Billingdata, setBillingdata] = useState([{}]);
  const [Installationdata, setInstallationdata] = useState([{}]);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Create a new user
          </Typography>
        </Stack>
        <Breadcrumbs aria-label="breadcrumb" separator="•">
          <Button underline="hover" color="inherit" component={RouterLink} to={'/dashboard/app'}>
            Dashboard
          </Button>
          <Button underline="hover" color="inherit" component={RouterLink} to={'/dashboard/user'}>
            User
          </Button>
          <Button underline="hover" color="inherit">
            New user
          </Button>
        </Breadcrumbs>
        <RadioGroup defaultValue="Individual" sx={{ flexDirection: 'row' }} onClick={(e) => setmapdata(e.target.value)}>
          <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
          <FormControlLabel value="Organisation" control={<Radio />} label="Organisation" />
        </RadioGroup>
        <Scrollbar>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ padding: 4 }}>
                <Grid style={{ display: 'flex' }} container spacing={2}>
                  <Grid style={{ display: 'flex' }} container spacing={2}>
                    {mapdata === 'Individual'
                      ? Individual.map((item) => {
                          const handleChange = (event) => {
                            const {
                              target: { value },
                            } = event;
                            setDropdownData(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value
                            );
                          };
                          if (!item.Data) {
                            return (
                              <Grid item xs={12} md={2} sm={4}>
                                {' '}
                                <TextField
                                  id="outlined-basic"
                                  label={item.title}
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: '100%' }}
                                  type={item.Type}
                                  defaultValue={item.defaultValue}
                                  InputLabelProps={{
                                    min: '2019-01-24',
                                    max: '2020-05-31',

                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                  onChange={(e) =>
                                    setIndividualdata({ ...Individualdata, [item.userInput]: e.target.value })
                                  }
                                />
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} md={2} sm={4}>
                              <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                                  {item.title}
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-name-label"
                                  id="demo-multiple-name"
                                  multiple
                                  value={DropdownData}
                                  onChange={handleChange}
                                  input={<OutlinedInput label={item.title} />}
                                  size="small"
                                  InputLabelProps={{
                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                >
                                  {item.Data
                                    ? item.Data.map((name) => (
                                        <MenuItem
                                          key={name.value}
                                          value={name.value}
                                          InputLabelProps={{
                                            sx: {
                                              color: '#919EAB',
                                              [`&.${inputLabelClasses.shrink}`]: {
                                                color: 'black',
                                              },
                                              fontSize: 14,
                                            },
                                          }}
                                        >
                                          {name.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                          );
                        })
                      : null}
                    {mapdata === 'Organisation'
                      ? Organisation.map((item) => {
                          const handleChange = (event) => {
                            const {
                              target: { value },
                            } = event;
                            setDropdownData(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value
                            );
                          };
                          if (!item.Data) {
                            return (
                              <Grid item xs={12} md={2} sm={4}>
                                {' '}
                                <TextField
                                  id="outlined-basic"
                                  label={item.title}
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: '100%' }}
                                  type={item.Type}
                                  defaultValue={item.defaultValue}
                                  InputLabelProps={{
                                    min: '2019-01-24',
                                    max: '2020-05-31',

                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                  onChange={(e) =>
                                    setOrganisationdata({ ...Organisationdata, [item.userInput]: e.target.value })
                                  }
                                />
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} md={2} sm={4}>
                              <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                                  {item.title}
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-name-label"
                                  id="demo-multiple-name"
                                  multiple
                                  value={DropdownData}
                                  onChange={handleChange}
                                  input={<OutlinedInput label={item.title} />}
                                  size="small"
                                  InputLabelProps={{
                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                >
                                  {item.Data
                                    ? item.Data.map((name) => (
                                        <MenuItem
                                          key={name.value}
                                          value={name.value}
                                          InputLabelProps={{
                                            sx: {
                                              color: '#919EAB',
                                              [`&.${inputLabelClasses.shrink}`]: {
                                                color: 'black',
                                              },
                                              fontSize: 14,
                                            },
                                          }}
                                        >
                                          {name.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                          );
                        })
                      : null}
                  </Grid>
                  <Grid style={{ display: 'flex', marginTop: 1 }} container spacing={2}>
                    <Grid item xs={4}>
                      <Card
                        sx={{
                          padding: 1.2,
                          backgroundColor: '#3F80DC',
                        }}
                      >
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>Operator Information</Typography>
                      </Card>
                      <Grid style={{ display: 'flex' }} container spacing={2}>
                        {Operator.map((item) => {
                          const handleChange = (event) => {
                            const {
                              target: { value },
                            } = event;
                            setDropdownData(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value
                            );
                          };
                          if (!item.Data) {
                            return (
                              <Grid item xs={12} md={6} sm={12}>
                                <TextField
                                  id="outlined-basic"
                                  label={item.title}
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: '100%', marginTop: 1 }}
                                  type={item.Type}
                                  defaultValue={item.defaultValue}
                                  onChange={(e) =>
                                    setOperatordata({ ...Operatordata, [item.userInput]: e.target.value })
                                  }
                                  InputLabelProps={{
                                    min: '2019-01-24',
                                    max: '2020-05-31',

                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} md={6} sm={12}>
                              <FormControl sx={{ width: '100%', marginTop: 1 }}>
                                <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                                  {item.title}
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-name-label"
                                  id="demo-multiple-name"
                                  multiple
                                  value={DropdownData}
                                  onChange={handleChange}
                                  input={<OutlinedInput label={item.title} />}
                                  size="small"
                                  InputLabelProps={{
                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                >
                                  {item.Data
                                    ? item.Data.map((name) => (
                                        <MenuItem
                                          key={name.value}
                                          value={name.value}
                                          InputLabelProps={{
                                            sx: {
                                              color: '#919EAB',
                                              [`&.${inputLabelClasses.shrink}`]: {
                                                color: 'black',
                                              },
                                              fontSize: 14,
                                            },
                                          }}
                                        >
                                          {name.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>

                    <Grid item xs={4}>
                      <Card
                        sx={{
                          padding: 1.2,
                          backgroundColor: '#3F80DC',
                        }}
                      >
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>Billing Address Information</Typography>
                      </Card>
                      <Grid style={{ display: 'flex' }} container spacing={2}>
                        {Billing.map((item) => {
                          const handleChange = (event) => {
                            const {
                              target: { value },
                            } = event;
                            setDropdownData(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value
                            );
                          };
                          if (!item.Data) {
                            return (
                              <Grid item xs={12} md={6} sm={12}>
                                <TextField
                                  id="outlined-basic"
                                  label={item.title}
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: '100%', marginTop: 1 }}
                                  type={item.Type}
                                  defaultValue={item.defaultValue}
                                  onChange={(e) => setBillingdata({ ...Billingdata, [item.userInput]: e.target.value })}
                                  InputLabelProps={{
                                    min: '2019-01-24',
                                    max: '2020-05-31',

                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} md={6} sm={12}>
                              <FormControl sx={{ width: '100%', marginTop: 1 }}>
                                <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                                  {item.title}
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-name-label"
                                  id="demo-multiple-name"
                                  multiple
                                  value={DropdownData}
                                  onChange={handleChange}
                                  input={<OutlinedInput label={item.title} />}
                                  size="small"
                                  InputLabelProps={{
                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                >
                                  {item.Data
                                    ? item.Data.map((name) => (
                                        <MenuItem
                                          key={name.value}
                                          value={name.value}
                                          InputLabelProps={{
                                            sx: {
                                              color: '#919EAB',
                                              [`&.${inputLabelClasses.shrink}`]: {
                                                color: 'black',
                                              },
                                              fontSize: 14,
                                            },
                                          }}
                                        >
                                          {name.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Card
                        sx={{
                          padding: 1.2,
                          backgroundColor: '#3F80DC',
                        }}
                      >
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                          Installation Address Information
                        </Typography>
                      </Card>
                      <Grid style={{ display: 'flex' }} container spacing={2}>
                        {Installation.map((item) => {
                          const handleChange = (event) => {
                            const {
                              target: { value },
                            } = event;
                            setDropdownData(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value
                            );
                          };
                          if (!item.Data) {
                            return (
                              <Grid item xs={12} md={6} sm={12}>
                                <TextField
                                  id="outlined-basic"
                                  label={item.title}
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: '100%', marginTop: 1 }}
                                  type={item.Type}
                                  defaultValue={item.defaultValue}
                                  onChange={(e) =>
                                    setInstallationdata({ ...Installationdata, [item.userInput]: e.target.value })
                                  }
                                  InputLabelProps={{
                                    min: '2019-01-24',
                                    max: '2020-05-31',

                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                />
                              </Grid>
                            );
                          }

                          return (
                            <Grid item xs={12} md={6} sm={12}>
                              <FormControl sx={{ width: '100%', marginTop: 1 }}>
                                <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                                  {item.title}
                                </InputLabel>
                                <Select
                                  labelId="demo-multiple-name-label"
                                  id="demo-multiple-name"
                                  multiple
                                  value={DropdownData}
                                  onChange={handleChange}
                                  input={<OutlinedInput label={item.title} />}
                                  size="small"
                                  InputLabelProps={{
                                    sx: {
                                      color: '#919EAB',
                                      [`&.${inputLabelClasses.shrink}`]: {
                                        color: 'black',
                                      },
                                      fontSize: 14,
                                    },
                                  }}
                                >
                                  {item.Data
                                    ? item.Data.map((name) => (
                                        <MenuItem
                                          key={name.value}
                                          value={name.value}
                                          InputLabelProps={{
                                            sx: {
                                              color: '#919EAB',
                                              [`&.${inputLabelClasses.shrink}`]: {
                                                color: 'black',
                                              },
                                              fontSize: 14,
                                            },
                                          }}
                                        >
                                          {name.value}
                                        </MenuItem>
                                      ))
                                    : null}
                                </Select>
                              </FormControl>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      padding: 1.2,
                      backgroundColor: '#3F80DC',
                      marginTop: 1,
                    }}
                  >
                    <Typography sx={{ color: '#fff', fontWeight: 600 }}>Upload Documents</Typography>
                  </Card>
                  <Grid style={{ display: 'flex' }} container spacing={2}>
                    {Proof.map((item) => {
                      const handleChange = (event) => {
                        const {
                          target: { value },
                        } = event;
                        setDropdownData(
                          // On autofill we get a stringified value.
                          typeof value === 'string' ? value.split(',') : value
                        );
                      };
                      return (
                        <Grid item xs={12} md={4} sm={12}>
                          <FormControl sx={{ width: '100%', marginTop: 1 }}>
                            <InputLabel id="demo-multiple-name-label" size="small" sx={{ fontSize: 14 }}>
                              {item.title}
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              value={DropdownData}
                              onChange={handleChange}
                              input={<OutlinedInput label={item.title} />}
                              size="small"
                              InputLabelProps={{
                                sx: {
                                  color: '#919EAB',
                                  [`&.${inputLabelClasses.shrink}`]: {
                                    color: 'black',
                                  },
                                  fontSize: 14,
                                },
                              }}
                            >
                              {item.Data
                                ? item.Data.map((name) => (
                                    <MenuItem
                                      key={name.value}
                                      value={name.value}
                                      InputLabelProps={{
                                        sx: {
                                          color: '#919EAB',
                                          [`&.${inputLabelClasses.shrink}`]: {
                                            color: 'black',
                                          },
                                          fontSize: 14,
                                        },
                                      }}
                                    >
                                      {name.value}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                            <input
                              type="file"
                              id="myfile"
                              name="myfile"
                              accept="application/pdf,application/vnd.ms-excel"
                              style={{ marginTop: 10 }}
                            />
                          </FormControl>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <Grid item xs={6} />
                  <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'black',
                        '&:hover': {
                          backgroundColor: 'rgb(33, 43, 54)',
                        },
                      }}
                    >
                      Create User
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Scrollbar>
      </Container>
    </>
  );
}
