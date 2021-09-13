import React from "react";
import Login from "../Login";
import { connect } from "react-redux";
import { authReducerAC } from "../../../Redux/authReducer";
import { Redirect } from "react-router-dom";

class LoginContainer extends React.Component {
  componentDidMount() {
    this.props.resetLoginFailedInfo();
  }

  isAuthorized() {
    return this.props.authInfo.isAuthorized;
  }

  render() {
    return (
      <div>
        {this.isAuthorized() ? (
          <Redirect to={"/"} />
        ) : (
          <Login {...this.props} />
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  authInfo: state.authInfo,
});

export default connect(mapStateToProps, authReducerAC)(LoginContainer);
