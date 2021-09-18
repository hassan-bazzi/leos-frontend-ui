import { getMenuRequest } from '../../requests/menu';
import actionMaker from '../util/action-maker';

export const actionTypes = {
  GET_MENU: 'GET_MENU'
}

export const getMenu = () => {
  const { request, success, failure } = actionMaker(actionTypes.GET_MENU);

  return dispatch => {
    dispatch(request());
    getMenuRequest().then((response) => {
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

