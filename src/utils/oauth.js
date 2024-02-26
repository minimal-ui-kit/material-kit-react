import axios from 'axios';
import auth0 from 'auth0-js';

// Your Auth0 setup
const webAuth = new auth0.WebAuth({
  domain: 'YOUR_AUTH0_DOMAIN_--_ASI_API_KEY',
  clientID: 'YOUR_CLIENT_ID',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://api.example.com',
  responseType: 'token id_token',
  scope: 'openid profile',
});
// TODO: setup etsy redirect uri

// Login function
export function login() {
  webAuth.authorize();
}

// Logout function
export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('refresh_token'); // Remove the refresh token too
}

// Check if the user is authenticated
export function isAuthenticated() {
  const accessToken = localStorage.getItem('access_token');
  const idToken = localStorage.getItem('id_token');
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return accessToken && idToken && new Date().getTime() < expiresAt;
}

// Handle the callback to extract the tokens
webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
  if (authResult && authResult.accessToken && authResult.idToken) {
    setSession(authResult);
    window.location.hash = '';
    axios.defaults.headers.common.Authorization = `Bearer ${authResult.accessToken}`;
    // Now you can make authenticated requests using Axios
  } else if (err) {
    console.log(err);
    alert(`Error: ${err.error}. Check the console for further details.`);
  }
});

// Function to save tokens to local storage
function setSession(authResult) {
  const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
  localStorage.setItem('refresh_token', authResult.refreshToken); // Store the refresh token
}

// Function to refresh the access token
export function getRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    // If there is no refresh token, the user needs to log in again
    login();
  }

  // Make a POST request to the token endpoint with the refresh token
  axios
    .post('https://api.example.com/v3/public/oauth/token', {
      grant_type: 'refresh_token',
      client_id: 'YOUR_CLIENT_ID',
      refresh_token: refreshToken,
    })
    .then((response) => {
      // Save the new tokens to local storage
      setSession({
        accessToken: response.data.access_token,
        idToken: response.data.id_token,
        expiresIn: response.data.expires_in,
        refreshToken, // Refresh token stays the same
      });
    })
    .catch((error) => {
      console.error('Error refreshing token:', error);
      alert('Error refreshing token. Please log in again.');
      logout();
    });
}

// Intercept Axios requests to check if the token needs refreshing
axios.interceptors.request.use(
  async (config) => {
    if (isAuthenticated()) {
      return config;
    }
    await getRefreshToken();
    return new Promise((resolve) => {
      // Return a promise that resolves when the token is refreshed
      const interval = setInterval(() => {
        if (isAuthenticated()) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    }).then(() => axios(config)); // Retry the original request after the token is refreshed
  },
  (error) => Promise.reject(error)
);


