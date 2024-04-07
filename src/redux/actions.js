// actions.js
import axios from 'axios';

export const SET_USER = 'SET_USER';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_FILES = 'SET_FILES';
export const SET_WBS = 'SET_WBS';

export const SET_JIRA_PROJECTS = 'SET_JIRA_PROJECTS';

export const SET_ISSUE_TYPES = 'SET_ISSUE_TYPES';

export const SET_RESOURCES = 'SET_RESOURCES';

export const FIELDS_DETAILS = 'FIELDS_DETAILS';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setResources = (resources) => ({
  type: SET_RESOURCES,
  payload: resources,
});

export const setAuthenticated = (isAuthenticated) => ({
  type: SET_AUTHENTICATED,
  payload: isAuthenticated,
});

export const setFiles = (files) => ({
  type: SET_FILES,
  payload: files,
});

export const setWBS = (wbs) => ({
  type: SET_WBS,
  payload: wbs,
});

export const setIssueTypes = (issueTypes) => ({
  type: SET_ISSUE_TYPES,
  payload: issueTypes,
});

export const setJiraProjects = (jProjects) => ({
  type: SET_JIRA_PROJECTS,
  payload: jProjects,
});

export const setFieldsDetails = (fieldsDetails) => ({
  type: FIELDS_DETAILS,
  payload: fieldsDetails,
});

// Here APIs data starts
const baseURLLocalhost = import.meta.env.VITE_BASE_URL;

export const syncJiraUsers = () => async (dispatch) => {
  console.log('Sync Users on Jira');
  try {
    const sync = await axios.get(`${baseURLLocalhost}/jira-cruds/sync-jira-ids`);
    if (sync.data) {
      await fetchResources();
      return sync.data;
    }
    return { synced: false, count: 0 };
  } catch (e) {
    console.log(e);
    return { synced: false, count: 0 };
  }
};
export const getProjectsFieldsDetails = (projectId) => async (dispatch) => {
  console.log(`Fetching Fields Details for the project ${projectId}`);
  try {
    const queries = {
      query: `projectIds=${projectId}&expand=projects.issuetypes.fields`,
    };
    const details = await axios.post(`${baseURLLocalhost}/jira-cruds/issues-by-project`, queries);
    if (details.data) {
      await dispatch(setFieldsDetails(details.data.projects));
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createTicket = (data) => async (dispatch) => {
  console.log('Creating user selected WBS tickets');
  try {
    const request = await axios.post(`${baseURLLocalhost}/jira-cruds/create-tickets`);
    if (request.data) {
      return { success: true, response: request.data };
    }
    return { success: false };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

export const setFieldsDataForProject = (projectId, data) => async (dispatch) => {
  console.log(`Saving the Fields data for the following doc: ${projectId} for the data: ${data}`);
  try {
    const request = await axios.patch(`${baseURLLocalhost}/files/jira-fields/${projectId}`, data);
    if (request.data && request.data.updated) {
      await fetchFileDB();
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const syncUser = (resource) => async (dispatch) => {
  console.log(`Syncing user:${resource.name} with Jira`);
  try {
    const verify = await axios.post(`${baseURLLocalhost}/jira-cruds/sync-user`, resource);
    if (verify.data && verify.data.updated) {
      await fetchResources();
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const verifyEmail = (email) => async (dispatch) => {
  console.log(`Verifying Email:${email}`);
  try {
    const verify = await axios.get(`${baseURLLocalhost}/jira-cruds/user-by-email/${email}`);
    if (verify.data && verify.data.length > 0) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const fetchResources = () => async (dispatch) => {
  console.log('Fetching Resources');

  try {
    const resources = await axios.get(`${baseURLLocalhost}/resource`);
    if (resources.data) {
      await dispatch(setResources(resources.data));
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchJiraProjects = (query) => async (dispatch) => {
  console.log('Fetch Files');
  try {
    const projects = await axios.post(`${baseURLLocalhost}/jira-cruds/projects`, { query });
    if (projects.data) {
      await dispatch(setJiraProjects(projects.data));
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchIssueTypes = (projectId) => async (dispatch) => {
  console.log(`Fetching Issue Types for ${projectId}`);
  try {
    const issueTypes = await axios.get(`${baseURLLocalhost}/jira-cruds/issue-types/${projectId}`);
    if (issueTypes.data) {
      dispatch(setIssueTypes(issueTypes.data));
    }
    return true;
  } catch (e) {
    return false;
  }
};
export const fetchToken = (code) => async (dispatch) => {
  console.log('Fetching Token via Code');
  try {
    const authorized = await axios.post('https://auth.atlassian.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      code,
      redirect_uri: 'http://localhost:3030/login',
    });

    if (authorized?.data) {
      localStorage.setItem('token', authorized.data.access_token);
      localStorage.setItem('expires_in', authorized.data.expires_in);
      localStorage.setItem('scope', authorized.data.scope);
      axios.defaults.headers.common.Authorization = `Bearer ${authorized.data.access_token}`;
      return true;
    }
    console.log('Code and token expired');
    return false;
  } catch (error) {
    console.error('Error fetching token:', error);
    return false;
  }
};

export const setProjectId = (fileId, projectId) => async (dispatch, getState) => {
  console.log(`update File id ${fileId} with project ID ${projectId}`);
  const updateFile = await axios.patch(`${baseURLLocalhost}/files/jira-project/${fileId}`, {
    fileId,
    projectId,
  });
  if (updateFile.data.updated) {
    const { files } = getState();
    const updatedFiles = [...files];
    updatedFiles.find((item) => item._id === fileId).jiraProject = projectId;
    dispatch(setFiles(updatedFiles));
  }
  return updateFile.data;
};

export const checkToken = () => async (dispatch) => {
  console.log('Check token');
  const userData = await axios.get('https://api.atlassian.com/me').catch((e) => console.log(e));
  if (userData?.data) {
    console.log('Token verified, returning back');
    return true;
  }

  console.log('Fetching token by code, as it expired');
  const code = localStorage.getItem('code');
  const tokenBool = await dispatch(fetchToken(code));

  if (tokenBool) {
    console.log(tokenBool, 'Token Fetched');
    await dispatch(checkToken());
  }

  console.log('Token verifying failed, logging out');
  localStorage.setItem('isAuthenticated', '0');
  dispatch(setAuthenticated(false));
  return false;
};

export const fetchUser = () => async (dispatch) => {
  if (await dispatch(checkToken())) {
    console.log('Token verified, fetching user data');
    try {
      const userData = await axios.get('https://api.atlassian.com/me');
      if (userData.data) {
        localStorage.setItem('isAuthenticated', '1');
        dispatch(setAuthenticated(true));
        dispatch(setUser(userData.data));
        return true;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  return false;
};

export const fetchFileDB = () => async (dispatch) => {
  try {
    console.log('Fetch Files from DB');
    const filesDB = await axios.get(`${baseURLLocalhost}/files`);
    if (filesDB.data) {
      console.log('Files Set');
      dispatch(setFiles([...filesDB.data]));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching files:', error);
    return false;
  }
};

export const uploadFile = (formData) => async (dispatch) => {
  try {
    const upload = await axios.post(`${baseURLLocalhost}/files/upload`, formData);
    if (upload.data) {
      dispatch(setFiles(upload.data.files));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: error.response.data.error, message: error.response.data.message };
  }
};

export const updateFile = (id, formData) => async (dispatch) => {
  try {
    const upload = await axios.patch(`${baseURLLocalhost}/files/${id}`, formData);
    if (upload.data) {
      dispatch(setFiles(upload.data.files));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: error.response.data.error, message: error.response.data.message };
  }
};

export const fetchWBSDb = (id) => async (dispatch) => {
  try {
    const wbsDB = await axios.get(`${baseURLLocalhost}/wbs/file/${id}`);
    if (wbsDB.data) {
      dispatch(setWBS([...wbsDB.data]));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching WBS items:', error);
    return false;
  }
};

export const deleteFile = (id) => async (dispatch, getState) => {
  try {
    const fileDelete = await axios.delete(`${baseURLLocalhost}/files/${id}`);
    if (fileDelete.data) {
      console.log('File and WBS Deleted');
      const { files } = getState();
      dispatch(setFiles([...files.filter((item) => item._id !== id)]));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};
