import { RootState } from "../redux-store";

export const getAuthData = (state: RootState) => {
  return state.authInfo.data;
};

export const getIsAuthorized = (state: RootState) => {
  return state.authInfo.isAuthorized;
};

export const getIsLoading = (state: RootState) => {
  return state.authInfo.isLoading;
};
