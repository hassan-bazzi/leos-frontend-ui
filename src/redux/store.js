import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import reducers
import user from './reducers/user.reducer';
import cart from './reducers/cart.reducer';
import menu from './reducers/menu.reducer';

// combine reducers
const rootReducer = combineReducers({
  user,
  menu,
  cart
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
