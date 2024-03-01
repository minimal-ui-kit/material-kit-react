import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

// ----------------------------------------------------------------------

export default function AppView() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [sport, setSport] = useState('Football');
  const [day, setDay] = useState(0);
  const handleAddFixture = async () => {
    const data = {
      sport,
      day,
      date: new Date(),
      htmlData: editorRef.current.getContent(),
    };
    const res = await axios.post('https://app-admin-api.asmitaiiita.org/api/fixtures/create', data);
    console.log(res);
  };
  const [initialTableContent, setInitialTableContent] = useState(
    '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">College 1</td><td style="text-align: center; font-weight: 800;">College 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p>&nbsp;</p>'
  );
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Fixtures
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '50px',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            gap: '10px',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <InputLabel id="demo-simple-select-label">Sport: </InputLabel>
          <Select
            sx={{ width: '75%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sport"
            onChange={(e) => {
              const currSport = e.target.value;
              setSport(currSport);
              if (currSport === 'Football' || currSport === 'Cricket') {
                setInitialTableContent(
                  '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Team 1</td><td style="text-align: center; font-weight: 800;">Team 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p>&nbsp;</p>'
                );
              } else {
                setInitialTableContent(
                  '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Event</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p>&nbsp;</p>'
                );
              }
            }}
            value={sport}
          >
            <MenuItem value="Football">Football</MenuItem>
            <MenuItem value="Cricket">Cricket</MenuItem>
            <MenuItem value="Athletics">Athletics</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            width: '50%',
            display: 'flex',
            gap: '10px',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <InputLabel id="demo-simple-select-label">Day: </InputLabel>
          <Select
            sx={{ width: '75%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Day"
            onChange={(e) => {
              setDay(e.target.value);
            }}
            value={day}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        <Editor
          onChange={log}
          apiKey="ah9w9dtmhnrt5yhzobg11p0jj9sdldd1x64lj89aipllnqn6"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={initialTableContent}
          init={{
            height: '50vmin',
            toolbar_sticky: true,
            toolbar_sticky_offset: 64,
            selector: 'textarea',
            skin: 'oxide-dark',
            content_css: 'dark',
            statusbar: false,
            plugins: [
              'autolink',
              'lists',
              'advlist',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
              'quickbars',
            ],
            menubar: false,
            toolbar: [
              'styles| bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | code | table | help',
            ],
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:17px }',
          }}
        />
      </Box>
      <Button variant="contained" onClick={handleAddFixture}>
        Submit
      </Button>
    </Container>
  );
}
