import { actionTypes } from '../actions/user.actions';

const initialState = {
  loading: true,
  loggedIn: false,
  error: false,
  user: undefined
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER + '_REQUEST': {
      return {
        ...state,
        loading: true,
        error: false,
        loggedIn: false
      }
    }
    case actionTypes.GET_USER + '_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        loggedIn: true
      }
    }
    case actionTypes.GET_USER + '_ERROR': {
      return {
        ...state,
        loading: false,
        loggedIn: false
      }
    }
    case actionTypes.LOGIN_USER + '_REQUEST': {
      return {
        ...state,
        loading: true,
        error: false,
        loggedIn: false
      }
    }
    case actionTypes.LOGIN_USER + '_SUCCESS': {
      return {
        user: action.payload,
        loading: false,
        error: false,
        loggedIn: true,
      }
    }
    case actionTypes.LOGIN_USER + '_ERROR': {
      return {
        loading: false,
        error: action.error,
        loggedIn: false,
      }
    }
    case actionTypes.LOGOUT + '_REQUEST': {
      return {
        ...state,
        loading: true,
        error: false,
        loggedIn: true
      }
    }
    case actionTypes.LOGOUT + '_SUCCESS': {
      return {
        user: undefined,
        loading: false,
        error: false,
        loggedIn: false,
      }
    }
    case actionTypes.LOGOUT + '_ERROR': {
      return {
        loading: false,
        error: action.error,
        loggedIn: true,
      }
    }
    default: {
      return state;
    }
  }
};

export default user;
