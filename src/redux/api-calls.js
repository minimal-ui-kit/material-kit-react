// useApi.js
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';

import {
  syncUser,
  fetchUser,
  deleteFile,
  fetchToken,
  fetchWBSDb,
  uploadFile,
  updateFile,
  fetchFileDB,
  verifyEmail,
  setProjectId,
  syncJiraUsers,
  fetchResources,
  fetchIssueTypes,
  fetchJiraProjects,
  setFieldsDataForProject,
  getProjectsFieldsDetails,
} from './actions';

export const useApi = () => {
  const dispatch = useDispatch();
  // const files = useSelector((state) => state.files);
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return {
    fetchToken: async (code) => dispatch(fetchToken(code)),
    // checkToken: async () => await dispatch(checkToken()),
    fetchUser: async () => dispatch(fetchUser()),
    fetchFileDB: async () => dispatch(fetchFileDB()),
    uploadFile: async (formData) => dispatch(uploadFile(formData)),
    fetchWBSDb: async (id) => dispatch(fetchWBSDb(id)),
    deleteFile: async (id) => dispatch(deleteFile(id)),
    fetchJiraProjects: async (query) => dispatch(fetchJiraProjects(query)),
    setProjectId: async (fileId, projectId) => dispatch(setProjectId(fileId, projectId)),
    fetchIssueTypes: async (projectId) => dispatch(fetchIssueTypes(projectId)),
    fetchResources: async () => dispatch(fetchResources()),
    syncJiraUsers: async () => dispatch(syncJiraUsers()),
    verifyEmail: async (email) => dispatch(verifyEmail(email)),
    syncUser: async (resource) => dispatch(syncUser(resource)),
    getProjectsFieldsDetails: async (projectId) => dispatch(getProjectsFieldsDetails(projectId)),
    setFieldsDataForProject: async (projectId, data) =>
      dispatch(setFieldsDataForProject(projectId, data)),
    updateFile: async (id, formData) => dispatch(updateFile(id, formData)),
  };
};
