import React from 'react'
import css from './news.module.css'
import {withRouter} from "react-router-dom";

const News = (props) => {
    return (
        <div className={css.content}>The News Tab will be here</div>
    )
}

export default withRouter(News)