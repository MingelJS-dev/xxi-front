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

export function fetchOrders() {
    return async function (dispatch, getState) {
      dispatch(loadOrders())
  
      try {
        let url = `${window.config.API_URL}/orders/get_all_orders_creadas`
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