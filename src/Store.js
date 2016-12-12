import { createStore } from 'redux';
import rootReducer from './reducers';

/* Here we could add some custom middleware like Thunk.
 * The point of it is to do something inbetween the data dispatches
 * For example asynchronous calls that have side effects */
const Store = createStore(rootReducer);

export default Store;