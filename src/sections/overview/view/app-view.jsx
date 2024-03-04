import axios from 'axios';
import parse from 'html-react-parser';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function AppView() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [editId, setEditId] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sport, setSport] = useState('Football');
  const [day, setDay] = useState(0);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialTableContent, setInitialTableContent] = useState(
    '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Team 1</td><td style="text-align: center; font-weight: 800;">Team 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
  );
  useEffect(() => {
    setLoading(true);
    // fetch(`https://app-admin-api.asmitaiiita.org/api/fixtures/`)
    fetch(`https://app-admin-api.asmitaiiita.org/api/fixtures`)
      .then((res) => {
        console.log('res: ', res);
        return res.json();
      })
      .then((allFixtures) => {
        console.log('all fixtures: ', allFixtures);
        setFixtures(allFixtures.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
      });
  }, []);
  const handleAddFixture = async () => {
    if (editMode) {
      alert('Toggle edit mode off first.');
    } else {
      try {
        const data = {
          Sport: sport,
          Day: day,
          Date: new Date(),
          HTMLString: editorRef.current.getContent(),
        };
        console.log(data);
        if (data.HTMLString.length !== 0) {
          const res = await axios.post(
            `https://app-admin-api.asmitaiiita.org/api/fixtures/create`,
            data
          );
          alert('Successfully added fixture. Refresh page');
          console.log(res);
        } else {
          alert('No data added.');
        }
      } catch (err) {
        console.log('Error occurred while making request to add fixture: ', err);
      }
    }
  };
  const handleDeleteFixture = async (id) => {
    try {
      console.log('id for deletion: ', id);
      const deletedFixture = await axios.delete(
        `https://app-admin-api.asmitaiiita.org/api/fixtures/${id}`
      );

      console.log('Deleted fixture: ', deletedFixture);
      const newFixtures = fixtures.filter((fixture) => fixture._id !== id);
      console.log('New fixtures: ', newFixtures);

      setFixtures(newFixtures);
      alert('Successfully deleted fixture');
    } catch (err) {
      console.log('Error while delete request: ', err);
    }
  };
  const handleEditFixture = async (id) => {
    if (!editMode) {
      alert('Toggle edit mode on.');
    } else {
      try {
        const newBody = {
          Sport: sport,
          Day: day,
          Date: new Date(),
          HTMLString: editorRef.current.getContent(),
        };
        const updatedFixure = await axios.patch(
          `https://app-admin-api.asmitaiiita.org/api/fixtures/${id}`,
          newBody
        );
        console.log('Updated fixture: ', updatedFixure.data.data);
        const newFixtures = fixtures.map((fixture) => {
          if (fixture._id === id) return updatedFixure.data.data;
          return fixture;
        });
        console.log(newFixtures);
        setFixtures(newFixtures);
        alert('Successfully updated fixture!');
      } catch (err) {
        console.log('Error while making request to edit fixture: ', err);
      }
    }
  };
  if (loading) return 'Loading';
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Fixtures
      </Typography>
      <h3>Create daywise fixtures:</h3>
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
                  '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Team 1</td><td style="text-align: center; font-weight: 800;">Team 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
                );
                // Editor.setContent(
                //   '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.3102%;"><col style="width: 33.3102%;"><col style="width: 33.3102%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Team 1</td><td style="text-align: center; font-weight: 800;">Team 2</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'
                // );
              } else {
                setInitialTableContent(
                  '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Event</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
                );
                // Editor.setContent(
                //   '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup><tbody><tr><td style="text-align: center; font-weight: 800;">Event</td><td style="text-align: center; font-weight: 800;">Time</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
                // );
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
          apiKey="h0ztosvu8eepv4ng56gjqnjy0jrzm0t0scpkc8mtfupz8g08"
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
          {(!editMode && (
            <Button
              variant="contained"
              onClick={() => {
                handleAddFixture();
              }}
            >
              Submit
            </Button>
          )) || (
            <Button variant="contained" disabled>
              Submit
            </Button>
          )}

          {(editMode && (
            <Button
              variant="contained"
              onClick={() => {
                handleEditFixture(editId);
              }}
            >
              Edit
            </Button>
          )) || (
            <Button variant="contained" disabled>
              Edit
            </Button>
          )}
        </Box>
        <p>
          Set edit mode:{' '}
          <Switch
            id="toggleEditMode"
            checked={editMode}
            onClick={() => {
              setEditMode(!editMode);
            }}
          />
        </p>
      </Box>

      <h3>View and edit fixtures</h3>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '100px',
        }}
      >
        {fixtures?.map((fixture, key) => {
          console.log('fixture: ', fixture._id);
          return (
            <div style={{ width: '50%' }}>
              <h3>
                Day {fixture.Day}, {fixture.Sport}
              </h3>
              {fixture.HTMLString && parse(fixture.HTMLString)}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'center',
                  marginTop: '30px',
                }}
              >
                <Button
                  sx={{ marginBottom: '100px', backgroundColor: '#f24e4e' }}
                  variant="contained"
                  onClick={() => handleDeleteFixture(fixture._id)}
                >
                  Delete
                </Button>
                <Button
                  sx={{ marginBottom: '100px' }}
                  variant="contained"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setDay(fixture.Day);
                    setSport(fixture.Sport);
                    setInitialTableContent(fixture.HTMLString);
                    setEditId(fixture._id);
                    setEditMode(true);
                  }}
                >
                  Edit
                </Button>
              </Box>
            </div>
          );
        })}
      </Box>
    </Container>
  );
}
