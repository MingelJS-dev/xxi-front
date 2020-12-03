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

export const LOAD_SUPPLIES_BY_PRODUCT = '[Supplies] LOAD_SUPPLIES_BY_PRODUCT';
export function loadSuppliesByProductId(data){
  return { type: LOAD_SUPPLIES_BY_PRODUCT, data}
}

export const LOAD_SUPPLIES_BY_PRODUCT_SUCCESS = '[Supplies] LOAD_SUPPLIES_BY_PRODUCT_SUCCESS';
export function loadSuppliesByProductIdSuccess(supplies){
  return { type: LOAD_SUPPLIES_BY_PRODUCT_SUCCESS, supplies }
}

export const LOAD_SUPPLIES_BY_PRODUCT_FAILED = '[Supplies] LOAD_SUPPLIES_BY_PRODUCT_FAILED';
export function loadSuppliesByProductIdFailed(error, ProductId){
  return { type: LOAD_SUPPLIES_BY_PRODUCT_FAILED, error, ProductId }
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

export const DESTROY = '[Supplies] DESTROY';
export function destroySupplie(data){
  return { type: UPDATE_ONE, data }
}

export const DESTROY_SUCCESS = '[Supplies] DESTROY_SUCCESS';
export function destroySupplieSuccess(supplie){
  return { type: DESTROY_SUCCESS, supplie }
}

export const DESTROY_FAILED = '[Supplies] DESTROY_FAILED';
export function destroySupplieFailed(error){
  return { type: DESTROY_FAILED, error }
}

// export const DESTROY_BY_PRODUCT = '[Supplies] DESTROY_BY_PRODUCT';
// export function destroySupplie(data){
//   return { type: UPDATE_ONE, data }
// }

// export const DESTROY_BY_PRODUCT_SUCCESS = '[Supplies] DESTROY_BY_PRODUCT_SUCCESS';
// export function destroySupplieSuccess(supplie){
//   return { type: DESTROY_SUCCESS, supplie }
// }

// export const DESTROY_BY_PRODUCT_FAILED = '[Supplies] DESTROY_BY_PRODUCT_FAILED';
// export function destroySupplieFailed(error){
//   return { type: DESTROY_BY_PRODUCT_FAILED, error }
// }


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

  export function destroySupplieById(SupplieId){
    return async function(dispatch, getState){
      dispatch(destroySupplie(SupplieId))

      try{
        const res = await axios.delete(window.config.API_URL + 'delete_supplies/?id=' + SupplieId,
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
          dispatch(destroySupplieSuccess(res.data.result))
          history.push('/supplies')
          dispatch(updateNotification('Suministro eliminado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, SupplieId))
          dispatch(updateNotification('Hubo un error al eliminar el Suministro', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el Suministro', 'danger'))
        dispatch(destroySupplieFailed(error, SupplieId))
      }
    }
  }

  export function getAllSuppliesByProductId(ProductId){
    return async function(dispatch, getState){
      dispatch(loadSuppliesByProductId(ProductId))

      try{
        // /supplies_food_plates/get_all_supplies_food_plates/?food_plate_id=13"
        const res = await axios.get(window.config.API_URL + 'supplies_food_plates/get_all_supplies_food_plates/?food_plate_id=' + ProductId,
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
          dispatch(loadSuppliesByProductIdSuccess(res.data))
        }else{
          dispatch(loadSuppliesByProductIdFailed(res, ProductId))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(loadSuppliesByProductIdFailed(error, ProductId))
      }
    }
  }