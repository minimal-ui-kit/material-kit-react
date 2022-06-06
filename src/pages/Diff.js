// material
import { Container } from '@mui/material';
import gitDiffParser from '../utils/gitDiffParser';

// components
import Page from '../components/Page';
import DiffView from '../components/diff/DiffView';
import { diffText } from '../dummytext';


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