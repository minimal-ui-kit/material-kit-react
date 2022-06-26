/* eslint-disable */

import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------
const axios = require('axios');

const getUsers = async () => {
  try {
    const response = await axios.get('https://gct-ac-api.herokuapp.com/userdetails');
    const resp = await response;
    console.log(resp.data);
    const res = [...resp.data].map((_, index) => ({
      id: _.tenantID,
      avatarUrl: mockImgAvatar(index + 1),
      name: _.firstName +' '+ _.lastName,
      company: _.occupation,
      status: _.status,
      ethnicity: _.ethnicity,
      email: _.email,
      hours: _.hours,
      gender: _.gender,
      username: _.username
    }));
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const userArray = getUsers();

export default userArray;
