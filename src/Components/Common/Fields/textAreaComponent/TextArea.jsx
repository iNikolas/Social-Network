import React from "react";
import css from "./TextArea.module.css";

function TextArea(props) {
  return (
    <div>
      <textarea
        className={`${props.className} ${css.textArea} ${
          props.meta.touched && props.meta.error ? css.textAreaError : null
        }`}
        placeholder={props.placeholder}
        {...props.input}
      />
      <div className={css.error}>
        {props.meta.error ? <span>{props.meta.error}</span> : null}
      </div>
    </div>
  );
}

export default TextArea;
