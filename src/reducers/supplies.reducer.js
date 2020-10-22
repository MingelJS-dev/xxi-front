import * as SuppliesActions from '../actions/supplies.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {}
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SuppliesActions.LOAD_SUPPLIES:
            return {
                ...state,
                isLoading: true
            }

        case SuppliesActions.LOAD_SUPPLIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.supplies.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.supplies.map(x => x.id)
            }

        case SuppliesActions.LOAD_SUPPLIES_FAILED:
            return {
                ...state,
                isLoading: false
            }


        case SuppliesActions.UPDATE_ONE:
            return {
                ...state,
                loadingById: {
                    ...state.loadingById,
                    [action.data.id]: true
                }
            }

        case SuppliesActions.CREATE_SUCCESS:
        case SuppliesActions.CREATE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}

export const getSuppliesEntities = state => state.supplies.entities
export const getSupplies = state => Object.values(state.supplies.entities)
export const getSupplieById = (state, SupplieId) => state.supplies.entities[SupplieId]

export const getIsLoading = state => state.supplies.isLoading
export const getIsLoadingById = (state, SupplieId) => {
    if( SupplieId === undefined ){
      return false
    }
  
    return state.supplies.loadingById[SupplieId]
  }