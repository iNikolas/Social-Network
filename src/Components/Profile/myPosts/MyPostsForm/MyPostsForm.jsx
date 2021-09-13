import React from "react";
import { Field, Form } from "react-final-form";
import css from "../myPosts.module.css";
import TextArea from "../../../Common/Fields/textAreaComponent/TextArea";
import { maxLength } from "../../../Common/Validators/validators";

const MyPostsForm = (props) => {
  return (
    <Form
      onSubmit={props.onAddPost}
      render={({ handleSubmit, valid }) => {
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <Field
                validate={maxLength(1000)}
                name={"newPostContent"}
                render={TextArea}
                placeholder={"enter your message here"}
                className={css.textArea}
              />
              <button disabled={!valid} className={css.button}>
                Add Post
              </button>
            </form>
          </div>
        );
      }}
    />
  );
};

export default MyPostsForm;
