import * as TablesActions from '../actions/tables.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {}
}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TablesActions.LOAD_TABLES_FAILED:
            return {
                ...state,
                isLoading: true
            }

        case TablesActions.LOAD_TABLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities: action.tables.reduce((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {}),
                ids: action.tables.map(x => x.id)
            }

        case TablesActions.LOAD_TABLES_FAILED:
            return {
                ...state,
                isLoading: false
            }


        // case TablesActions.UPDATE_ONE:
        //     return {
        //         ...state,
        //         loadingById: {
        //             ...state.loadingById,
        //             [action.data.id]: true
        //         }
        //     }

        // case TablesActions.CREATE_SUCCESS:
        // case TablesActions.CREATE_FAILED:
        //     return {
        //         ...state,
        //         isLoading: false
        //     }

        default:
            return state;
    }
}

export const getTablesEntities = state => state.tables.entities
export const getTables = state => Object.values(state.tables.entities)
export const getTableById = (state, TableId) => state.tables.entities[TableId]

export const getIsLoading = state => state.tables.isLoading
export const getIsLoadingById = (state, TableId) => {
    if( TableId === undefined ){
      return false
    }
  
    return state.tables.loadingById[TableId]
  }