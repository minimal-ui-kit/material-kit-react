import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FixedSizeList } from 'react-window';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { ListItem } from '@mui/material';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Iconify from '../iconify';

const styling = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'rgba(249, 250, 251, 1)',
  border: '2px solid rgb(228, 231, 235)',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

// Custom backdrop with blur effect
const BlurBackdrop = (props) => (
  <Backdrop
    {...props}
    sx={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(249, 250, 251, 0.6)' }}
  />
);
const secondsToHoursMinutes = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  const formattedTime = [];

  if (hours > 0) {
    formattedTime.push(`${hours}h`);
  }

  if (minutes > 0) {
    formattedTime.push(`${minutes}m`);
  }

  return formattedTime.join(' ');
};

export default function WbsUploadModal({
  open,
  wbs,
  handleClose,
  resources,
  domHeight,
  handleUpload,
  fileDetails,
}) {
  const [issueSelected, setIssueSelected] = useState([]);
  const issueTypes = useSelector((state) => state.issueTypes);
  // const [loading, setLoading]=useState(false);

  function selectedIssueType(index) {
    // const issues = [...issueSelected];
    const depth = wbs[index]?.wbsItem.split('.').length;
    const resourceId = wbs[index]?.resource.jiraIdentifier;
    const nextDepth =
      wbs[index + 1 <= wbs.length - 1 ? index + 1 : index]?.wbsItem.split('.').length;
    const dNextDepth =
      wbs[index + 2 <= wbs.length - 1 ? index + 2 : index]?.wbsItem.split('.').length;
    // console.log('Depths', depth, nextDepth);
    if (depth === 1 || (depth === 2 && nextDepth === 3 && dNextDepth === 4)) {
      const issueId = issueTypes.find((item) => item.name === 'Epic');
      return {
        lineNumber: index,
        wbsId: wbs[index]._id,
        id: issueId.id,
        resourceId,
        otherThings: { issueType: issueId.name, depth, icon: issueId.iconUrl },
      };
    }
    if ((depth === 2 && nextDepth === 3) || (depth === 3 && nextDepth === 4)) {
      const issueId = issueTypes.find((item) => item.name === 'Story');

      return {
        lineNumber: index,
        wbsId: wbs[index]._id,
        id: issueId.id,
        resourceId,
        otherThings: { issueType: issueId.name, depth, icon: issueId.iconUrl },
      };
    }
    const issueId = issueTypes.find((item) => item.name === 'Task');

    return {
      lineNumber: index,
      wbsId: wbs[index]._id,
      id: issueId.id,
      resourceId,
      otherThings: { issueType: issueId.name, depth, icon: issueId.iconUrl },
    };
  }
  useEffect(() => {
    if (wbs.length > 0 && issueTypes.length > 0) {
      const selectedIssue = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < wbs.length; i++) {
        const item = selectedIssueType(i);
        selectedIssue.push(item);
      }
      setIssueSelected([...selectedIssue]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wbs]);
  const [bottom, setBottom] = useState(false);

  function renderRow({ index, style }) {
    return (
      <ListItem key={index} style={style} alignItems="flex-start" component="div" divider>
        <Box sx={{ flexGrow: 1 }}>
          <Grid direction="row" container spacing={1}>
            <Grid item xs={1}>
              <ListItemAvatar>{wbs[index].wbsItem}</ListItemAvatar>
            </Grid>
            <Grid item xs={7}>
              <ListItemText
                primary={wbs[index].name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Start Date:
                    </Typography>
                    {` ${new Date(wbs[index].startDate).toLocaleDateString('en-US')}`}
                    <br />
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Finish Date:
                    </Typography>
                    {` ${new Date(wbs[index].endDate).toLocaleDateString('en-US')}`}
                    <br />
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Efforts:
                    </Typography>
                    {` ${secondsToHoursMinutes(wbs[index].estimate)}`}
                  </>
                }
              />
            </Grid>
            {wbs.length > 0 && resources.length > 0 && (
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id={`resource${wbs[index]._id}`}>Resource</InputLabel>
                  <Select
                    labelId={`resource${wbs[index]._id}`}
                    id={`resourceSelect${wbs[index]._id}`}
                    value={
                      issueSelected.find((item) => item.lineNumber === index)?.resourceId || ''
                    }
                    label="Select Resource"
                    onChange={(event) => {
                      const resourceId = event.target.value;
                      const issues = [...issueSelected];
                      // console.log({ lineNumber: index, wbsID: wbs[index]._id, id: issueId });
                      const objectToReplace = issues.find((item) => item.lineNumber === index);

                      if (objectToReplace) {
                        objectToReplace.resourceId = resourceId;
                      }
                      setIssueSelected([...issues]);
                    }}
                    renderValue={(selected) => {
                      if (index === wbs.length - 1) {
                        setBottom(true);
                      }
                      return (
                        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                          <Grid direction="row" container spacing={1} sx={{ alignItems: 'center' }}>
                            <Grid item xs={1}>
                              <Avatar
                                alt={resources
                                  .find((item) => item.jiraIdentifier === selected)
                                  ?.name?.substring(0, 1)}
                                src={
                                  resources.find((item) => item.jiraIdentifier === selected)
                                    ?.avatarUrl
                                }
                                sx={{
                                  width: 25,
                                  height: 'auto',
                                }}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                sx={{ display: 'inline', marginLeft: 2 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {resources.find((item) => item.jiraIdentifier === selected)?.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }}
                  >
                    {resources.length > 0 &&
                      resources
                        .filter((res) => res.jiraIdentifier)
                        .map((issue) => (
                          <MenuItem key={issue._id} name={issue.name} value={issue.jiraIdentifier}>
                            <Avatar
                              alt={issue.name.substring(0, 1)}
                              src={issue.avatarUrl}
                              sx={{
                                width: 25,
                                height: 'auto',
                              }}
                            />
                            <Typography
                              sx={{ display: 'inline', marginLeft: 2 }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {issue.name}
                            </Typography>
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {wbs.length > 0 && issueTypes.length > 0 && (
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel id={`form${wbs[index]._id}`}>Issue Type</InputLabel>
                  <Select
                    labelId={`form${wbs[index]._id}`}
                    id={`select${wbs[index]._id}`}
                    value={issueSelected.find((item) => item.lineNumber === index)?.id || ''}
                    label="Select Issue Type"
                    onChange={(event) => {
                      // const issueId = event.target.value;
                      const issueId = issueTypes.find((item) => item.id === event.target.value);

                      const issues = [...issueSelected];
                      const objectToReplace = issues.find((item) => item.lineNumber === index);

                      if (objectToReplace) {
                        objectToReplace.id = issueId.id;
                        objectToReplace.otherThings.issueType = issueId.name;
                        objectToReplace.otherThings.icon = issueId.iconUrl;
                      }
                      setIssueSelected([...issues]);
                    }}
                    renderValue={(selected) => {
                      if (index === wbs.length - 1) {
                        setBottom(true);
                      }
                      return (
                        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                          <Grid direction="row" container spacing={1} sx={{ alignItems: 'center' }}>
                            <Grid item xs={1}>
                              <Avatar
                                alt={issueTypes
                                  .find((item) => item.id === selected)
                                  ?.name?.substring(0, 1)}
                                src={issueTypes.find((item) => item.id === selected)?.iconUrl}
                                sx={{
                                  width: 25,
                                  height: 'auto',
                                }}
                              />
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                sx={{ display: 'inline', marginLeft: 2 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {issueTypes.find((item) => item.id === selected)?.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }}
                  >
                    {issueTypes.length > 0 &&
                      issueTypes.map((issue) => (
                        <MenuItem key={issue.id} name={issue.name} value={issue.id}>
                          <Avatar
                            alt={issue.name.substring(0, 1)}
                            src={issue.iconUrl}
                            sx={{
                              width: 25,
                              height: 'auto',
                            }}
                          />
                          <Typography
                            sx={{ display: 'inline', marginLeft: 2 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {issue.name}
                          </Typography>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
      </ListItem>
    );
  }

  renderRow.propTypes = {
    index: PropTypes.number,
    style: PropTypes.any,
  };

  const boxRef = useRef();
  const createData = async () => {
    const formatDate = (date) => {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return formattedDate;
    };
    const wbsIds = [];
    const fileId = wbs[0].file._id;
    const tickets = [];
    const project = { id: wbs[0].file.jiraProject };
    const customFields = {};
    wbs.forEach((item) => {
      wbsIds.push(item._id);
      const assignee = {
        id: issueSelected.find((issue) => issue.wbsId === item._id).resourceId,
      };
      const summary = item.name;
      const duedate = formatDate(item.endDate);
      const issuetype = { id: issueSelected.find((issue) => issue.wbsId === item._id).id };
      const timetracking = {
        originalEstimate: item.estimate ? secondsToHoursMinutes(item.estimate) : '0h',
        remainingEstimate: item.estimate ? secondsToHoursMinutes(item.estimate) : '0h',
      };
      const others = issueSelected.find((issue) => issue.wbsId === item._id).otherThings;
      fileDetails.distinctIssueFields
        .filter((issueField) => issueField.key.startsWith('custom'))
        .forEach((issue) => {
          let selectedAnswers = null;
          if (issue.schema.type === 'array') {
            issue.allowedValues
              .filter((allowed) => allowed.selected === true)
              .forEach((value) => {
                selectedAnswers = [];
                selectedAnswers.push({
                  id: value.id,
                });
              });
          } else {
            selectedAnswers = {};
            selectedAnswers.id = issue.allowedValues.find((allowed) => allowed.selected).id;
          }
          customFields[issue.key] = selectedAnswers;
        });
      if (assignee.id) {
        tickets.push({
          fields:
            others.issueType === 'Epic' || others.issueType === 'Story'
              ? {
                  assignee,
                  summary,
                  duedate,
                  project,
                  issuetype,
                  ...customFields,
                }
              : {
                  assignee,
                  summary,
                  duedate,
                  project,
                  issuetype,
                  timetracking,
                  ...customFields,
                },
          others,
        });
      } else {
        tickets.push({
          fields:
            others.issueType === 'Epic' || others.issueType === 'Story'
              ? {
                  summary,
                  duedate,
                  project,
                  issuetype,
                  ...customFields,
                }
              : {
                  summary,
                  duedate,
                  project,
                  issuetype,
                  timetracking,
                  ...customFields,
                },
          others,
        });
      }
    });
    console.log({
      wbsIds,
      fileId,
      tickets,
    });
    await handleUpload({
      wbsIds,
      fileId,
      tickets,
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setBottom(false);
          handleClose();
        }}
        // closeAfterTransition
        BackdropComponent={BlurBackdrop} // Use your custom BlurBackdrop component
      >
        <Fade in={open}>
          <Box sx={styling}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Upload on Jira
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'end',
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{}}>
                To Upload:
              </Typography>
              <Typography>{`${wbs.length} issues`}</Typography>
            </Box>
            <Box ref={boxRef} sx={{ width: '100%', height: '60vh' }}>
              <FixedSizeList
                // outerElementType={outerElementType}
                height={(60 / 100) * domHeight}
                itemCount={wbs.length}
                itemSize={130}
                overscanCount={7}
              >
                {renderRow}
              </FixedSizeList>
            </Box>
            <Divider sx={{ width: '100%' }}>
              <Iconify icon="simple-icons:jira" sx={{ color: 'primary.main' }} />
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Tooltip title="Upload Tickets on JIRA">
                <span>
                  <LoadingButton
                    startIcon={<Iconify icon="solar:upload-bold-duotone" />}
                    sx={{ width: '100%' }}
                    disabled={!bottom}
                    onClick={createData}
                  >
                    Upload
                  </LoadingButton>
                </span>
              </Tooltip>
              <Typography mt={1} variant="subtitle2">
                *If not seeing your resources, sync them first via Resources
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

WbsUploadModal.propTypes = {
  open: PropTypes.bool,
  wbs: PropTypes.array,
  handleClose: PropTypes.func,
  resources: PropTypes.array,
  domHeight: PropTypes.number,
  handleUpload: PropTypes.func,
  fileDetails: PropTypes.object,
};
