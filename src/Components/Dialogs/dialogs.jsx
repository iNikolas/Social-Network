import React from 'react'
import css from './dialogs.module.css'
import DialogItems from "./DialogItems/DialogsItems"
import Message from "./Message/Message"
import DialogsForm from "./DialogsForm/DialogsForm";


const Dialogs = (props) => {
    let userList = props.users.map(user => <DialogItems id={user.id} name={user.name}
                                                        usersInfo={props.usersInfo}/>)
    let messagesList = props.messages.map(message => <Message id={message.id} isOwner={message.isOwner}
                                                              message={message.message}
                                                              usersInfo={props.usersInfo}/>)

    let onAddMessage = (event) => {
        if (event.messageInputArea === undefined || event.messageInputArea === '' || event.messageInputArea.length > 1000) {
            return
        } else {
            props.addMessage(event.messageInputArea)
            event.messageInputArea = ''
        }
    }


    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {userList}
            </div>
            <div className={css.messages}>
                {messagesList}
                <DialogsForm {...props} onAddMessage={onAddMessage}/>
            </div>
        </div>
    )
}


export default Dialogs