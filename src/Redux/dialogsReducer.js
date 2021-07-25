const ADD_MESSAGE = 'ADD-MESSAGE'

export const addMessageCreator = (message) => ({type: ADD_MESSAGE, payload: message})

let initialState = {
    users: [
        {
            name: 'Андрей Огнев',
            id: 1
        },
        {
            name: 'Иван Черняк',
            id: 2
        },
        {
            name: 'Дмитрий Диканенко',
            id: 3
        },
        {
            name: 'Владимир Петрив',
            id: 4
        },

        {
            name: 'Владислав Залюбовский',
            id: 5
        }
    ],
    messages: [
        {
            message: '"q? pljhjdj"',
            id: 5,
            isOwner: false
        },
        {
            message: 'Транслит переключи',
            id: 0,
            isOwner: true
        },
        {
            message: 'Здорово, говорю',
            id: 5,
            isOwner: false
        },
        {
            message: 'Да блять заебал он',
            id: 5,
            isOwner: false
        },
        {
            message: 'Юзай пунто-Свитчер',
            id: 0,
            isOwner: true
        },
        {
            message: 'А не хочу!1',
            id: 5,
            isOwner: false
        }
    ],
    messageInputArea: ''
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,
                    {
                        message: action.payload,
                        id: 0,
                        isOwner: true
                    }
                ]
            }

        default:
            return state
    }
}

export default dialogsReducer