import React from "react"
import css from './myPosts.module.css'
import Post from "./post/Post";
import MyPostsForm from "./MyPostsForm/MyPostsForm";


class MyPosts extends React.Component {

    render() {
        let postsList = this.props.posts.map(post => <Post avatar={post.avatar} texting={post.texting}
                                                           likeAmount={post.likeAmount}/>)
        let onAddPost = (event) => {
            let text = event.newPostContent
            if (text === '' || text === undefined) {
                return
            } else {
                this.props.addPost(text)
                event.newPostContent = ''
            }
        }

        return (
            <div className={css.myPost}>
                <div>
                    <MyPostsForm {...this.props} onAddPost={onAddPost}/>
                    <br/><br/>
                </div>
                {postsList}
            </div>

        )
    }
}

export default MyPosts