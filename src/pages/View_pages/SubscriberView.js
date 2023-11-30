import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  Tabs,
  Tab,
  CardMedia,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Transgender,
  ContactEmergency,
  Call,
  Email,
  PermIdentity,
  ArtTrack,
  SupportAgent,
  Details,
} from '@mui/icons-material';

// components
import Scrollbar from '../../components/scrollbar';
// mock
import { UserHeader } from '../../layouts/user/userViewHead';
import SubscriberPack from './SubscriberPack';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: 'black',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'grey',
  marginBottom: -10,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: 'lightgrey',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: 'black',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'black',
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  height: 20,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SubscriberView() {
  const [DropdownData, setDropdownData] = useState([]);
  const [Individualdata, setIndividualdata] = useState([{}]);
  const [Organisationdata, setOrganisationdata] = useState([{}]);
  const [Operatordata, setOperatordata] = useState([{}]);
  const [Billingdata, setBillingdata] = useState([{}]);
  const [Installationdata, setInstallationdata] = useState([{}]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            View Subscriber Details
          </Typography>
        </Stack>
        <Breadcrumbs aria-label="breadcrumb" separator="•" sx={{ marginBottom: 5 }}>
          <Button underline="hover" color="inherit" component={RouterLink} to={'/dashboard/app'}>
            Dashboard
          </Button>
          <Button underline="hover" color="inherit" component={RouterLink} to={'/dashboard/user'}>
            User
          </Button>
          <Button underline="hover" color="inherit">
            View Subscriber
          </Button>
        </Breadcrumbs>
        <Scrollbar>
          <Card sx={{ height: 280 }}>
            {window.innerWidth > 900 ? (
              <>
                <CardMedia component="img" height="230" image="/assets\images\cover/cover_7.jpg" alt="Paella dish" />
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex' }}>
                    <CardMedia
                      component="img"
                      image="/assets\images\avatars/avatar_default.jpg"
                      sx={{
                        height: 120,
                        width: 120,
                        marginTop: -11,
                        borderRadius: 100,
                        marginLeft: 5,
                      }}
                    />
                    <Typography
                      sx={{
                        color: 'white',
                        marginTop: -8,
                        fontSize: 24,
                        fontFamily: 'Public Sans',
                        fontWeight: 800,
                        marginLeft: 3,
                      }}
                    >
                      {UserHeader.SubScriber_Name}
                      <br />
                      <Typography
                        sx={{
                          color: 'lightgray',
                          fontSize: 14,
                          fontFamily: 'Public Sans',
                          fontWeight: 600,
                        }}
                      >
                        {UserHeader.Customer_ID}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: -2 }}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                      <AntTab label="Profile" icon={<ContactEmergency sx={{ height: 15 }} />} iconPosition="start" />
                      <AntTab label="Digital Details" icon={<Details sx={{ height: 15 }} />} iconPosition="start" />
                      <AntTab label="Tab 3" />
                      <AntTab label="Tab 4" />
                      <AntTab label="Tab 5" />
                    </AntTabs>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <CardMedia component="img" height="230" image="/assets\images\cover/cover_7.jpg" alt="Paella dish" />
                <Grid sx={{ display: 'flex', justifyContent: 'center', marginTop: -20 }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box>
                        <CardMedia
                          component="img"
                          image="/assets\images\avatars/avatar_default.jpg"
                          sx={{
                            height: 60,
                            width: 60,
                            borderRadius: 100,
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                          }}
                        />
                        <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
                          Jaydon Frankie
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontFamily: 'Public Sans',
                            fontWeight: 600,
                            color: 'lightgray',
                          }}
                        >
                          Data Analyst
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ marginTop: 3.5 }}>
                      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Tab 1" icon={<ContactEmergency sx={{ height: 15 }} />} iconPosition="start" />
                        <AntTab label="Tab 2" />
                        <AntTab label="Tab 3" />
                      </AntTabs>
                    </Box>
                  </Box>
                </Grid>
              </>
            )}
          </Card>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Card item xs="auto" sx={{ padding: 3 }}>
                  <Typography sx={{ fontFamily: 'Public Sans', fontWeight: 700, fontSize: 20 }}>About</Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <ArtTrack sx={{ height: 22, marginRight: 1 }} /> {UserHeader.CAF_NO}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <PermIdentity sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Customer_ID}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Transgender sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Gender}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Call sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Mobile}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Email sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Email}
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={7}>
                <Card item xs="auto" sx={{ padding: 3 }}>
                  <Typography sx={{ fontFamily: 'Public Sans', fontWeight: 700, fontSize: 20 }}>Details</Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <ArtTrack sx={{ height: 22, marginRight: 1 }} /> {UserHeader.CAF_NO}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <SupportAgent sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Operator}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Transgender sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Gender}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Call sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Mobile}
                  </Typography>
                  <Typography mt={1} sx={{ fontFamily: 'Public Sans', fontWeight: 500, fontSize: 14, display: 'flex' }}>
                    <Email sx={{ height: 22, marginRight: 1 }} /> {UserHeader.Email}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SubscriberPack />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Scrollbar>
      </Container>
    </>
  );
}
