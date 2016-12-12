import { combineReducers } from 'redux';

import ShoppingCartReducer from './ShoppingCartReducer';

/* Similar to actions index file, here we can combine reducers
 * and give them custom names (i.e. shoppingCart) for readability */
export default rootReducer = combineReducers({
  shoppingCart: ShoppingCartReducer
});