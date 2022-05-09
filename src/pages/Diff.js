import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import { Element, scroller } from 'react-scroll'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import SimpleBar from 'simplebar-react';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';


// ----------------------------------------------------------------------


export default function Diff() {


  const myscrollLeft = () => {
    scroller.scrollTo('inside_id', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: "containerLeft"
    });
  };
  const myscrollRight = () => {
    scroller.scrollTo('secondInsideContainer', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: "containerElement"
    });
  };

  return (
    <Page title="User">
      <Container>
        
{
//        HEADER
}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={myscrollLeft}>
            New User
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={myscrollRight}>
            New User
          </Button>
      </Stack>
{
//        Working
}
    <ScrollSync enabled={0}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <ScrollSyncPane>
          <div id="containerLeft" style={{overflow: 'auto', height: '200px'}}>
                <h1>Left Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
                <p>sadf</p>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <Element name="inside_id"/>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
                <h1>Left Pane Content</h1>
          </div>
        </ScrollSyncPane>
          <div style={{width:200}} />
        <ScrollSyncPane>
          <div id="containerElement" style={{overflow: 'auto', height: '200px'}}>
                <h1>Left Pane Content</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam doloribus
                  dolorum
                  est eum eveniet exercitationem iste labore minus, neque nobis odit officiis omnis
                  possimus quasi rerum sed soluta veritatis.</p>
                <p>sadf</p>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <Element name="secondInsideContainer"/>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>Right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
                <h1>right Pane Content</h1>
          </div>
        </ScrollSyncPane>
      </Stack>
    </ScrollSync> 
      </Container>
    </Page>
  );
}
