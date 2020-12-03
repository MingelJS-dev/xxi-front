import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import { updateNotification } from './notifications.actions.js'
import history from '../history.js'

export const LOAD_TABLES = '[Tables] LOAD_TABLES';
export function loadTables(){
  return { type: LOAD_TABLES}
}

export const LOAD_TABLES_SUCCESS = '[Tables] LOAD_TABLES_SUCCESS';
export function loadTablesSuccess(tables){
  return { type: LOAD_TABLES_SUCCESS, tables }
}

export const LOAD_TABLES_FAILED = '[Tables] LOAD_TABLES_FAILED';
export function loadTablesFailed(error){
  return { type: LOAD_TABLES_FAILED, error }
}

export const UPDATE_ONE = '[Tables] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Tables] UPDATE_ONE_FAILED';
export function updateOneFailed(error, TableId){
  return { type: UPDATE_ONE_FAILED, error, TableId }
}

export const UPDATE_ONE_SUCCESS = '[Tables] UPDATE_ONE_SUCCESS';
export function updateOneSucess(table){
  return { type: UPDATE_ONE_SUCCESS, table }
}

export const CREATE = '[Tables] CREATE';
export function create(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Tables] CREATE_SUCCESS';
export function createSuccess(supplie){
  return { type: CREATE_SUCCESS, supplie }
}

export const CREATE_FAILED = '[Tables] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Tables] DESTROY';
export function destroyTable(data){
  return { type: UPDATE_ONE, data }
}

export const DESTROY_SUCCESS = '[Tables] DESTROY_SUCCESS';
export function destroyTableSuccess(table){
  return { type: DESTROY_SUCCESS, table }
}

export const DESTROY_FAILED = '[Tables] DESTROY_FAILED';
export function destroyTableFailed(error){
  return { type: DESTROY_FAILED, error }
}


export function fetchTables(){
    return async function(dispatch, getState){
      dispatch(loadTables())
  
      try{
        let url = `${window.config.API_URL}/tables/get_all_tables/`
        url += '?' + toQueryString({page: 1})

        const res = await axios.get(url, {
          headers: { token: getAuthHeaders(getState()) },
          token: getAuthHeaders(getState())
        });
  
        if(res.status === 200){
          dispatch(loadTablesSuccess(res.data.data))
        }else{
          dispatch(loadTablesFailed(res.statusText))
        }
      }catch(err){
        dispatch(loadTablesFailed(err))
      }
    }
  }

  export function createTable(data){
    return async function(dispatch, getState){
      dispatch(create(data))
      try{
        const res = await axios.post(window.config.API_URL + 'tables/create_tables',
          data,
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 200 ){
          dispatch(createSuccess(res.data.result.data))
          // history.push('/tables')
          dispatch(updateNotification('Mesa creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear la mesa', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear la mesa', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function updateTableById(data){
    return async function(dispatch, getState){
      dispatch(updateOne(data))
  
      try{
        const res = await axios.put(window.config.API_URL + 'tables/update_tables',
          data,
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );

        if( res.status === 200 ){
          dispatch(updateOneSucess({ ...data}))
          dispatch(updateNotification('Mesa actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar la mesa', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar la mesa', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function destroyTableById(TableId){
    return async function(dispatch, getState){
      dispatch(destroyTable(TableId))

      try{
        const res = await axios.delete(window.config.API_URL + 'tables/delete_tables/?id=' + TableId,
          // {
          //   params: {
          //     id: SupplieId
          //   }
          // },
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 200 ){
          dispatch(destroyTableSuccess({TableId}))
          // history.push('/supplies')
          dispatch(updateNotification('Mesa eliminada correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, TableId))
          dispatch(updateNotification('Hubo un error al eliminar la mesa', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar la mesa', 'danger'))
        dispatch(destroyTableFailed(error, TableId))
      }
    }
  }