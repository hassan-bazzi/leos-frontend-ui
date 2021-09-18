import { actionTypes } from '../actions/menu.actions';

const initialState = {
  loading: true,
  error: false,
  menu: undefined,
};

const menu = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.GET_MENU + '_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        menu: action.payload
      }
    }
    case actionTypes.GET_MENU + '_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    default: {
      return state;
    }
  }
};

export default menu;
