import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import {followAC, setUsersInfoAC, unfollowAC} from "../../Redux/usersInfoReducer";

let mapStateToProps = (state) => {
    return {
        usersInfo: state.usersInfo,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (idNumber) => {
            dispatch(followAC(idNumber))
        },
        unfollow: (idNumber) => {
            dispatch(unfollowAC(idNumber))
        },
        setUsersInfo: (usersInfoData) => {
            dispatch(setUsersInfoAC(usersInfoData))
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer