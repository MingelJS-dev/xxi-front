import { useLocation } from "react-router-dom"
import { utcToZonedTime, format } from 'date-fns-tz'
import { es } from 'date-fns/locale'

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getToken(state){
  if(state){
    return state.auth ? state.auth.token : null
  }else{
    return null
  }
}

export function getAuthHeaders(state){
  const token = getToken(state)
  console.log(token)
  if(token){
    return token
  }else{
    return {}
  }
}

export function createAction(type, keys = []){
  const fn = function(){
    const args = keys.reduce((acc, item, idx) => {
      acc[item] = arguments[idx]
      return acc
    }, {})

    return { type, ...args }
  }

  return [
    type,
    fn
  ]
}

export function useQuery(){
  const query = new URLSearchParams(useLocation().search);
  const items = {}

  for(let entry of query.entries()){
    items[entry[0]] = entry[1]
  }

  return items
}

export function toQueryString(query){
  return Object.keys(query).reduce((acc, key) => {
    if( query[key] ){
      acc.push(`${key}=${query[key]}`)
    }

    return acc
  }, []).join('&')
}

export function toUTCString(date){
  return date.toISOString().replace('T', ' ').replace('Z', '')
}

export function formatDate(date, formatString='dd/MM/yyyy HH:mm'){
  return format(utcToZonedTime(date + 'Z', TIME_ZONE), formatString, { locale: es })
}

export function convertToByteArray(input) {
  var sliceSize = 512;
  var bytes = [];

  for (var offset = 0; offset < input.length; offset += sliceSize) {
    var slice = input.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);

    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    bytes.push(byteArray);
  }

  return bytes;
}

export const deviceTypes = [
  {key: 'weather', name: 'Clima'},
  {key: 'switch' , name: 'Switch'},
  {key: 'camera', name: 'Cámara'},
  {key: 'floating', name: 'Floating'},
  {key: 'noise', name: 'Ruido'},
  {key: 'smoke', name: 'Humo'}
]

