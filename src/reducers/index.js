import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'
import roles from './roles.reducer.js'

const reducers = combineReducers({
    auth,
    users,
    roles
  });
  
  export default reducers;