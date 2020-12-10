import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import { updateNotification } from './notifications.actions.js'
import history from '../history.js'

export const LOAD_ORDERS = '[Orders] LOAD_ORDERS';
export function loadOrders() {
  return { type: LOAD_ORDERS }
}

export const LOAD_ORDERS_SUCCESS = '[Orders] LOAD_ORDERS_SUCCESS';
export function loadOrdersSuccess(orders) {
  return { type: LOAD_ORDERS_SUCCESS, orders }
}

export const LOAD_ORDERS_FAILED = '[Orders] LOAD_ORDERS_FAILED';
export function loadOrdersFailed(error) {
  return { type: LOAD_ORDERS_FAILED, error }
}

export const LOAD_DETAIL_ORDER = '[Orders] LOAD_DETAIL_ORDERS';
export function loadDetailOrders() {
  return { type: LOAD_ORDERS }
}

export const LOAD_DETAIL_ORDERS_SUCCESS = '[Orders] LOAD_DETAIL_ORDERS_SUCCESS';
export function loadDetailOrdersSuccess(details) {
  return { type: LOAD_DETAIL_ORDERS_SUCCESS, details }
}

export const LOAD_DETAIL_ORDERS_FAILED = '[Orders] LOAD_DETAIL_ORDERS_FAILED';
export function loadDetailOrdersFailed(error) {
  return { type: LOAD_DETAIL_ORDERS_FAILED, error }
}


export function fetchOrders() {
    return async function (dispatch, getState) {
      dispatch(loadOrders())
  
      try {
        let url = `${window.config.API_URL}/orders/get_all_orders`
        url += '?' + toQueryString({ page: 1 })
  
        const res = await axios.get(url, {
          headers: { token: getAuthHeaders(getState()) },
          token: getAuthHeaders(getState())
        });
  
        if (res.status === 200) {
          dispatch(loadOrdersSuccess(res.data.data))
        } else {
          dispatch(loadOrdersFailed(res.statusText))
        }
      } catch (err) {
        dispatch(loadOrdersFailed(err))
      }
    }
  }

  export function fetchDetails(id) {
    return async function (dispatch, getState) {
      dispatch(loadDetailOrders())
      
      try {
        // let url = `${window.config.API_URL}/orders/get_all_orders`
        // url += '?' + toQueryString({ page: 1 })
        console.log(id)
        const res = await axios.get(window.config.API_URL + 'orders_detail/get_orders_detail_for_order/?order_id=' + id,
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
  
        if (res.status === 200) {
          console.log(res)
          dispatch(loadDetailOrdersSuccess(res.data))
        } else {
          dispatch(loadDetailOrdersFailed(res.statusText))
        }
      } catch (err) {
        dispatch(loadDetailOrdersFailed(err))
      }
    }
  }

  // export function fetchDetails() {
  //   return async function (dispatch, getState) {
  //     dispatch(loadDetailOrders())
  
  //     try {
  //       let url = `${window.config.API_URL}/orders_detail/get_all_orders_detail`
  //       url += '?' + toQueryString({ page: 1 })
  
  //       const res = await axios.get(url, {
  //         headers: { token: getAuthHeaders(getState()) },
  //         token: getAuthHeaders(getState())
  //       });

  
  //       if (res.status === 200) {
  //         dispatch(loadDetailOrdersSuccess(res.data.data))
  //       } else {
  //         dispatch(loadDetailOrdersFailed(res.statusText))
  //       }
  //     } catch (err) {
  //       dispatch(loadDetailOrdersFailed(err))
  //     }
  //   }
  // }