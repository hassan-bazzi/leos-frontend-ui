import { actionTypes } from '../actions/cart.actions';

const initialState = {
  loading: false,
  error: false,
  id: false,
  billingDetails: {},
  totalPrice: 0,
  items: [],
  quantity: 1
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.GET_CART + '_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        id: action.payload.id,
        billingDetails: action.payload.billingDetails,
        totalPrice: parseFloat(action.payload.totalPrice),
        items: action.payload.items,
        quantity: action.payload.items.length
      }
    }
    case actionTypes.GET_CART + '_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.ADD_ITEM + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.ADD_ITEM + '_SUCCESS': {
      state.items.push(action.payload);
      return {
        ...state,
        loading: false,
        error: false,
        items: state.items
      }
    }
    case actionTypes.ADD_ITEM + '_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.UPDATE_CART + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.UPDATE_CART + '_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        totalPrice: action.payload.totalPrice,
        items: action.payload.items
      }
    }
    case actionTypes.UPDATE_CART + '_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.DEL_ITEM + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.DEL_ITEM + '_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: false,
        totalPrice: parseFloat(state.totalPrice) - parseFloat(state.items[action.payload].price * state.items[action.payload].quantity),
        items: state.items.filter((item, index) => index !== action.payload)
      }
    }
    case actionTypes.DEL_ITEM + '_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.CLEAR_CART + '_REQUEST': {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.CLEAR_CART + '_SUCCESS': {
      return initialState;
    }
    case actionTypes.CLEAR_CART + '_ERROR': {
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

export default cart;
