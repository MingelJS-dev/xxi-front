import * as ProductsActions from '../actions/products.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {}
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ProductsActions.LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true
            }

        case ProductsActions.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.products.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.products.map(x => x.id)
            }

        case ProductsActions.LOAD_PRODUCTS_FAILED:
            return {
                ...state,
                isLoading: false
            }


        case ProductsActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case ProductsActions.CREATE_SUCCESS:
        case ProductsActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}

export const getProductsEntities = state => state.products.entities
export const getProducts = state => Object.values(state.products.entities)
export const getProductById = (state, ProductId) => state.products.entities[ProductId]

export const getIsLoading = state => state.products.isLoading
export const getIsLoadingById = (state, ProductId) => {
    if( ProductId === undefined ){
      return false
    }
  
    return state.products.loadingById[ProductId]
  }