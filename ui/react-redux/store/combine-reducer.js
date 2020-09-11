import { combineReducers } from 'redux';

import authReducer from '../reducers/auth-reducer';

const rootReducer = combineReducers({
    authReducer
});

export default rootReducer;

