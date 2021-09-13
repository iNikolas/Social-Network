import React from "react";
import Profile from "./profile";
import { profileReducerAC } from "../../Redux/profileReducer";
import { connect } from "react-redux";
import Loader from "../Common/loader/Loader";
import { withRouter } from "react-router-dom";
import { withAuth } from "../HOCs/withAuth/withAuth";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    profile: state.profile,
    authData: state.authInfo.data,
  };
};

class ProfileContainer extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.userId;
    !id ? (id = this.props.authData.id) : (id = id);
    !id ? this.props.history.push("/news") : (id = id);
    this.props.updateProfileContainerOnRequestThunkCreator(id);
  }

  render() {
    let wrapperWaitingStyle = {
      textAlign: "center",
      border: "1px dashed grey",
      marginLeft: "20%",
      marginRight: "20%",
    };
    let wrapperStyle = {
      border: "1px dashed grey",
      marginLeft: "10%",
      marginRight: "10%",
    };
    return this.props.profile.waitingAnimation ? (
      <div style={wrapperWaitingStyle}>
        <Loader />
      </div>
    ) : (
      <div style={wrapperStyle}>
        <Profile {...this.props} />
      </div>
    );
  }
}

export default compose(
  withAuth,
  withRouter,
  connect(mapStateToProps, profileReducerAC)
)(ProfileContainer);
