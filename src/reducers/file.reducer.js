import * as FileActions from '../actions/file.actions.js'

const INITIAL_STATE = {
    entities: {},
    ids: [],
    isLoading: false,
    loadingById: {},


}

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FileActions.EXPORT_FILE:
            return {
                ...state,
                isLoading: true
            }

        case FileActions.EXPORT_FILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }

        case FileActions.EXPORT_FILE_FAILED:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }

}


export const getIsLoading = state => state.files.isLoading
