import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'
import roles from './roles.reducer.js'
import supplies from './supplies.reducer.js'
import notification from './notification.reducer.js'

const reducers = combineReducers({
    auth,
    users,
    roles,
    supplies,
    notification
  });
  
  export default reducers;