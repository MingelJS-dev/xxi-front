import { combineReducers } from 'redux'
import auth from './auth.reducer.js'
import users from './users.reducer.js'
import roles from './roles.reducer.js'
import supplies from './supplies.reducer.js'
import notification from './notification.reducer.js'
import tables from "./tables.reducer.js"
import products from "./product.reducer.js"
import orders from "./orders.reducer.js"
import files from "./file.reducer.js"

const reducers = combineReducers({
    auth,
    users,
    roles,
    supplies,
    notification,
    tables,
    products,
    orders,
    files
  });
  
  export default reducers;