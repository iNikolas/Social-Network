import { applyMiddleware, combineReducers, compose, createStore } from "redux";
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
  app: appReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppDispatchCallbacks = ReturnType<typeof store.dispatch>;
export default store;
