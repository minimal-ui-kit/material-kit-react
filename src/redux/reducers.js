import {
  SET_WBS,
  SET_USER,
  SET_FILES,
  SET_RESOURCES,
  FIELDS_DETAILS,
  SET_ISSUE_TYPES,
  SET_AUTHENTICATED,
  SET_JIRA_PROJECTS,
} from './actions';

const initialState = {
  user: { name: 'name', email: 'name@xyz.com' },
  isAuthenticated: localStorage.getItem('isAuthenticated') === '1',
  files: [],
  wbs: [],
  jiraProjects: {
    isLast: false,
    maxResults: 0,
    nextPage: '',
    self: '',
    startAt: 0,
    total: 0,
    values: [],
  },
  issueTypes: [],
  resources: [],
  fieldsDetails: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case SET_FILES:
      return { ...state, files: [...action.payload] };
    case SET_WBS:
      return { ...state, wbs: [...action.payload] };
    case SET_JIRA_PROJECTS:
      return { ...state, jiraProjects: action.payload };
    case SET_ISSUE_TYPES:
      return { ...state, issueTypes: [...action.payload] };
    case SET_RESOURCES:
      return { ...state, resources: [...action.payload] };
    case FIELDS_DETAILS:
      return { ...state, fieldsDetails: [...action.payload] };
    default:
      return state;
  }
};

export default appReducer;
