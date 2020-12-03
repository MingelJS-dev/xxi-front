import axios from 'axios'
import { getAuthHeaders, createAction, toQueryString } from '../utils.js'
import { updateNotification } from './notifications.actions.js'
import history from '../history.js'

export const EXPORT_FILE = '[Files] EXPORT_FILE';
export function exportFile() {
  return { type: EXPORT_FILE }
}

export const EXPORT_FILE_SUCCESS = '[Files] EXPORT_FILE_SUCCESS';
export function exportFileSuccess(Files) {
  return { type: EXPORT_FILE_SUCCESS, Files }
}

export const EXPORT_FILE_FAILED = '[Files] EXPORT_FILE_FAILED';
export function exportFileFailed(error) {
  return { type: EXPORT_FILE_FAILED, error }
}

export function fetchFile() {
    return async function (dispatch, getState) {
      dispatch(exportFile())
  
      try {
        let url = `https://restaurant-pdf.herokuapp.com/export`
        // url += '?' + toQueryString({ page: 1 })
  
        const res = await axios.get(url);
        console.log(res)
        if (res.status === 200) {
        //   dispatch(loadProductsSuccess(res.data.data))
        } else {
        //   dispatch(loadProductsFailed(res.statusText))
        }
      } catch (err) {
        dispatch(exportFileFailed(err))
      }
    }
  }
  