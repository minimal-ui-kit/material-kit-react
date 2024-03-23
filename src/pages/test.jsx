import * as React from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import { Input } from '@mui/material';
import { IconButton } from '@mui/material';

import { RadioGroup, Radio, FormControlLabel, Checkbox, Autocomplete } from '@mui/material';
import { useState } from 'react';

const Step1 = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState('');
  const itSkills = [
    'FrontEnd',
    'BackEnd',
    'FullStack',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
  ];
  const experienceOptions = ['Junior', 'Senior', 'Expert'];

  const handleSkillClick = (skill) => {
    const isSelected = selectedSkills.includes(skill);
    setSelectedSkills(isSelected ? selectedSkills.filter((s) => s !== skill) : [skill]);
  };

  const handleOtherInputChange = (event) => {
    setOtherSkill(event.target.value);
  };

  const handleExperienceChange = (event) => {
    // Update state with selected experience value (event.target.value)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Create New Test</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>1. Which role(s) do you want to test?</Typography>
      </Grid>
      <Grid item container xs={10} spacing={2}>
        {itSkills.map((skill) => (
          <Grid item key={skill} xs={4}>
            <Button
              fullWidth
              variant={selectedSkills.includes(skill) ? 'contained' : 'outlined'}
              onClick={() => handleSkillClick(skill)}
            >
              {skill}
            </Button>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button fullWidth variant="outlined" onClick={() => setSelectedSkills(['other'])}>
            Other
          </Button>
          {selectedSkills.includes('other') && (
            <input
              type="text"
              value={otherSkill}
              onChange={handleOtherInputChange}
              placeholder="Enter Skill"
            />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>2. What is the required experience?</Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup row onChange={handleExperienceChange}>
          {experienceOptions.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

const Step2 = () => {
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const techStacks = ['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Go', 'Ruby', 'PHP', '.NET'];
  const projectExamples = ['Todo List Application', 'E-commerce Product Grid', 'Blog Application'];
  const [searchValue, setSearchValue] = useState('');

  const handleStackClick = (stack) => {
    const isChecked = selectedStacks.includes(stack);
    setSelectedStacks(
      isChecked ? selectedStacks.filter((s) => s !== stack) : [...selectedStacks, stack]
    );
  };

  const handleProjectChange = (event) => {
    const project = event.target.name;
    const isChecked = event.target.checked;
    setSelectedProjects(
      isChecked ? [...selectedProjects, project] : selectedProjects.filter((p) => p !== project)
    );
  };

  const handleCreateCustomProject = () => {
    // Handle custom project creation logic
  };

  const handleStackAddition = (stack) => {
    setSelectedStacks([...selectedStacks, stack]);
    setSearchValue('');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Create New Test</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          3. Which tech stack(s) do you want to test? ({selectedStacks.length} selected)
        </Typography>
      </Grid>
      <Grid item container xs={11} spacing={2}>
        {techStacks.map((stack) => (
          <Grid item key={stack} xs={2}>
            <Button
              fullWidth
              variant={selectedStacks.includes(stack) ? 'contained' : 'outlined'}
              onClick={() => handleStackClick(stack)}
            >
              {stack}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          options={techStacks}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              size="small"
              fullWidth
              onInputChange={(event, newInputValue) => setSearchValue(newInputValue)}
            />
          )}
          value={searchValue}
          onChange={(event, newValue) => handleStackAddition(newValue)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>4. Which project do you want to pick?</Typography>
      </Grid>
      <Grid item xs={4}>
        {projectExamples.map((project) => (
          <FormControlLabel
            key={project}
            control={
              <Checkbox
                checked={selectedProjects.includes(project)}
                onChange={handleProjectChange}
                name={project}
              />
            }
            label={project}
          />
        ))}
        <Button onClick={handleCreateCustomProject}>Create Custom Project</Button>
      </Grid>
    </Grid>
  );
};
// const Step2 = () => {
//   const [documents, setDocuments] = React.useState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const newDocument = {
//       id: Date.now(), // Unique ID for each document
//       name: file.name,
//     };
//     setDocuments([...documents, newDocument]);
//   };

//   const handleDeleteDocument = (id) => {
//     setDocuments(documents.filter((doc) => doc.id !== id));
//   };

//   return (
//     <Grid container sx={{ px: 20 }} spacing={2}>
//       <Grid item xs={12}>
//         <InputLabel>Title</InputLabel>
//         <TextField size="small" fullWidth />
//       </Grid>
//       <Grid item xs={12}>
//         <InputLabel>GitHub URL</InputLabel>
//         <TextField fullWidth size="small" />
//       </Grid>
//       <Grid item xs={12}>
//         <InputLabel>Description</InputLabel>
//         <TextField size="small" multiline rows={5} fullWidth />
//       </Grid>
//       <Grid item xs={12}>
//         <Input
//           accept="application/pdf" // Specify accepted file types if needed
//           type="file"
//           id="file-upload"
//           style={{ display: 'none' }}
//           onChange={handleFileUpload}
//         />
//         <label htmlFor="file-upload">
//           <Button variant="contained" component="span">
//             Upload Document
//           </Button>
//         </label>
//       </Grid>
//       <Grid item xs={12}>
//         {documents.map((document) => (
//           <div key={document.id} style={{ display: 'flex', alignItems: 'center' }}>
//             <span>{document.name}</span>
//             <Button
//               aria-label="delete"
//               color="error"
//               onClick={() => handleDeleteDocument(document.id)}
//             >
//               delete
//             </Button>
//           </div>
//         ))}
//       </Grid>
//     </Grid>
//   );
// };

const Step3 = () => {
  // Sample data for the table
  const tableData = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Alice Johnson', email: 'alice@example.com' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField label="Email" size="small" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary">
          Invite Candidate
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const steps = ['Search for Test', 'Test Infos', 'Invide Candidates'];

export default function TestPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        width: '70%',
        minWidth: '500px',
        position: 'relative',
        minHeight: '500px',
        margin: 'auto',
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <br></br>
          <br></br>

          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && <Step2 />}
          {activeStep === 2 && <Step3 />}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
