import React from "react";
import { profileReducerAC } from "../../../Redux/profileReducer";
import MyPosts from "./myPosts";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../Redux/redux-store";

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.profile.posts,
    newPostContent: state.profile.postInputArea,
  };
};

export type MyPostsMapStatePropsType = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps, profileReducerAC);
export type MyPostsPropsType = ConnectedProps<typeof connector>;
const MyPostsContainer = connector(MyPosts);

export default MyPostsContainer;
