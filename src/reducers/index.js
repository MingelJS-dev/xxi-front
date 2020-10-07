import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'

const reducers = combineReducers({
    auth,
    users
  });
  
  export default reducers;