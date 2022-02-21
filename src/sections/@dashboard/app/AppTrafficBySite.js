import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'FaceBook',
    value: faker.datatype.number(),
    icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} height={32} />
  },
  {
    name: 'Google',
    value: faker.datatype.number(),
    icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} height={32} />
  },
  {
    name: 'Linkedin',
    value: faker.datatype.number(),
    icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} height={32} />
  },
  {
    name: 'Twitter',
    value: faker.datatype.number(),
    icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} height={32} />
  }
];

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { icon, value, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{fShortenNumber(value)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AppTrafficBySite() {
  return (
    <Card>
      <CardHeader title="Traffic by Site" />
      <CardContent>
        <Grid container spacing={2}>
          {SOCIALS.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
