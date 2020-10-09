import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'

export const LOAD_ROLES = '[Roles] LOAD_USERS';
export function loadRoles(){
  return { type: LOAD_ROLES }
}

export const LOAD_ROLES_SUCCESS = '[Roles] LOAD_ROLES_SUCCESS';
export function loadRolesSuccess(roles){
  return { type: LOAD_ROLES_SUCCESS, roles }
}

export const LOAD_ROLES_FAILED = '[Roles] LOAD_ROLES_FAILED';
export function loadRolesFailed(error){
  return { type: LOAD_ROLES_FAILED, error }
}

export function fetchRoles(){
    return async function(dispatch, getState){
      dispatch(loadRoles())
  
      try{
        let url = `${window.config.API_URL}get_all_rol`
        url += '?' + toQueryString({page: 1})

        const res = await axios.get(url, {
          headers: { token: getAuthHeaders(getState()) },
          token: getAuthHeaders(getState())
        });
  
        if(res.status === 200){
          dispatch(loadRolesSuccess(res.data.data))
        }else{
          dispatch(loadRolesFailed(res.statusText))
        }
      }catch(err){
        dispatch(loadRolesFailed(err))
      }
    }
  }