import decodeJWT from 'jwt-decode'
import { createSelector } from 'reselect'

import * as AuthActions from '../actions/auth.actions.js'
import * as UserActions from '../actions/users.actions.js'
import { defaultMenu } from '../app/shared/DefaultMenu.js'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: false,
  credentialsMsg: false,
  token: null,
  currentUser: null,
  company: null
}

export default function auth(state = INITIAL_STATE, action){
  switch(action.type){
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoggingIn: true
      }

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.access_token
      }

    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        credentialsMsg: true,
        token: null
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        credentialsMsg: false,
        token: null
      }

    case UserActions.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user
      }

    case AuthActions.LOAD_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.company
      }

    case AuthActions.LOAD_COMPANY_FAILED:
      return {
        ...state,
        credentialsMsg: false,
        company: {
          app_name: 'Restaurant XXI'
        }
      }

    default:
      return state;
  }
}

export const getCurrentUser = state => state.auth.currentUser;

export const getDecodedToken = state => {
  let decoded = {}

  if(state.auth.token){
    decoded = decodeJWT(state.auth.token)
  }

  return decoded;
}

// export const getSettings = state => {
//   const settings = state.auth.token ? decodeJWT(state.auth.token).settings : {}

//   settings.menu = (settings && settings.menu) ? settings.menu : {
//     departments: {
//       one: null,
//       many: null
//     },
//     doors: {
//       one: null,
//       many: null
//     },
//     subcompanies: {
//       one: null,
//       many: null
//     }
//   }

//   if (settings && settings.menu ) {
//     defaultMenu.map(x => {
//       settings.menu[x.type]['one'] = settings.menu[x.type]['one'] ? settings.menu[x.type]['one'] : x.one;
//       settings.menu[x.type]['many'] = settings.menu[x.type]['many'] ? settings.menu[x.type]['many'] : x.many;
//     })
//   }

//   return settings;
// };

// export const getLogo = state => createSelector(
//   getSettings,
//   settings => {
//     return settings ? (settings.logo_alt_url || settings.logo_url) : ''
//   }
// )(state)

// export const getAppName = state => createSelector(
//   getSettings,
//   settings => {
//     return settings && settings.app_name ? settings.app_name :  'Restaurant XXI'
//   }
// )(state)

export const getCompany = state => state.auth.company

export const getCompanyName = state => createSelector(
  getDecodedToken,
  decoded => decoded.company_name ? decoded.company_name : null
)(state)

