import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Grid, List, ListItem } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function TermsAndConditionsPage() {
  return (
    <>
      <Helmet>
        <title> Terms and Conditions | Progress Pro </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ alignItems: 'center' }}>
          <Typography variant='h2' sx={{ mb: 5 }} align={'center'}>
            Terms and Conditions
          </Typography>
          <Grid>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Effective as of 1 March 2023
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              General Principles
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The following terms and conditions (collectively, these “Terms and Conditions”) apply to
              your use of progress-pro.app, including any content, functionality and services offered on
              or via progress-pro.app or the Application “Progress Pro”.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Please read the Terms and Conditions carefully before you start using Progress Pro, because
              by using
              the Application you accept and agree to be bound and abide by these Terms and Conditions.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              These Terms and Conditions are effective as of 1 March 2023. We expressly reserve the right
              to change these Terms and Conditions from time to time without notice to you. You
              acknowledge and agree that it is your responsibility to review this Application and these
              Terms and Conditions from time to time and to familiarize yourself with any modifications.
              Your continued use of this Application after such modifications will constitute
              acknowledgement of the modified Terms and Conditions and agreement to abide and be bound by
              the modified Terms and Conditions.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Conduct on Application
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Your use of the Application is subject to all applicable laws and regulations, and you are
              solely responsible for the substance of your communications through the Application.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              By posting information in or otherwise using any communications service, chat room, message
              board, newsgroup, software library, or other interactive service that may be available to
              you on or through this Application, you agree that you will not upload, share, post, or
              otherwise distribute or facilitate distribution of any content — including text,
              communications, software, images, sounds, data, or other information — that:
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive,
                  fraudulent, invasive of another’s privacy, tortious, contains explicit or graphic
                  descriptions or accounts of sexual acts (including but not limited to sexual
                  language of
                  a violent or threatening nature directed at another individual or group of
                  individuals),
                  or otherwise violates our rules or policies
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Victimizes, harasses, degrades, or intimidates an individual or group of individuals
                  on
                  the basis of religion, gender, sexual orientation, race, ethnicity, age, or
                  disability
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Infringes on any patent, trademark, trade secret, copyright, right of publicity, or
                  other proprietary right of any party
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Constitutes unauthorized or unsolicited advertising, junk or bulk email (also known
                  as
                  “spamming”), chain letters, any other form of unauthorized solicitation, or any form
                  of
                  lottery or gambling
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Contains software viruses or any other computer code, files, or programs that are
                  designed or intended to disrupt, damage, or limit the functioning of any software,
                  hardware, or telecommunications equipment or to damage or obtain unauthorized access
                  to
                  any data or other information of any third party
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Impersonates any person or entity, including any of our employees or representatives
                </Typography>
              </ListItem>
            </List>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              We neither endorse nor assume any liability for the contents of any material uploaded or
              submitted by third party users of the Application. We generally do not pre-screen, monitor,
              or edit the content posted by users of communications services, chat rooms, message boards,
              newsgroups, software libraries, or other interactive services that may be available on or
              through this Application.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              However, we and our agents have the right at their sole discretion to remove any content
              that, in our judgment, does not comply with these Terms of Use and any other rules of user
              conduct for our Application, or is otherwise harmful, objectionable, or inaccurate. We are
              not responsible for any failure or delay in removing such content. You hereby consent to
              such removal and waive any claim against us arising out of such removal of content.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              You agree that we may at any time, and at our sole discretion, terminate your membership,
              account, or other affiliation with our site without prior notice to you for violating any of
              the above provisions.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              In addition, you acknowledge that we will cooperate fully with investigations of violations
              of systems or network security at other sites, including cooperating with law enforcement
              authorities in investigating suspected criminal violations.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Intellectual Property
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              By accepting these Terms and Conditions, you acknowledge and agree that all content
              presented to you on this Application is protected by copyrights, trademarks, service marks,
              patents or other proprietary rights and laws, and is the sole property of Progress Pro.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              You are only permitted to use the content as expressly authorized by us or the specific
              content provider. Except for a single copy made for personal use only, you may not copy,
              reproduce, modify, republish, upload, post, transmit, or distribute any documents or
              information from this Application in any form or by any means without prior written
              permission from us or the specific content provider, and you are solely responsible for
              obtaining permission before reusing any copyrighted material that is available on this
              Application.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Third Party Websites
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This Website may link you to other sites on the Internet or otherwise include references to information,
              documents, software, materials and/or services provided by other parties. These websites may contain
              information or material that some people may find inappropriate or offensive.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              These other websites and parties are not under our control, and you acknowledge that we are not
              responsible for the accuracy, copyright compliance, legality, decency, or any other aspect of the content
              of such sites, nor are we responsible for errors or omissions in any references to other parties or their
              products and services. The inclusion of such a link or reference is provided merely as a convenience and
              does not imply endorsement of, or association with, the Website or party by us, or any warranty of any
              kind, either express or implied.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Disclaimer of Warranties, Limitations of Liability and Indemnification
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Your use of Progress Pro is at your sole risk. The Application is provided “as is” and “as available”. We
              disclaim
              all warranties of any kind, express or implied, including, without limitation, the warranties of
              merchantability, fitness for a particular purpose and non-infringement.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              We are not liable for damages, direct or consequential, resulting from your use of the Application, and
              you agree to defend, indemnify and hold us harmless from any claims, losses, liability costs and expenses
              (including but not limits to attorney’s fees) arising from your violation of any third-party’s rights.
              You acknowledge that you have only a limited, non-exclusive, nontransferable license to use the
              Application. Because the Application is not error or bug free, you agree that you will use it carefully
              and avoid using it ways which might result in any loss of your or any third party’s property or
              information.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Term and termination
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This Terms and Conditions will become effective in relation to you when you create a Progress Pro account
              or when
              you start using the Progress Pro and will remain effective until terminated by you or by us.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Progress Pro reserves the right to terminate this Terms and Conditions or suspend your account at any time
              in case of unauthorized, or suspected unauthorized use of the Application whether in contravention of this
              Terms and Conditions or otherwise. If Progress Pro terminates this Terms and Conditions, or suspends your
              account
              for any of the reasons set out in this section, Progress Pro shall have no liability or responsibility to
              you.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Assignment
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Progress Pro may assign this Terms and Conditions or any part of it without restrictions. You may not
              assign this Terms and Conditions or any part of it to any third party.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Governing Law
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              These Terms and Conditions and any dispute or claim arising out of, or related to them, shall be governed
              by and construed in accordance with the internal laws of the de without giving effect to any choice or
              conflict of law provision or rule.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Any legal suit, action or proceeding arising out of, or related to, these Terms of Service or the
              Application shall be instituted exclusively in the federal courts of Germany.
            </Typography>
          </Grid>
        </StyledContent>
      </Container>
    </>
  );
}
