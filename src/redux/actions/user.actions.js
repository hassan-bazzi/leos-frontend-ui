import { loginRequest, getUserRequest } from '../../requests/auth';
import { putToken, deleteToken } from '../../util/storage';
import actionMaker from '../util/action-maker';

export const actionTypes = {
  GET_USER: 'GET_USER',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER'
}

export const getUser = () => {
  const { request, success, failure } = actionMaker(actionTypes.GET_USER);

  return dispatch => {
    dispatch(request());

    getUserRequest().then((response) => {
      if (response.code !== undefined && response.code !== 200) {
        dispatch(failure());
      } else {
        dispatch(success(response.data));
      }
    }).catch(() => {
      dispatch(failure());
    })
  }
}

export const loginUser = (username, password) => {
  const { request, success, failure } = actionMaker(actionTypes.LOGIN_USER);

  return dispatch => {
    dispatch(request({ username }));
    loginRequest(username, password).then((response) => {
      if (response.code !== undefined && response.code !== 200) {
        switch (response.code) {
          case 400:
            dispatch(failure('Password incorrect'));
            break;
          case 404:
            dispatch(failure('User not found'));
            break;
          default:
            dispatch(failure('Something went wrong. Try again'));
        }
      } else {
        putToken(response.token);
        dispatch(success(response.data));
      }
    })
  }
}

export const logoutUser = () => {
  const { request, success, failure } = actionMaker(actionTypes.LOGOUT_USER);

  return dispatch => {
    dispatch(request());

    try {
      deleteToken();
      dispatch(success());
    } catch (err) {
      dispatch(failure('Something went wrong. Try again'));
    }
  }
}