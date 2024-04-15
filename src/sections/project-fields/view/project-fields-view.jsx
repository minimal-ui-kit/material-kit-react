import { isArray } from 'lodash';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';

import Label from '../../../components/label';
import { useApi } from '../../../redux/api-calls';
import { useRouter } from '../../../routes/hooks';
import Iconify from '../../../components/iconify';

export default function ProjectFieldsView() {
  const { id } = useParams();
  const fieldsList = useSelector((state) => state.fieldsDetails);
  const files = useSelector((state) => state.files);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderedList, setOrderedList] = useState(null);
  const [fieldLoading, setFieldLoading] = useState({ loading: false, index: 0 });
  const api = useApi();
  const router = useRouter();
  const extractProjectDetailsAndIssueFields = (jsonData) => {
    // Check if the required data is present
    if (!jsonData || !jsonData[0] || !jsonData[0].name) {
      console.error('Invalid JSON format or missing required data.');
      return null;
    }

    // Extract project details
    const projectDetails = {
      id: jsonData[0].id,
      key: jsonData[0].key,
      name: jsonData[0].name,
      avatarUrls: jsonData[0].avatarUrls,
    };

    // Extract distinct issue fields
    const distinctIssueFields = [];

    // Iterate through issue types
    jsonData[0].issuetypes.forEach((issueType) => {
      // Iterate through fields of each issue type
      if (issueType.fields) {
        Object.keys(issueType.fields).forEach((fieldName) => {
          if (issueType.fields[fieldName].required) {
            const existingField = distinctIssueFields.find((item) => item.key === fieldName);

            if (!existingField) {
              const { allowedValues } = issueType.fields[fieldName];

              if (Array.isArray(allowedValues)) {
                // Update the original array with selected: false
                issueType.fields[fieldName].allowedValues = allowedValues.map((value) => ({
                  ...value,
                  selected: false,
                }));
              }

              distinctIssueFields.push({ ...issueType.fields[fieldName] });
            }
          }
        });
      }
    });

    return {
      projectDetails,
      distinctIssueFields: Array.from(distinctIssueFields),
    };
  };
  useEffect(() => {
    const funct = async () => {
      const success = await api.getProjectsFieldsDetails(id);
      const successFiles = await api.fetchFileDB();
      console.log(success, 'Check API Result');
      if (!success || !successFiles) {
        router.push('/jira-projects');
      }
    };

    funct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderedList !== null) {
      // console.log(orderedList, 'Ordered List');
      setLoading(false);
    }
  }, [orderedList]);

  useEffect(() => {
    if (files) {
      console.log(
        files.find((item) => item.jiraProject === id),
        'the File'
      );
      setFile(files.find((item) => item.jiraProject === id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
  useEffect(() => {
    if (file && file?.fieldDetails) {
      console.log('I am setting Files via File Object');
      setOrderedList(file.fieldDetails);
    } else if (fieldsList.length > 0) {
      console.log('I am setting Files via jira Object');
      setOrderedList(extractProjectDetailsAndIssueFields(fieldsList));
    }
  }, [fieldsList, file]);

  // function renderRow({ index, style }) {
  //   return (
  //     <Card key={index} style={style}>
  //       <Box sx={{ flexGrow: 1 }}>
  //         <Grid direction="row" container spacing={2}>
  //           <Grid item xs={7}>
  //             <ListItemText primary={orderedList.distinctIssueFields[index].name} />
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     </Card>
  //   );
  // }
  // renderRow.propTypes = {
  //   index: PropTypes.number,
  //   style: PropTypes.any,
  // };
  //
  // function renderRowSkeleton({ index, style }) {
  //   return (
  //     <ListItem key={index} style={style} alignItems="flex-start" componen="div" divider>
  //       <Box sx={{ flexGrow: 1 }}>
  //         {/* <ListItemText primary={orderedList.distinctIssueFields[index]} /> */}
  //         <Skeleton width="100%" height={20} />
  //       </Box>
  //     </ListItem>
  //   );
  // }
  // renderRowSkeleton.propTypes = {
  //   index: PropTypes.number,
  //   style: PropTypes.any,
  // };

  // const boxRef = useRef();
  // const getItemSize = (index) => 80 + (orderedList?.distinctIssueFields[index]?.value || 0) / 2;
  const handleSelectedValue = async (e, index) => {
    setFieldLoading({ loading: true, index });
    const selectedValue = e.target.value;
    const allFields = [...orderedList.distinctIssueFields];
    const objectToReplace = allFields[index];

    if (objectToReplace) {
      // Iterate through allowedValues to update selected property
      objectToReplace.allowedValues.forEach((item) => {
        item.selected = item.id === selectedValue;
      });

      const success = await api.setFieldsDataForProject(file._id, {
        projectDetails: orderedList.projectDetails,
        distinctIssueFields: allFields,
      });
      setFieldLoading({ loading: false, index });
      if (success) {
        setOrderedList({ ...orderedList, distinctIssueFields: allFields });
        toast(`Field Selection has been updated`, {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'light',
          type: 'success',
        });
        return;
      }
      toast(`Something went wrong while executing the update`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'light',
        type: 'error',
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>{orderedList ? orderedList.projectDetails.name : 'Project Fields List'}</title>
      </Helmet>
      <Container>
        <ToastContainer />
        <SkeletonTheme duration={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Box display="flex" alignItems="center" flexDirection="row">
              <Tooltip title="Go back to JIRA Projects">
                <IconButton onClick={() => router.push('/jira-projects')}>
                  <Iconify icon="ic:baseline-arrow-back-ios-new" />
                </IconButton>
              </Tooltip>
              {!loading ? (
                <Avatar
                  sx={{ marginRight: 1 }}
                  alt={orderedList.projectDetails.key}
                  src={orderedList.projectDetails.avatarUrls['48x48']}
                />
              ) : (
                <Skeleton borderRadius={25} height={50} width={50} style={{ marginRight: '5px' }} />
              )}
              {/* <Iconify icon="mdi:jira" sx={{ color: 'primary.main', marginRight: 1 }} width={40} /> */}
              <Typography variant="h4">
                {!loading ? (
                  `${orderedList.projectDetails.key}-${orderedList.projectDetails.name} (Required Fields Only)`
                ) : (
                  <Skeleton height={40} width={200} />
                )}
              </Typography>
            </Box>
          </Stack>
          {orderedList !== null &&
            orderedList.distinctIssueFields.map((field, index) => (
              // console.log(index, field);
              <Card sx={{ marginBottom: 2 }} key={field.key}>
                <Box sx={{ flexGrow: 1, padding: 2 }}>
                  <Grid direction="row" container spacing={2}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        mb={5}
                      >
                        <Box display="flex" flexDirection="column">
                          <Typography variant="h6">{`${field.name}`}</Typography>
                          <Typography variant="subtitle1">{`${field.key}`}</Typography>
                          {field.hasDefaultValue && field.defaultValue && (
                            <Typography variant="subtitle2">{`Default Value: ${
                              isArray(field.defaultValue)
                                ? field.defaultValue[0].value
                                : field.defaultValue.value
                            }`}</Typography>
                          )}
                        </Box>
                        {field.required && (
                          <Box
                            display="flex"
                            flexDirection="column"
                            sx={{ width: '40%', alignItems: 'flex-end' }}
                          >
                            <Box
                              display="flex"
                              flexDirection="row"
                              sx={{ width: '100%', justifyContent: 'flex-end' }}
                            >
                              {fieldLoading.loading && fieldLoading.index === index ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ marginBottom: 2 }}
                                  color="primary"
                                  // determinate={false}
                                  variant="indeterminate"
                                />
                              ) : (
                                <Label color="error" mb={2} sx={{ width: '75px' }}>
                                  Required
                                </Label>
                              )}
                            </Box>
                            {field.allowedValues &&
                              (field.schema.type === 'option' || field.schema.type === 'array') && (
                                <FormControl fullWidth>
                                  <InputLabel id={`${field.name}-form-label`}>
                                    {field.name}
                                  </InputLabel>
                                  <Select
                                    labelId={`${field.name}-form-label`}
                                    id={`${field.name}-form-input`}
                                    label={field.name}
                                    value={
                                      field.allowedValues.find((selected) => selected.selected)
                                        ?.id || ''
                                    }
                                    onChange={async (e) => handleSelectedValue(e, index)}
                                  >
                                    {field.allowedValues.map((value) => (
                                      <MenuItem key={value.id} value={value.id}>
                                        {value.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              )}
                          </Box>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            ))}
          {/* <Box ref={boxRef} sx={{ width: '100%', height: '56vh', bgColor: 'background.paper' }}> */}
          {/*  <VariableSizeList */}
          {/*    height={boxRef.current ? boxRef.current.clientHeight : 400} */}
          {/*    width="100%" */}
          {/*    itemSize={getItemSize} */}
          {/*    itemCount={orderedList == null ? 10 : orderedList.distinctIssueFields.length} */}
          {/*    overscanCount={5} */}
          {/*  > */}
          {/*    {loading ? renderRowSkeleton : renderRow} */}
          {/*  </VariableSizeList> */}
          {/* </Box> */}
        </SkeletonTheme>
      </Container>
    </>
  );
}
