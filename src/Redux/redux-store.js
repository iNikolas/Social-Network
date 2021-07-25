import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersInfoReducer from "./usersInfoReducer";
import usersInfoWithAxiosReducer from "./usersReducer (with Axios)/usersInfoReducerWithAxios";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";

let reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    usersInfo: usersInfoReducer,
    users: usersInfoWithAxiosReducer,
    authInfo: authReducer,
    app: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(reducers, applyMiddleware(thunk))

export default store