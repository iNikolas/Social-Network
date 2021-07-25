import React from 'react'
import {addMessageCreator, editMessageAreaCreator} from "../../Redux/dialogsReducer";
import Dialogs from "./dialogs";
import {connect} from "react-redux";
import {withAuth} from "../HOCs/withAuth/withAuth";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        users: state.dialogs.users,
        usersInfo: state.usersInfo,
        messages: state.dialogs.messages
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => {
            dispatch(addMessageCreator(message))
        }
    }
}

export default compose(withAuth, connect(mapStateToProps, mapDispatchToProps))(Dialogs)