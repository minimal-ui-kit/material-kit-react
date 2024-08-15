import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';

export default function FinancingCard({ id, name, cash, click, devices_count, manual }) {
 console.log(id)
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{maxHeight: '265px', minWidth: '275px'}}>
        <CardContent sx={{ lineHeight: '20px' }}>
          <Typography
            variant="h5"
            sx={{ fontSize: 14, textAlign: 'center' }}
            color="text.secondary"
            gutterBottom
          >
            {name} <Box component={'span'} sx={{ fontWeight: '500', color: 'text.secondary' }}>({devices_count} ta qurilma)</Box>
          </Typography>
          <Typography color={'text.primary'} variant="subtitle1" component="div">
            Naqd pul tolovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {' '}
              {cash.amount} so'm <br /> ({cash.count} ta transaksiya)
            </Box>
          </Typography>
          <Typography color="text.primary" variant="subtitle1" component="div">
            Onlayn tolovlar:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {click.amount} so'm <br />({click.count} ta transaksiya)
            </Box>
          </Typography>
          <Typography variant="subtitle1">
            Admin to'lovlari:{' '}
            <Box component={'span'} sx={{ fontWeight: 'fontWeightBold', color: 'text.secondary' }}>
              {manual.amount === null ? 0 : manual.amount} so'm <br />({manual.count} ta transaksiya)
            </Box>
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ mx: 'auto' }} type="submit">
            <Link style={{ textDecoration: 'none', color: 'blue' }}   to={`/financing/filial/${id}`}>Batafsil ma'lumot</Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
