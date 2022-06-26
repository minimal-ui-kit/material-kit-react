/* eslint-disable */

// ----------------------------------------------------------------------
const axios = require('axios');
var userObject = {
  "lastName": "string",
  "firstName": "string",
  "email": "string",
  "occupation": "string",
  "online": 0,
  "tagID": "string",
  "gender": "string",
  "ethnicity": "string",
  "username": "string",
  "biometricID": "string",
  "faceID": "string",
  "password": "string",
  "tenantID": 0
}
const addUsers = async ({userObject}) => {
  try {
    const response = await axios.post('https://gct-ac-api.herokuapp.com/registeruser',{userObject});

    // var sql = `INSERT INTO UserTbl
    // (tenantID, lastName, firstName, email, occupation, online, tagID, hours, temperature, gender, ethnicity, accessType, status, username, password, biometricID, faceID) VALUES 
    // (${userObject.tenantID}, '${userObject.lastName}', '${userObject.firstName}', '${userObject.email}', '${userObject.occupation}', ${userObject.online}, '${userObject.tagID}', '${defaultZero}', ${defaultZero}, '${userObject.gender}', '${userObject.ethnicity}', ${defaultZero}, ${defaultZero}, '${userObject.username}', '${userObject.password}', '${userObject.biometricID}',' ${userObject.faceID}') `;

  } catch (err) {
    console.log(err);
    throw err;
  }
};
const userArray = addUsers({userObject});

export default userArray;
