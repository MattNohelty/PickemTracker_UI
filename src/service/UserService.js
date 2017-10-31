import axios from 'axios';

export {getAllUsers, getUserById};

function getAllUsers() {
  const url = '/user';
  return axios.get(url).then(response => response.data);
}

function getUserById(id) {
  const url = '/user/' + {id};
  return axios.get(url).then(response => response.data);
}
