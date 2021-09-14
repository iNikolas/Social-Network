import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Users from "./Users";
import {
  followAC,
  InitialStateType,
  setUsersInfoAC,
  unfollowAC,
} from "../../Redux/usersInfoReducer";
import { RootState } from "../../Redux/redux-store";
import { Dispatch } from "redux";

let mapStateToProps = (state: RootState) => {
  return {
    usersInfo: state.usersInfo,
  };
};

let mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    follow: (idNumber: number) => {
      dispatch(followAC(idNumber));
    },
    unfollow: (idNumber: number) => {
      dispatch(unfollowAC(idNumber));
    },
    setUsersInfo: (usersInfoData: InitialStateType) => {
      dispatch(setUsersInfoAC(usersInfoData));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromUsersContainer = ConnectedProps<typeof connector>;

const UsersContainer = connector(Users);

export default UsersContainer;
