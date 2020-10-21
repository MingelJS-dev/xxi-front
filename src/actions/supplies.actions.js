import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import { updateNotification } from './notifications.actions.js'
import history from '../history.js'

export const LOAD_SUPPLIES = '[Supplies] LOAD_SUPPLIES';
export function loadSupplies(){
  return { type: LOAD_SUPPLIES}
}

export const LOAD_SUPPLIES_SUCCESS = '[Supplies] LOAD_SUPPLIES_SUCCESS';
export function loadSuppliesSuccess(supplies){
  return { type: LOAD_SUPPLIES_SUCCESS, supplies }
}

export const LOAD_SUPPLIES_FAILED = '[Supplies] LOAD_SUPPLIES_FAILED';
export function loadSuppliesFailed(error){
  return { type: LOAD_SUPPLIES_FAILED, error }
}

export const UPDATE_ONE = '[Supplies] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Supplies] UPDATE_ONE_FAILED';
export function updateOneFailed(error, SupplieId){
  return { type: UPDATE_ONE_FAILED, error, SupplieId }
}

export const UPDATE_ONE_SUCCESS = '[Supplies] UPDATE_ONE_SUCCESS';
export function updateOneSucess(supplie){
  return { type: UPDATE_ONE_SUCCESS, supplie }
}

export const CREATE = '[Supplies] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Supplies] CREATE_SUCCESS';
export function createSuccess(supplie){
  return { type: CREATE_SUCCESS, supplie }
}

export const CREATE_FAILED = '[Supplies] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export function fetchSupplies(){
    return async function(dispatch, getState){
      dispatch(loadSupplies())
  
      try{
        let url = `${window.config.API_URL}get_all_supplies`
        url += '?' + toQueryString({page: 1})

        const res = await axios.get(url, {
          headers: { token: getAuthHeaders(getState()) },
          token: getAuthHeaders(getState())
        });
  
        if(res.status === 200){
          dispatch(loadSuppliesSuccess(res.data.data))
        }else{
          dispatch(loadSuppliesFailed(res.statusText))
        }
      }catch(err){
        dispatch(loadSuppliesFailed(err))
      }
    }
  }

  export function createSupplie(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        const res = await axios.post(window.config.API_URL + 'create_supplies',
          data,
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 200 ){
          dispatch(createSuccess(res.data.result.data))
          history.push('/supplies')
          dispatch(updateNotification('Suministro creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el suministro', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el suministro', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function updateSupplieById(data){
    return async function(dispatch, getState){
      dispatch(updateOne(data))
  
      try{
        const res = await axios.put(window.config.API_URL + 'update_supplies',
          data,
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 200 ){
          dispatch(updateOneSucess(res.data.result))
          dispatch(updateNotification('Suministro actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar el Suministro', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar el Suministro', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }