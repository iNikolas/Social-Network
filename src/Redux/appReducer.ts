import { authReducerAC } from "./authReducer";

const INITIALIZING = "INITIALIZING";

let initialState: InitialStateType = {
  initialized: false,
};

type InitializeAcType = { type: typeof INITIALIZING };

export type InitialStateType = {
  initialized: boolean;
};

type AppReducerAcType = {
  initialize: () => InitializeAcType;
  initializationThunkCreator: () => (dispatch: Function) => void;
};

export const appReducerAC: AppReducerAcType = {
  initialize: () => ({ type: INITIALIZING }),
  initializationThunkCreator: function () {
    return (dispatch) => {
      let requestAuthorizationPromise = dispatch(
        authReducerAC.requestAuthorizationThunkCreator()
      );

      requestAuthorizationPromise.then(() => dispatch(this.initialize()));
    };
  },
};

const appReducer = (
  state = initialState,
  action: InitializeAcType
): InitialStateType => {
  switch (action.type) {
    case INITIALIZING:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export default appReducer;
