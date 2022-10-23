import axios from '../axios.js';
// import axios from "axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', { email: userEmail, password: userPassword });
  // return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', { email, password });
};

const getAllUsersApi = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserApi = (data) => {
  return axios.post('/api/create-new-user', data);
};

const deleteUserApi = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } });
};

const editUserApi = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};

const postDetailDoctor = (data) => {
  return axios.post('/api/save-info-doctor', data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

export {
  handleLoginApi,
  getAllUsersApi,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  postDetailDoctor,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
};
