import React from "react"
import {profileReducerAC} from "../../../Redux/profileReducer";
import MyPosts from "./myPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profile.posts,
        newPostContent: state.profile.postInputArea
    }
}

const MyPostsContainer = connect(mapStateToProps, profileReducerAC)(MyPosts)


export default MyPostsContainer