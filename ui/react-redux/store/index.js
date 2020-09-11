import { createStore, applyMiddleware } from 'redux';

import rootReducer from './combine-reducer';

const store = createStore(rootReducer);

export default store;
