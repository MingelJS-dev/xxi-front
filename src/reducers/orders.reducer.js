import * as OrderActions from '../actions/order.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {}
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OrderActions.LOAD_ORDERS:
            return {
                ...state,
                isLoading: true
            }

        case OrderActions.LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.orders.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.orders.map(x => x.id)
            }

        case OrderActions.LOAD_ORDERS_FAILED:
            return {
                ...state,
                isLoading: false
            }



        default:
            return state;
    }

}

export const getOrdersEntities = state => state.orders.entities
export const getOrders = state => Object.values(state.orders.entities)
export const getOrderById = (state, OrderId) => state.orders.entities[OrderId]

export const getIsLoading = state => state.orders.isLoading
export const getIsLoadingById = (state, OrderId) => {
    if( OrderId === undefined ){
      return false
    }
  
    return state.orders.loadingById[OrderId]
  }