import React from 'react';

import { Card, Typography, CardContent } from '@mui/material';

const UnderConstructionCard = () => (
  <Card
    sx={{
      // height: '50%',
      maxWidth: 400,
      margin: 'auto',
      marginTop: 0,
      padding: 0,
      textAlign: 'center',
    }}
  >
    {/* Stock Image */}
    <img
      src="/assets/images/underconstruction.jpeg"
      alt="Under Construction"
      style={{
        // maxWidth: '100%',
        height: 'auto',
        marginBottom: 4,
        objectFit: 'fill',
      }}
    />
    <CardContent>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        Page Under Construction
      </Typography>
    </CardContent>
  </Card>
);
export default UnderConstructionCard;
