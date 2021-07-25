import React from 'react'
import css from './Input.module.css'



const Input = (props) => {
    return <div>
        <input className={`${css.input} ${(props.meta.touched && props.meta.error) ? css.inputError : null}`} placeholder={props.placeholder} {...props.input}/>
        <br/>
        {/*{(props.meta.touched && props.meta.error) ? <span className={css.error}>{props.meta.error}</span> : null}*/}
        {(props.meta.error || props.meta.submitError) && props.meta.touched && (
            <span className={css.error}>{props.meta.error || props.meta.submitError}</span>)}
    </div>
}

export default Input