import React from "react";
import css from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={css.Post}>
      <img src={props.avatar} alt="avatar" /> {props.texting}
      <div>
        <span>Likes: {props.likeAmount}</span>
      </div>
    </div>
  );
};

export default Post;
