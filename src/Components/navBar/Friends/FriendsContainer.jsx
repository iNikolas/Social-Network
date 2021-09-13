import React from "react";
import Friends from "./Friends";
import StoreContext from "../../../StoreContext.txt";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    usersInfo: state.usersInfo,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default FriendsContainer;
