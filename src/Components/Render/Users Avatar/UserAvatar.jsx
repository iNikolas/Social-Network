import React from "react"
import css from './UserAvatar.module.css'
import {NavLink} from "react-router-dom";

const UserAvatar = (props) => {
    let i;
    for (i = 0; i < props.generalInfo.length; i++) {
        if (props.generalInfo[i].id === props.id) {
            return (
                <div className={css.avatarDiv}><NavLink className={css.avatar} to={+''} title={props.generalInfo[i].name}><img src={props.generalInfo[i].avatar} width={props.width} /></NavLink>
                </div>
            )
        }

    }
}

export default UserAvatar