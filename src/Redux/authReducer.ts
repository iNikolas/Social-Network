import samuraiJsAPI from "../API/api";

const GET_AUTHORIZATION_INFO = 'GET-AUTHORIZATION-INFO'
const SET_AUTHORIZATION = 'SET-AUTHORIZATION'
const SET_ISLOADING = 'SET-ISLOADING'
const RESET_AUTHORIZATION_INFO = 'RESET-AUTHORIZATION-INFO'
const WRITE_LOGIN_FAILED_INFO = 'WRITE-LOGIN-FAILED-INFO'
const RESET_LOGIN_FAILED_INFO = 'RESET-LOGIN-FAILED-INFO'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

type InitialStateType = {
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
    isAuthorized: boolean
    isLoading: boolean
    loginFailedInfo: string | null
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    data: {
        id: null,
        login: null,
        email: null
    },
    isAuthorized: false,
    isLoading: true,
    loginFailedInfo: null,
    captchaUrl: null
}

type authReducerAcType = {
    setCurrentUserInfo: (authInfo: any) => {type: typeof GET_AUTHORIZATION_INFO, authInfo: any},
    getCaptchaUrlSuccess: (captchaUrl: string) => {type: typeof GET_CAPTCHA_URL_SUCCESS, payload: string}
    resetCurrentUserInfo: () => {type: typeof RESET_AUTHORIZATION_INFO}
    setAuthorization: (authStance: number) => {type: typeof SET_AUTHORIZATION, switch: number}
    setLoading: (isLoading: boolean) => {type: typeof SET_ISLOADING, payload: boolean}
    writeLoginFailedInfo: (serverRespond: any) => ({type: typeof WRITE_LOGIN_FAILED_INFO, payload: any}),
    resetLoginFailedInfo: () => {type: typeof RESET_LOGIN_FAILED_INFO}
    requestAuthorizationThunkCreator: () => (dispatch: Function) => void
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => (dispatch: Function) => void
    logoutThunkCreator: () => (dispatch: Function) => void
    getCaptchaUrl: () => void
}

export const authReducerAC: authReducerAcType = {
    setCurrentUserInfo: (authInfo) => ({type: GET_AUTHORIZATION_INFO, authInfo: authInfo}),
    getCaptchaUrlSuccess: (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl}),
    resetCurrentUserInfo: () => ({type: RESET_AUTHORIZATION_INFO}),
    setAuthorization: (authStance) => ({type: SET_AUTHORIZATION, switch: authStance}),
    setLoading: (isLoading) => ({type: SET_ISLOADING, payload: isLoading}),
    writeLoginFailedInfo: (serverRespond) => ({type: WRITE_LOGIN_FAILED_INFO, payload: serverRespond}),
    resetLoginFailedInfo: () => ({type: RESET_LOGIN_FAILED_INFO}),
    requestAuthorizationThunkCreator: function () {
        return async (dispatch) => {
            dispatch(this.setLoading(true))
            const result = await samuraiJsAPI.auth.authMe()
            dispatch(this.setCurrentUserInfo(result))
            dispatch(this.setAuthorization(result.resultCode))
            dispatch(this.setLoading(false))
        }
    },
    loginThunkCreator: function (email, password, rememberMe, captcha) {
        return (dispatch) => {
            samuraiJsAPI.auth.login(email, password, rememberMe, captcha)
                .then(result => {
                    if (result.resultCode === 0) {
                        samuraiJsAPI.auth.authMe()
                            .then(result => {
                                dispatch(this.setCurrentUserInfo(result))
                                dispatch(this.setAuthorization(result.resultCode))
                            })
                    } else {
                        if (result.resultCode === 10) {
                            this.getCaptchaUrl()
                        }
                        dispatch(this.writeLoginFailedInfo(result.messages))
                    }
                })
        }
    },
    logoutThunkCreator: function () {
        return (dispatch) => {
            samuraiJsAPI.auth.logout()
                .then(result => {
                        if (result.resultCode === 0) {
                            dispatch(this.resetCurrentUserInfo())
                            dispatch(this.setAuthorization(1))
                        }
                    }
                )
        }
    },
    getCaptchaUrl: function () {
        return async (dispatch: Function) => {
            try {
                const response = await samuraiJsAPI.security.getCaptchaUrl()

                dispatch(this.getCaptchaUrlSuccess(response.url))
            } catch (err) {
                alert(err.message)
                console.log(err)
            }


        }
    }
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WRITE_LOGIN_FAILED_INFO:
            return {
                ...state,
                loginFailedInfo: action.payload
            }
        case RESET_LOGIN_FAILED_INFO:
            return {
                ...state,
                loginFailedInfo: null,
                captchaUrl: null
            }
        case GET_AUTHORIZATION_INFO:
            return {
                ...state,
                data: action.authInfo.data,
                loginFailedInfo: null
            }
        case RESET_AUTHORIZATION_INFO:
            return {
                ...state,
                data: {
                    id: null,
                    login: null,
                    email: null
                }
            }
        case SET_AUTHORIZATION: {
            if (action.switch === 0) {
                return {
                    ...state,
                    isAuthorized: true
                }
            } else {
                return {
                    ...state,
                    isAuthorized: false
                }
            }
        }
        case SET_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case  GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state


    }
}

export default authReducer//