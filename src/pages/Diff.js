import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import gitDiffParser from '../utils/gitDiffParser';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';
import DiffView from '../components/diff/DiffView';
import DiffFile from '../components/diff/DiffFile';
import { leftText, rightText, diffText } from '../dummytext';


// ----------------------------------------------------------------------


export default function Diff() {

  const files = gitDiffParser.parse(diffText)
  console.log(files)
  files[0].hunks[2].changes[3].highlight = [[24,40]]
  files[0].hunks[2].changes[4].highlight = [[24,47]]

  return (
    <Page title="User">
      <Container maxWidth={false}>
      <DiffView debug files={files}/>
      </Container>
    </Page>
  );
}