export const getAuthData = (state) => {
    return state.authInfo.data
}

export const getIsAuthorized = (state) => {
    return state.authInfo.isAuthorized
}

export const getIsLoading = (state) => {
    return state.authInfo.isLoading
}