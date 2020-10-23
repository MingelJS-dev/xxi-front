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

// export const UPDATE_ONE = '[Supplies] UPDATE_ONE';
// export function updateOne(data){
//   return { type: UPDATE_ONE, data }
// }

// export const UPDATE_ONE_FAILED = '[Supplies] UPDATE_ONE_FAILED';
// export function updateOneFailed(error, SupplieId){
//   return { type: UPDATE_ONE_FAILED, error, SupplieId }
// }

// export const UPDATE_ONE_SUCCESS = '[Supplies] UPDATE_ONE_SUCCESS';
// export function updateOneSucess(supplie){
//   return { type: UPDATE_ONE_SUCCESS, supplie }
// }

// export const CREATE = '[Supplies] CREATE';
// export function create(data){
//   return { type: UPDATE_ONE, data }
// }

// export const CREATE_SUCCESS = '[Supplies] CREATE_SUCCESS';
// export function createSuccess(supplie){
//   return { type: CREATE_SUCCESS, supplie }
// }

// export const CREATE_FAILED = '[Supplies] CREATE_FAILED';
// export function createFailed(error){
//   return { type: CREATE_FAILED, error }
// }

// export const DESTROY = '[Supplies] DESTROY';
// export function destroySupplie(data){
//   return { type: UPDATE_ONE, data }
// }

// export const DESTROY_SUCCESS = '[Supplies] DESTROY_SUCCESS';
// export function destroySupplieSuccess(supplie){
//   return { type: DESTROY_SUCCESS, supplie }
// }

// export const DESTROY_FAILED = '[Supplies] DESTROY_FAILED';
// export function destroySupplieFailed(error){
//   return { type: DESTROY_FAILED, error }
// }


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

//   export function createSupplie(data){
//     return async function(dispatch, getState){
//       dispatch(create(data))
//       try{
//         const res = await axios.post(window.config.API_URL + 'create_supplies',
//           data,
//           {
//             headers: { token: getAuthHeaders(getState()) },
//             token: getAuthHeaders(getState())
//           }
//         );
  
//         if( res.status === 200 ){
//           dispatch(createSuccess(res.data.result.data))
//           history.push('/supplies')
//           dispatch(updateNotification('Suministro creado correctamente', 'success'))
//         }else{
//           dispatch(createFailed(res))
//           dispatch(updateNotification('Hubo un error al crear el suministro', 'danger'))
//         }
//       }catch(error){
//         console.log('error:', error)
//         dispatch(updateNotification('Hubo un error al crear el suministro', 'danger'))
//         dispatch(createFailed(error))
//       }
//     }
//   }

//   export function updateSupplieById(data){
//     return async function(dispatch, getState){
//       dispatch(updateOne(data))
  
//       try{
//         const res = await axios.put(window.config.API_URL + 'update_supplies',
//           data,
//           {
//             headers: { token: getAuthHeaders(getState()) },
//             token: getAuthHeaders(getState())
//           }
//         );
  
//         if( res.status === 200 ){
//           dispatch(updateOneSucess(res.data.result))
//           dispatch(updateNotification('Suministro actualizado correctamente', 'success'))
//         }else{
//           dispatch(updateOneFailed(res, data.id))
//           dispatch(updateNotification('Hubo un error al actualizar el Suministro', 'danger'))
//         }
  
//       }catch(error){
//         console.log('error:', error)
//         dispatch(updateNotification('Hubo un error al actualizar el Suministro', 'danger'))
//         dispatch(updateOneFailed(error, data.id))
//       }
//     }
//   }

//   export function destroySupplieById(SupplieId){
//     return async function(dispatch, getState){
//       dispatch(destroySupplie(SupplieId))
//       console.log('sadasdsad', SupplieId)
//       try{
//         const res = await axios.delete(window.config.API_URL + 'delete_supplies/?id=' + SupplieId,
//           // {
//           //   params: {
//           //     id: SupplieId
//           //   }
//           // },
//           {
//             headers: { token: getAuthHeaders(getState()) },
//             token: getAuthHeaders(getState())
//           }
//         );
  
//         if( res.status === 200 ){
//           dispatch(destroySupplieSuccess(res.data.result))
//           history.push('/supplies')
//           dispatch(updateNotification('Suministro eliminar correctamente', 'success'))
//         }else{
//           dispatch(updateOneFailed(res, SupplieId))
//           dispatch(updateNotification('Hubo un error al eliminar el Suministro', 'danger'))
//         }
  
//       }catch(error){
//         console.log('error:', error)
//         dispatch(updateNotification('Hubo un error al eliminar el Suministro', 'danger'))
//         dispatch(destroySupplieFailed(error, SupplieId))
//       }
//     }
//   }