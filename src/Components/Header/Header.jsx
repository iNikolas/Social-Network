import React from "react"
import css from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={css.header}>
            <img src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/flat_3.png" />
            {props.isAuthorized ? <NavLink onClick={props.updateProfileContainerOnRequest} className={css.loginBlock} to={`/profile/${props.authData.id}`}>{props.authData.login}</NavLink> :
            <NavLink className={css.loginBlock} to='/login'>Login Page</NavLink> }
            {props.isAuthorized ? <NavLink onClick={props.resetAuthorization} className={css.logoutLink} to={`/login`}>Logout</NavLink> : null}
        </header>
    )
}


export default Header