import React from "react";
import css from "./navBar.module.css";
import { NavLink } from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";

const NavBar = () => {
  return (
    <nav className={css.navigation}>
      <div className={css.item}>
        <NavLink to={"/profile"} activeClassName={css.active}>
          Profile
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to={"/dialogs"} activeClassName={css.active}>
          Messages
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to={"/news"} activeClassName={css.active}>
          News
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to={"/music"} activeClassName={css.active}>
          Music
        </NavLink>
      </div>
      <div className={css.item} activeClassName={css.active}>
        <p></p>
      </div>
      <div className={css.item}>
        <NavLink to={"/settings"} activeClassName={css.active}>
          Settings
        </NavLink>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className={css.item}>
        <NavLink to={"/users"} activeClassName={css.active}>
          User's page
        </NavLink>
      </div>
      <div className={css.item}>
        <NavLink to={"/users_from_axios"} activeClassName={css.active}>
          Users from Axios
        </NavLink>
      </div>
      <br />
      <FriendsContainer />
    </nav>
  );
};

export default NavBar;
