import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import history from '../history.js'

import { updateNotification } from './notifications.actions.js'

export const LOAD_USERS = '[Users] LOAD_USERS';
export function loadUsers(){
  return { type: LOAD_USERS }
}

export const LOAD_USERS_SUCCESS = '[Users] LOAD_USERS_SUCCESS';
export function loadUsersSuccess(users){
  return { type: LOAD_USERS_SUCCESS, users }
}

export const LOAD_USERS_FAILED = '[Users] LOAD_USERS_FAILED';
export function loadUsersFailed(error){
  return { type: LOAD_USERS_FAILED, error }
}

export const LOAD_CURRENT_USER = '[Users] LOAD_CURRENT_USER';
export function loadCurrentUser(){
  return { type: LOAD_CURRENT_USER }
}

export const LOAD_CURRENT_USER_FAILED = '[Users] LOAD_CURRENT_USER_FAILED';
export function loadCurrentUserFailed(){
  return { type: LOAD_CURRENT_USER_FAILED }
}

export const LOAD_CURRENT_USER_SUCCESS = '[Users] LOAD_CURRENT_USER_SUCCESS';
export function loadCurrentUserSuccess(user){
  return { type: LOAD_CURRENT_USER_SUCCESS, user }
}

export const UPDATE_ONE = '[Users] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Users] UPDATE_ONE_FAILED';
export function updateOneFailed(error, UserId){
  return { type: UPDATE_ONE_FAILED, error, UserId }
}

export const UPDATE_ONE_SUCCESS = '[Users] UPDATE_ONE_SUCCESS';
export function updateOneSucess(user){
  return { type: UPDATE_ONE_SUCCESS, user }
}


export const CREATE = '[Users] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Users] CREATE_SUCCESS';
export function createSuccess(user){
  return { type: CREATE_SUCCESS, user }
}

export const CREATE_FAILED = '[Users] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const [ UPDATE_PAGINATION, updatePagination ] = createAction('[Users] UPDATE_PAGINATION', ['headers'])

export const [ LOAD_ROLES, loadRoles ] = createAction('[Users] LOAD_ROLES')
export const [ LOAD_ROLES_SUCCESS, loadRolesSucess ] = createAction('[Users] LOAD_ROLES_SUCCESS', ['data'])
export const [ LOAD_ROLES_FAILED, loadRolesFailed ] = createAction('[Users] LOAD_ROLES_FAILED', ['error'])

export function fetchUsers(filters = {}){
  return async function(dispatch, getState){
    dispatch(loadUsers())

    try{
      let url = `${window.config.API_URL}users`

      if( Object.keys(filters).length ){
        url += '?' + toQueryString(filters)
      }

      const res = await axios.get(url, {
        headers: getAuthHeaders(getState())
      });

      if(res.status === 200){
        dispatch(updatePagination(res.headers)) 
        dispatch(loadUsersSuccess(res.data.result))
      }else{
        dispatch(loadUsersFailed(res.statusText))
      }
    }catch(err){
      dispatch(loadUsersFailed(err))
    }
  }
}

export function fetchCurrentUser(){
  return async function(dispatch, getState){
    dispatch(loadCurrentUser());

    try{
      const res = await axios.get(window.config.API_URL + 'users/me', {
        headers: getAuthHeaders(getState())
      });

      if( res.status === 200 ){
        dispatch(loadCurrentUserSuccess(res.data.result))
      }else{
        dispatch(loadCurrentUserFailed(res))
      }

    }catch(err){
      console.log(err)
      dispatch(loadCurrentUserFailed(err))
    }

  }
}

export function updateUserById(data){
  return async function(dispatch, getState){
    dispatch(updateOne(data))

    try{
      const res = await axios.put(window.config.API_URL + 'users/' + data.id,
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 200 ){
        dispatch(updateOneSucess(res.data.result))
        dispatch(updateNotification('Usuario actualizado correctamente', 'success'))
      }else{
        dispatch(updateOneFailed(res, data.id))
        dispatch(updateNotification('Hubo un error al actualizar el usuario', 'danger'))
      }

    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al actualizar el usuario', 'danger'))
      dispatch(updateOneFailed(error, data.id))
    }
  }
}

export function createUser(data){
  return async function(dispatch, getState){
    dispatch(create(data))
    console.log('asdasdasdsa', window)
    try{
      const res = await axios.post(window.config.API_URL + 'user_create',
        data,
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 200 ){
        dispatch(createSuccess(res.data.result.data))
        history.push('/users')
        dispatch(updateNotification('Usuario creado correctamente', 'success'))
      }else{
        dispatch(createFailed(res))
        dispatch(updateNotification('Hubo un error al crear el usuario', 'danger'))
      }
    }catch(error){
      console.log('error:', error)
      dispatch(updateNotification('Hubo un error al crear el usuario', 'danger'))
      dispatch(createFailed(error))
    }
  }
}

export function updateUserStatus(UserId, status){
  return async function(dispatch, getState){
    dispatch(updateOne({ id: UserId }))

    try{
      const res = await axios.post(window.config.API_URL + `users/${UserId}/${status}`,
        {},
        {
          headers: getAuthHeaders(getState())
        }
      );

      if( res.status === 200 ){
        dispatch(updateOneSucess(res.data.result))
        dispatch(updateNotification('Usuario actualizado!', 'success'))
      }else{
        dispatch(updateOneFailed(res))
      }
    }catch(error){
      dispatch(updateOneFailed(error))
    }
  }
}

export function fetchRoles(){
  return async function(dispatch, getState){
    dispatch(loadRoles())

    try{
      let url = `${window.config.API_URL}users/roles`

      const res = await axios.get(url, {
        headers: getAuthHeaders(getState())
      });

      if(res.status === 200){
        dispatch(loadRolesSucess(res.data.result))
      }else{
        console.error(res);
        dispatch(loadRolesFailed(res))
      }
    }catch(err){
      console.error(err);
      dispatch(loadRolesFailed(err))
    }
  }
}

