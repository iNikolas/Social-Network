import React from "react"
import css from './profile.module.css'
import ProfileInfo from "./profileInfo/profileInfo"
import AvaAndDescription from "./avaAndDescription/avaAndDescription"
import MyPostsContainer from "./myPosts/myPostsContainer";

class Profile extends React.Component {
    render() {
        console.log('render profile')
        let {profileStatusInputArea, ...anotherProps} = {...this.props.profile}
        let {editProfileStatusField, ...someOtherProps} = {...this.props}
        let {id, ...moreUselessProps} = {...this.props.authData}
        return (
            <div>
                <div>
                    <ProfileInfo id={id} profileStatusInputArea={profileStatusInputArea}
                                 editProfileStatusField={editProfileStatusField}/>
                </div>
                <div className={css.content}>
                    <AvaAndDescription {...this.props}/>
                    <MyPostsContainer/>
                </div>
            </div>
        )
    }
}

export default Profile