import samuraiJsAPI from "../API/api";

const ADD_POST = 'ADD-POST'
const EDIT_PROFILE_STATUS_AREA = 'EDIT-PROFILE-STATUS-AREA'
const GET_PROFILE_INFO = 'GET-PROFILE-INFO'
const SHOW_WAITING_ANIMATION = 'SHOW-WAITING-ANIMATION'
const CHANGE_AVATAR = 'CHANGE-AVATAR'

export const profileReducerAC = {
    addPost: (text) => ({type: ADD_POST, payload: text}),
    editProfileStatusField: (text) => ({type: EDIT_PROFILE_STATUS_AREA, payload: text}),
    getProfileInfo: (response) => ({type: GET_PROFILE_INFO, payload: response}),
    showWaitingAnimation: (waitingCondition) => ({type: SHOW_WAITING_ANIMATION, waitingCondition: waitingCondition}),
    changeAvatar: (urls) => ({type: CHANGE_AVATAR, payload: urls}),
    updateProfileContainerOnRequestThunkCreator: function (id) {
        return (dispatch) => {
            dispatch(this.showWaitingAnimation(true))
            samuraiJsAPI.profile.userId(id).then(response => {
                    dispatch(this.getProfileInfo(response))
                    dispatch(this.showWaitingAnimation(false))
                }
            )
        }
    },
    confirmStatusFieldThunkCreator: function (text) {
        return (dispatch) => {
            samuraiJsAPI.profile.status(text).catch(Error => {
                alert(`Ошибка, поменять статус не получилось\n${Error}`)
            })
        }
    },
    getStatusFieldThunkCreator: function (id) {
        return (dispatch) => {
            samuraiJsAPI.profile.getStatus(id).then(response => {
                if (response === '' || !response) response = '...'
                dispatch(this.editProfileStatusField(response))
            })
        }
    },
    changeAvatarThunkCreator: function (file) {
        return async (dispatch) => {
            try {
                const response = await samuraiJsAPI.profile.photo(file)
                if (response.resultCode === 1) throw new Error(response.messages[0])
                dispatch(this.changeAvatar(response.data))
            } catch (err) {
                alert(err.message)
                console.log(err)
            }

        }
    }
}


export let initialState = {
    posts: [
        {
            avatar: 'https://www.blast.hk/attachments/64805/',
            texting: 'Вот такой вот текст',
            likeAmount: 1,
            id: 0
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8-SJ6kQelXnm1CDV-Kw2s6oFEzVIFnIQjpw&usqp=CAU',
            texting: 'А нельзя было написать что-либо поинтереснее?',
            likeAmount: 30,
            id: 1
        },
        {
            avatar: 'https://www.blast.hk/attachments/64805/',
            texting: 'А зачем?)',
            likeAmount: 3,
            id: 2
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8-SJ6kQelXnm1CDV-Kw2s6oFEzVIFnIQjpw&usqp=CAU',
            texting: 'Все с тобой понятно',
            likeAmount: 10,
            id: 3
        },
        {
            avatar: 'https://www.blast.hk/attachments/64805/',
            texting: ')))',
            likeAmount: 1,
            id: 4
        }
    ],
    // postInputArea: '',
    data: null,
    waitingAnimation: false,
    count: 0,
    profileStatusInputArea: 'Standard Text'
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        avatar: 'data:image/jpeg;base64,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',
                        texting: action.payload,
                        likeAmount: 0,
                        id: 5,

                    }
                ],
                postInputArea: ''
            }
        case EDIT_PROFILE_STATUS_AREA:
            return {
                ...state,
                profileStatusInputArea: action.payload
            }
        case GET_PROFILE_INFO:
            return {
                ...state,
                data: action.payload
            }
        case SHOW_WAITING_ANIMATION:
            return {
                ...state,
                waitingAnimation: action.waitingCondition

            }
        case CHANGE_AVATAR:
            return {
                ...state,
                data: {
                    ...state.data,
                    photos: {
                        ...state.data.photos,
                        small: action.payload.photos.small ??state.data.photos.small,
                        large: action.payload.photos.large ?? state.data.photos.large
                    }

                }
            }
        default:
            return state

    }
}

export default profileReducer