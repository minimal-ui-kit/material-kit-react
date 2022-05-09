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
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';
import DiffView from '../components/diff/DiffView';


// ----------------------------------------------------------------------


export default function Diff() {
  
  const left = (
    <>
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
    </>
  )
  const right = (
    <>
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
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    <h1>Right Pane Content</h1>
    </>
  )

  return (
    <Page title="User">
      <Container>
      <DiffView debug contentLeft={left} contentRight={right}/>
      </Container>
    </Page>
  );
}
