import axios from 'axios';

export {getAllUsers, getUserById, createUser, updateUser};

function getAllUsers() {
  const url = '/user';
  return axios.get(url).then(response => response.data);
}

function getUserById(id) {
  const url = '/user/' + {id};
  return axios.get(url).then(response => response.data);
}

function createUser(user) {
  const url = '/user';
  return axios.post(url, user).then(response => response.data);
}

function updateUser(user) {
  const url = '/user/' + user.id;
  return axios.put(url, user).then(response => response.data);
}
