import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Grid, ListItem, List } from '@mui/material';

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title> Privacy Policy | Progress Pro </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ alignItems: 'center' }}>
          <Typography variant='h2' sx={{ mb: 5 }} align={'center'}>
            Privacy Policy
          </Typography>
          <Grid>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Effective as of 1 October 2022
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Types of Data collected
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Among the types of Personal Data that this Application collects, by itself or through third parties, there
              are: Cookies; Usage Data; first name; username; various types of Data; email address; password; general
              activity data; payment data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Complete details on each type of Personal Data collected are provided in the dedicated sections of this
              privacy policy or by specific explanation texts displayed prior to the Data collection.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when
              using this Application.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide
              this Data may make it impossible for this Application to provide its services. In cases where this
              Application specifically states that some Data is not mandatory, Users are free not to communicate this
              Data without consequences to the availability or the functioning of the Service.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Any use of Cookies – or of other tracking tools – by this Application or by the owners of third-party
              services used by this Application serves the purpose of providing the Service required by the User, in
              addition to any other purposes described in the present document and in the Cookie Policy, if available.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Users are responsible for any third-party Personal Data obtained, published or shared through this
              Application and confirm that they have the third party's consent to provide the Data to the Owner.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2}>
              Mode and place of processing the Data
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2}>
              Methods of processing
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or
              unauthorized destruction of the Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Data processing is carried out using computers and/or IT enabled tools, following organizational
              procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases,
              the Data may be accessible to certain types of persons in charge, involved with the operation of this
              Application (administration, sales, marketing, legal, system administration) or external parties (such as
              third-party technical service providers, mail carriers, hosting providers, IT companies, communications
              agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may
              be requested from the Owner at any time.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2}>
              Legal basis of processing
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              The Owner may process Personal Data relating to Users if one of the following applies:
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Users have given their consent for one or more specific purposes. Note: Under some legislations the
                  Owner may be allowed to process Personal Data until the User objects to such processing (“opt-out”),
                  without having to rely on consent or any other of the following legal bases. This, however, does not
                  apply, whenever the processing of Personal Data is subject to European data protection law;
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  provision of Data is necessary for the performance of an agreement with the User and/or for any
                  pre-contractual obligations thereof;
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  processing is necessary for compliance with a legal obligation to which the Owner is subject;
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  processing is related to a task that is carried out in the public interest or in the exercise of
                  official authority vested in the Owner;
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a
                  third party.
                </Typography>
              </ListItem>
            </List>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              In any case, the Owner will gladly help to clarify the specific legal basis that applies to the
              processing, and in particular whether the provision of Personal Data is a statutory or contractual
              requirement, or a requirement necessary to enter into a contract.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Place
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Data is processed at the Owner's operating offices and in any other places where the parties involved
              in the processing are located.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Depending on the User's location, data transfers may involve transferring the User's Data to a country
              other than their own. To find out more about the place of processing of such transferred Data, Users can
              check the section containing details about the processing of Personal Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Users are also entitled to learn about the legal basis of Data transfers to a country outside the European
              Union or to any international organization governed by public international law or set up by two or more
              countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              If any such transfer takes place, Users can find out more by checking the relevant sections of this
              document or inquire with the Owner using the information provided in the contact section.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Retention time
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              Personal Data shall be processed and stored for as long as required by the purpose they have been
              collected for.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              Therefore:
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Personal Data collected for purposes related to the performance of a contract between the Owner and
                  the User shall be retained until such contract has been fully performed.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long
                  as needed to fulfill such purposes. Users may find specific information regarding the legitimate
                  interests pursued by the Owner within the relevant sections of this document or by contacting the
                  Owner.
                </Typography>
              </ListItem>
            </List>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent
              to
              such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain
              Personal Data for a longer period whenever required to do so for the performance of a legal obligation or
              upon order of an authority.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the
              right
              to erasure, the right to rectification and the right to data portability cannot be enforced after
              expiration
              of the retention period.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              The purposes of processing
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal
              obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or
              third parties), detect any malicious or fraudulent activity, as well as the following: Analytics, Beta
              Testing, Social features, Content commenting, Registration and authentication, Handling activity data,
              Access to third-party accounts, Platform services and hosting and Handling payments.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              For specific information about the Personal Data used for each purpose, the User may refer to the section
              “Detailed information on the processing of Personal Data”.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Detailed information on the processing of Personal Data
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Personal Data is collected for the following purposes and using the following services:
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Access to third-party accounts
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This type of service allows this Application to access Data from your account on a third-party service and
              perform actions with it.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              These services are not activated automatically, but require explicit authorization by the User.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Analytics
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The services contained in this section enable the Owner to monitor and analyze web traffic and can be used
              to keep track of User behavior.
            </Typography>
            <Typography variant='h6' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Google Analytics (Google Ireland Limited)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Google Analytics is a web analysis service provided by Google Ireland Limited (“Google”). Google utilizes
              the Data collected to track and examine the use of this Application, to prepare reports on its activities
              and share them with other Google services.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Google may use the Data collected to contextualize and personalize the ads of its own advertising network.
              Personal Data processed: Tracker; Usage Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Place of processing: Ireland
            </Typography>
            <Typography variant='h6' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Platform services and hosting
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              These services have the purpose of hosting and running key components of this Application, therefore
              allowing the provision of this Application from within a unified platform. Such platforms provide a wide
              range of tools to the Owner – e.g. analytics, user registration, commenting, database management,
              e-commerce, payment processing – that imply the collection and handling of Personal Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Some of these services work through geographically distributed servers, making it difficult to determine
              the
              actual location where the Personal Data are stored.
            </Typography>
            <Typography variant='h6' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Apple App Store (Apple Inc.)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This Application is distributed on Apple's App Store, a platform for the distribution of mobile apps,
              provided by Apple Inc. By virtue of being distributed via this app store, Apple collects basic analytics
              and
              provides reporting features that enables the Owner to view usage analytics data and measure the
              performance
              of this Application. Much of this information is processed on an opt-in basis. Users may opt-out of this
              analytics feature directly through their device settings. More information on how to manage analysis
              settings can be found on this page.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Personal Data processed: Usage Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Place of processing: United States – Privacy Policy.
            </Typography>
            <Typography variant='h6' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Google Play Store (Google LLC)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This Application is distributed on the Google Play Store, a platform for the distribution of mobile apps,
              provided by Google LLC. By virtue of being distributed via this app store, Google collects usage and
              diagnostics data and share aggregate information with the Owner. Much of this information is processed on
              an
              opt-in basis. Users may opt-out of this analytics feature directly through their device settings. More
              information on how to manage analysis settings can be found on this page.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Personal Data processed: Usage Data.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Place of processing: United States – Privacy Policy.
            </Typography>
            <Typography variant='h6' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Registration and authentication
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              By registering or authenticating, Users allow this Application to identify them and give them access to
              dedicated services.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Depending on what is described below, third parties may provide registration and authentication services.
              In
              this case, this Application will be able to access some Data, stored by these third-party services, for
              registration or identification purposes.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              By registering or authenticating, Users allow this Application to identify them and give them access to
              dedicated services.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Direct registration (this Application)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The User registers by filling out the registration form and providing the Personal Data directly to this
              Application.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Personal Data processed: email address; first name; password; username.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              The rights of Users
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Users may exercise certain rights regarding their Data processed by the Owner.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              In particular, Users have the right to do the following:
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Withdraw their consent at any time. Users have the right to withdraw consent where they have
                  previously
                  given their consent to the processing of their Personal Data.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Object to processing of their Data. Users have the right to object to the processing of their Data if
                  the
                  processing is carried out on a legal basis other than consent. Further details are provided in the
                  dedicated
                  section below.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain
                  disclosure
                  regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for
                  it to
                  be updated or corrected.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Restrict the processing of their Data. Users have the right, under certain circumstances, to restrict
                  the
                  processing of their Data. In this case, the Owner will not process their Data for any purpose other
                  than
                  storing it.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Have their Personal Data deleted or otherwise removed. Users have the right, under certain
                  circumstances, to
                  obtain the erasure of their Data from the Owner.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Receive their Data and have it transferred to another controller. Users have the right to receive
                  their Data
                  in a structured, commonly used and machine readable format and, if technically feasible, to have it
                  transmitted to another controller without any hindrance. This provision is applicable provided that
                  the Data
                  is processed by automated means and that the processing is based on the User's consent, on a contract
                  which
                  the User is part of or on pre-contractual obligations thereof.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>
                <Typography variant='body2' sx={{ pr: { md: 5 } }}>
                  Lodge a complaint. Users have the right to bring a claim before their competent data protection
                  authority.
                </Typography>
              </ListItem>
            </List>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Details about the right to object to processing
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Where Personal Data is processed for a public interest, in the exercise of an official authority vested in
              the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such
              processing by providing a ground related to their particular situation to justify the objection.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Users must know that, however, should their Personal Data be processed for direct marketing purposes, they
              can object to that processing at any time without providing any justification. To learn, whether the Owner
              is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of
              this
              document.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              How to exercise these rights
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Any requests to exercise User rights can be directed to the Owner through the contact details provided in
              this document. These requests can be exercised free of charge and will be addressed by the Owner as early
              as
              possible and always within one month.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Additional information about Data collection and processing
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Legal action
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to
              possible legal action arising from improper use of this Application or the related Services.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The User declares to be aware that the Owner may be required to reveal personal data upon request of
              public
              authorities.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Additional information about User's Personal Data
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              In addition to the information contained in this privacy policy, this Application may provide the User
              with
              additional and contextual information concerning particular Services or the collection and processing of
              Personal Data upon request.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              System logs and maintenance
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              For operation and maintenance purposes, this Application and any third-party services may collect files
              that
              record interaction with this Application (System logs) use other Personal Data (such as the IP Address)
              for
              this purpose.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Information not contained in this policy
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              More details concerning the collection or processing of Personal Data may be requested from the Owner at
              any
              time. Please see the contact information at the beginning of this document.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              How “Do Not Track” requests are handled
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This Application does not support “Do Not Track” requests.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please
              read
              their privacy policies.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Changes to this privacy policy
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The Owner reserves the right to make changes to this privacy policy at any time by notifying its Users on
              this page and possibly within this Application and/or - as far as technically and legally feasible -
              sending
              a notice to Users via any contact information available to the Owner. It is strongly recommended to check
              this page often, referring to the date of the last modification listed at the bottom.
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Should the changes affect processing activities performed on the basis of the User’s consent, the Owner
              shall collect new consent from the User, where required.
            </Typography>
            <Typography variant='h4' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Definitions and legal references
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Personal Data (or Data)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Any information that directly, indirectly, or in connection with other information — including a personal
              identification number — allows for the identification or identifiability of a natural person.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Usage Data
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Information collected automatically through this Application (or third-party services employed in this
              Application), which can include: the IP addresses or domain names of the computers utilized by the Users
              who
              use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method
              utilized to submit the request to the server, the size of the file received in response, the numerical
              code
              indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the
              features of the browser and the operating system utilized by the User, the various time details per visit
              (e.g., the time spent on each page within the Application) and the details about the path followed within
              the Application with special reference to the sequence of pages visited, and other parameters about the
              device operating system and/or the User's IT environment.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              User
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The individual using this Application who, unless otherwise specified, coincides with the Data Subject.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Data Subject
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The natural person to whom the Personal Data refers.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Data Processor (or Data Supervisor)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The natural or legal person, public authority, agency or other body which processes Personal Data on
              behalf of the Controller, as described in this privacy policy.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Data Controller (or Owner)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The natural or legal person, public authority, agency or other body which, alone or jointly with others,
              determines the purposes and means of the processing of Personal Data, including the security measures
              concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is
              the Owner of this Application.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              This Application
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The means by which the Personal Data of the User is collected and processed.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Service
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              The service provided by this Application as described in the relative terms (if available) and on this
              site/application.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              European Union (or EU)
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Unless otherwise specified, all references made within this document to the European Union include all
              current member states to the European Union and the European Economic Area.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Cookie
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Cookies are Trackers consisting of small sets of data stored in the User's browser.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Tracker
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              Tracker indicates any technology - e.g Cookies, unique identifiers, web beacons, embedded scripts, e-tags
              and fingerprinting - that enables the tracking of Users, for example by accessing or storing information
              on the User’s device.
            </Typography>
            <Typography variant='h5' sx={{ pr: { md: 5 } }} mb={2} mt={2}>
              Legal information
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This privacy statement has been prepared based on provisions of multiple legislations, including Art.
              13/14 of Regulation (EU) 2016/679 (General Data Protection Regulation).
            </Typography>
            <Typography variant='body2' sx={{ pr: { md: 5 } }} mb={2}>
              This privacy policy relates solely to this Application, if not stated otherwise within this document.
            </Typography>
          </Grid>
        </StyledContent>
      </Container>
    </>
  );
}
