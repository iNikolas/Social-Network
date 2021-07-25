import React from 'react'
import loader from "../../../img/loading/Ghost.gif";
import css from "./Loader.module.css";

let Loader = () => {
    return <div><img src={loader}/>
        <span className={css.loader}>Обрабатываем запрос...</span></div>
}

export default Loader