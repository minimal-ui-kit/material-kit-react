import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {Typography, Container, Grid} from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function CookiesPolicyPage() {
  return (
    <>
      <Helmet>
        <title> Cookies Policy | Progress Pro </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ alignItems: 'center' }}>
          <Typography variant="h2" sx={{ mb: 5 }} align={"center"}>
            Privacy Policy
          </Typography>
          <Grid>
            <Typography variant="h4" sx={{ pr: { md: 5 } }} mb={2}>
              Effective as of 1 October 2022
            </Typography>
            <Typography variant="h4" sx={{ pr: { md: 5 } }} mb={2}>
              General Principles
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 } }} mb={2}>
              We are committed to transparent and secure data processing. As a company incorporated in the
              European Union we are committed to process any personal data in line with EU privacy standards and
              laws. In this privacy notice we provide you with information about what personal data we process
              and for what purposes, what are your rights and where you can contact us in case you have any
              questions or concerns about your personal data processing. We only process personal data where we
              have your consent or where we are entitled to do so based on other legitimate reasons, in
              particular where (a) processing is necessary for the performance of the Service and to enable us
              to contract with you in connection with provision of the Service, (b) processing is necessary for
              compliance with a legal obligation to which we are subject; (c) processing is necessary for the
              purposes of the legitimate interests pursued by us as the data controller or by a third party,
              except where such interests are overridden by the interests or fundamental rights and freedoms of
              you as the data subject and which require protection of personal data, in particular where the
              data subject is a child.
            </Typography>
          </Grid>
        </StyledContent>
      </Container>
    </>
  );
}
