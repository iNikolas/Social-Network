import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import css from "./Login.module.css";
import logoImg from "./../../img/logo/mySocialNetworkLogoCutted.png";

const Login = (props) => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.logoImg}
        src={logoImg}
        alt={"mySocialNetworkLogo.png"}
      />
      <h1>Enter your Login data:</h1>
      <LoginForm {...props} />
    </div>
  );
};

export default Login;
