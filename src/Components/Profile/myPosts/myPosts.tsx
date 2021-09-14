import React from "react";
import css from "./myPosts.module.css";
import Post from "./post/Post";
import MyPostsForm from "./MyPostsForm/MyPostsForm";
import { MyPostsPropsType } from "./myPostsContainer";

class MyPosts extends React.Component<MyPostsPropsType> {
  render() {
    const postsList = this.props.posts.map((post) => (
      <Post
        avatar={post.avatar}
        texting={post.texting}
        likeAmount={post.likeAmount}
      />
    ));
    const onAddPost = (event: React.FormEvent<HTMLInputElement>) => {
      const target = event as typeof event & {
        newPostContent: string;
      };

      let text = target.newPostContent;
      if (text === "" || text === undefined) {
        return;
      } else {
        this.props.addPost(text);
        target.newPostContent = "";
      }
    };

    return (
      <div className={css.myPost}>
        <div>
          <MyPostsForm {...this.props} onAddPost={onAddPost} />
          <br />
          <br />
        </div>
        {postsList}
      </div>
    );
  }
}

export default MyPosts;
