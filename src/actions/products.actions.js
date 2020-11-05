import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import { updateNotification } from './notifications.actions.js'
import history from '../history.js'


export const LOAD_PRODUCTS = '[Products] LOAD_PRODUCTS';
export function loadProducts(){
  return { type: LOAD_PRODUCTS}
}

export const LOAD_PRODUCTS_SUCCESS = '[Products] LOAD_PRODUCTS_SUCCESS';
export function loadProductsSuccess(products){
  return { type: LOAD_PRODUCTS_SUCCESS, products }
}

export const LOAD_PRODUCTS_FAILED = '[Products] LOAD_PRODUCTS_FAILED';
export function loadProductsFailed(error){
  return { type: LOAD_PRODUCTS_FAILED, error }
}

export const UPDATE_ONE = '[Products] UPDATE_ONE';
export function updateOne(data){
  return { type: UPDATE_ONE, data }
}

export const UPDATE_ONE_FAILED = '[Products] UPDATE_ONE_FAILED';
export function updateOneFailed(error, ProductId){
  return { type: UPDATE_ONE_FAILED, error, ProductId }
}

export const UPDATE_ONE_SUCCESS = '[Products] UPDATE_ONE_SUCCESS';
export function updateOneSucess(product){
  return { type: UPDATE_ONE_SUCCESS, product }
}

export const CREATE = '[Products] CREATE';
export function createProduct(data){
  return { type: UPDATE_ONE, data }
}

export const CREATE_SUCCESS = '[Products] CREATE_SUCCESS';
export function createSuccess(product){
  return { type: CREATE_SUCCESS, product }
}

export const CREATE_FAILED = '[Products] CREATE_FAILED';
export function createFailed(error){
  return { type: CREATE_FAILED, error }
}

export const DESTROY = '[Products] DESTROY';
export function destroy(data){
  return { type: UPDATE_ONE, data }
}

export const DESTROY_SUCCESS = '[Products] DESTROY_SUCCESS';
export function destroySuccess(product){
  return { type: DESTROY_SUCCESS, product }
}

export const DESTROY_FAILED = '[Products] DESTROY_FAILED';
export function destroyFailed(error){
  return { type: DESTROY_FAILED, error }
}


export function fetchProducts(){
    return async function(dispatch, getState){
      dispatch(loadProducts())
  
      try{
        let url = `${window.config.API_URL}/food_plates/get_all_food_plates`
        url += '?' + toQueryString({page: 1})

        const res = await axios.get(url, {
          headers: { token: getAuthHeaders(getState()) },
          token: getAuthHeaders(getState())
        });
  
        if(res.status === 200){
          dispatch(loadProductsSuccess(res.data.data))
        }else{
          dispatch(loadProductsFailed(res.statusText))
        }
      }catch(err){
        dispatch(loadProductsFailed(err))
      }
    }
  }

  export function create(data){
    return async function(dispatch, getState){
      dispatch(createProduct(data))
      try{
        const res = await axios.post(window.config.API_URL + 'create_food_plates',
          data,
          {
            headers: { token: getAuthHeaders(getState()) },
            token: getAuthHeaders(getState())
          }
        );
  
        if( res.status === 200 ){
          dispatch(createSuccess(res.data.result.data))
          history.push('/products')
          dispatch(updateNotification('Producto creado correctamente', 'success'))
        }else{
          dispatch(createFailed(res))
          dispatch(updateNotification('Hubo un error al crear el producto', 'danger'))
        }
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al crear el producto', 'danger'))
        dispatch(createFailed(error))
      }
    }
  }

  export function updateById(data){
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
          dispatch(updateNotification('Producto actualizado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, data.id))
          dispatch(updateNotification('Hubo un error al actualizar el producto', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al actualizar el producto', 'danger'))
        dispatch(updateOneFailed(error, data.id))
      }
    }
  }

  export function destroyById(ProductId){
    return async function(dispatch, getState){
      dispatch(destroy(ProductId))

      try{
        const res = await axios.delete(window.config.API_URL + 'delete_food_plates/?id=' + ProductId,
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
          dispatch(destroySuccess(res.data.result))
          history.push('/products')
          dispatch(updateNotification('Producto eliminado correctamente', 'success'))
        }else{
          dispatch(updateOneFailed(res, ProductId))
          dispatch(updateNotification('Hubo un error al eliminar el producto', 'danger'))
        }
  
      }catch(error){
        console.log('error:', error)
        dispatch(updateNotification('Hubo un error al eliminar el producto', 'danger'))
        dispatch(destroyFailed(error, ProductId))
      }
    }
  }