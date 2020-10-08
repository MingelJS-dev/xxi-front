import axios from 'axios'
import { createAction } from '../utils.js'
import history from '../history.js'

export const [ LOGIN, login ] = createAction('[Auth] LOGIN')
export const [ LOGIN_SUCCESS, loginSuccess ] = createAction('[Auth] LOGIN_SUCCESS', ['data'])
export const [ LOGIN_FAILED, loginFailed ] = createAction('[Auth] LOGIN_FAILED', ['error'])

export const [ SET_USER, SetUser ] = createAction('[Auth] SET_USER', ['user'])
export const [ LOGOUT, Logout ] = createAction('[Auth] LOGOUT')

export const [ LOAD_COMPANY, loadCompany ] = createAction('[Auth] LOAD_COMPANY')
export const [ LOAD_COMPANY_SUCCESS, loadCompanySuccess ] = createAction('[Auth] LOAD_COMPANY_SUCCESS', ['company'])
export const [ LOAD_COMPANY_FAILED, loadCompanyFailed ] = createAction('[Auth] LOAD_COMPANY_FAILED', [''])

export function startLogin(email, password){
  return async function(dispatch, getState){
    dispatch(login())

    try{
      const res = await axios.post(window.config.API_URL + 'login', {
        email,
        password
      });

      if(res.status === 200){
        dispatch(loginSuccess(res.data.access_token))
        sessionStorage.setItem('sessionData', JSON.stringify(res.data.access_token));
      }else{
        dispatch(loginFailed(res.statusText))
      }
    }catch(err){
      dispatch(loginFailed(err))
    }
  }
}

export function startLogout(){
  return async function(dispatch){
    dispatch(Logout())
      sessionStorage.removeItem('sessionData');
  }
}


