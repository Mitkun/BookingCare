import actionTypes from './actionTypes';
import {
  getAllCodeService,
  createNewUserApi,
  getAllUsersApi,
  deleteUserApi,
  editUserApi,
  getTopDoctorHomeService,
  getAllDoctors,
  postDetailDoctor,
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log('fetchGenderStart error:', error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log('fetchPositionStart error:', error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_Position_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log('fetchRoleStart error:', error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserApi(data);
      if (res && res.errCode === 0) {
        toast.success('Create a new user succeed');
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Create a new user failed');
        dispatch(createUserFailed());
      }
    } catch (error) {
      toast.error('Create a new user failed');
      dispatch(createUserFailed());
      console.log('createUserFailed error:', error);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsersApi('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log('fetchUser error:', error);
    }
  };
};

export const fetchAllUsersSuccess = (usersData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: usersData,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserApi(userId);
      if (res && res.errCode === 0) {
        toast.success('Delete the user succeed');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Delete the user failed');
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error('Delete the user failed');
      dispatch(deleteUserFailed());
      console.log('createUserFailed error:', error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserApi(user);
      if (res && res.errCode === 0) {
        toast.success('Update the user succeed');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Update the user failed');
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error('Update the user failed');
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('10');
      console.log('res', res);
      if (res?.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};

//
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res?.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};

//
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await postDetailDoctor(data);
      if (res?.errCode === 0) {
        toast.success('Save Info detail doctor success');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error('Save Info detail doctor failed');
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      toast.error('Save Info detail doctor failed');
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

//
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService('TIME');
      if (res?.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
