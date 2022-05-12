import axios from '../axios.js';
// import axios from "axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', { email: userEmail, password: userPassword });
  // return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', { email, password });
};

const getAllUsersApi = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserApi = (data) => {
  return axios.post('/api/create-new-user', data)
}

const deleteUserApi = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } })
}

const editUserApi = (inputData) => {
  return axios.put('/api/edit-user', inputData)
}

export { handleLoginApi, getAllUsersApi, createNewUserApi, deleteUserApi, editUserApi };