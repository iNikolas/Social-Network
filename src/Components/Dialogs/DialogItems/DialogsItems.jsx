import React from 'react'
import css from './DialogsItems.module.css'
import {NavLink} from "react-router-dom"
import UserAvatar from "../../Render/Users Avatar/UserAvatar";

const DialogItems = (props) => {

    return (
        <div className={css.user}><UserAvatar generalInfo={props.usersInfo.generalInfo} id={props.id} width={25}/><NavLink to={'/dialogs/' + props.id}
                                           activeClassName={css.active}>{props.name}</NavLink></div>
    )
}


export default DialogItems