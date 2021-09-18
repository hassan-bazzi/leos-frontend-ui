import actionMaker from '../util/action-maker';
import formatCartUpdate from '../../util/formatters';
import { getCartRequest, updateCartRequest, clearCartRequest } from '../../requests/cart';
import store from '../store';

export const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  DEL_ITEM: 'DEL_ITEM',
  GET_CART: 'GET_CART',
  UPDATE_CART: 'UPDATE_CART',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TIP: 'ADD_TIP'
}

export const getCart = () => {
  const { request, success, failure } = actionMaker(actionTypes.GET_CART);

  return dispatch => {
    dispatch(request());
    getCartRequest().then((response) => {
      if (response.code !== undefined && response.code !== 200) {
        dispatch(failure(response.message));
      } else {
        dispatch(success(response));
      }
    }).catch(() => {
      dispatch(failure());
    })
  }
}

export const updateCart = () => {
  const { request, success, failure } = actionMaker(actionTypes.UPDATE_CART);

  return dispatch => {
    dispatch(request());
    updateCartRequest(store.getState().cart).then((response) => {
      if (response.code !== undefined && response.code !== 200) {
        dispatch(failure(response.message));
      } else {
        dispatch(success(response));
      }
    }).catch(() => {
      dispatch(failure());
    })
  }
}

export const clearCart = () => {
  const { request, success, failure } = actionMaker(actionTypes.CLEAR_CART);

  return dispatch => {
    dispatch(request());
    clearCartRequest().then((response) => {
      if (response.code !== undefined && response.code !== 200) {
        dispatch(failure(response.message));
      } else {
        dispatch(success(response));
      }
    }).catch(() => {
      dispatch(failure());
    })
  }
}

export const addItem = (item) => {
  const { request, success, failure } = actionMaker(actionTypes.ADD_ITEM);

  return dispatch => {
    dispatch(success(item));
    dispatch(updateCart());
  }
}

export const removeItem = (itemIndex) => {
  const { request, success, failure } = actionMaker(actionTypes.DEL_ITEM);

  return dispatch => {
    dispatch(success(itemIndex));
    dispatch(updateCart());
  }
}

