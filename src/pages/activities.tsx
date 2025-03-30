import { useState } from 'react';

import { Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ScheduledActivitiesView } from '../sections/product/view/scheduled-activities-view';
import { OneTimeActivitiesView } from '../sections/product/view/one-time-activities-view';

// ----------------------------------------------------------------------
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Page() {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> {`Activities - ${CONFIG.appName}`}</title>
      </Helmet>

      <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
        Activities
      </Typography>

      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Scheduled" {...a11yProps(0)} />
          <Tab label="One Time" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ScheduledActivitiesView />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OneTimeActivitiesView />
      </CustomTabPanel>
    </Box>

    </>
  );
}
