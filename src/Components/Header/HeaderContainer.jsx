import React from "react";
import Header from "./Header";
import { authReducerAC } from "../../Redux/authReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { profileReducerAC } from "../../Redux/profileReducer";
import { compose } from "redux";
import {
  getAuthData,
  getIsAuthorized,
  getIsLoading,
} from "../../Redux/Selectors/authInfoSelector";

let mapStateToProps = (state) => {
  return {
    authData: getAuthData(state),
    isAuthorized: getIsAuthorized(state),
    isLoading: getIsLoading(state),
  };
};

class HeaderContainer extends React.Component {
  updateProfileContainerOnRequest() {
    let id = this.props.authData.id;
    !id ? (id = 2) : (id = id);
    this.props.updateProfileContainerOnRequestThunkCreator(id);
  }

  resetAuthorization() {
    this.props.logoutThunkCreator();
  }

  render() {
    return (
      <Header
        {...this.props}
        updateProfileContainerOnRequest={this.updateProfileContainerOnRequest.bind(
          this
        )}
        resetAuthorization={this.resetAuthorization.bind(this)}
      />
    );
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { ...authReducerAC, ...profileReducerAC })
)(HeaderContainer);
