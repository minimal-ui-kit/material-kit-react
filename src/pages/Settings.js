/* eslint-disable */ 
// material
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { UpdateForm } from '../components/authentication/update';
import Logo from '../components/images/engineer.png'


// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center'
}));

// ----------------------------------------------------------------------

export default function UpdateSettings() {
  return (
    <RootStyle title="Settings | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 1, mb: 5 }}>
          </Typography>
          <img alt="engineer" src={Logo} />
        </SectionStyle>
      </MHidden>
      <Container maxWidth="sm">
        <ContentStyle >
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile Settings
        </Typography>
          <UpdateForm />
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}