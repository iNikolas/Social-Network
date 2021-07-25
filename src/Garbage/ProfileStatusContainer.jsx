import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {profileReducerAC} from "../Redux/profileReducer";
import ProfileStatusWithHooks from "../Components/Profile/profileInfo/ProfileStatus/profileStatusWithHooks";

let mapStateToProps = (state) => ({

})

class ProfileStatusContainer extends React.Component {
    componentDidMount() {
        this.props.getStatusFieldThunkCreator(this.props.id)

    }


    render() {
        return <ProfileStatusWithHooks {...this.props} />
    }
}



export default compose (connect(mapStateToProps, {...profileReducerAC}))(ProfileStatusContainer)