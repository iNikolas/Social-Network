import {authReducerAC} from "./authReducer";

const INITIALIZING = 'INITIALIZING'

let initialState = {
    initialized: false
}

export const appReducerAC = {
    initialize: () => ({type: INITIALIZING}),
    initializationThunkCreator: function () {
        return (dispatch) => {
            let requestAuthorizationPromise = dispatch(authReducerAC.requestAuthorizationThunkCreator())

            requestAuthorizationPromise.then(() => dispatch(this.initialize()))
        }
    }
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZING:
            return {
                ...state,
                initialized: true
            }
        default:
            return state


    }
}

export default appReducer