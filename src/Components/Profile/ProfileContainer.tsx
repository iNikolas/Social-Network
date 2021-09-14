import React, { CSSProperties } from "react";
import Profile from "./profile";
import { profileReducerAC } from "../../Redux/profileReducer";
import { connect, ConnectedProps } from "react-redux";
import Loader from "../Common/loader/Loader";
import { withRouter } from "react-router-dom";
import { withAuth } from "../HOCs/withAuth/withAuth";
import { compose } from "redux";
import { RootState } from "../../Redux/redux-store";

let mapStateToProps = (state: RootState) => {
  return {
    profile: state.profile,
    authData: state.authInfo.data,
  };
};
const connector = connect(mapStateToProps, profileReducerAC);
const compositor = compose(withAuth, withRouter, connector);
type match = {
  params: any;
  isExact: boolean;
  path: string;
  url: string;
};
type history = {
  length: number;
  action: string;
  location: { pathname: string };
  search: string;
  hash: string;
  push: (path: string) => void;
};
export type ProfilePropsType = ConnectedProps<typeof connector> & {
  match: match;
  history: history;
};

class ProfileContainer extends React.Component<ProfilePropsType> {
  componentDidMount() {
    let id = this.props.match.params.userId;
    !id ? (id = this.props.authData.id) : (id = id);
    !id ? this.props.history.push("/news") : (id = id);
    this.props.updateProfileContainerOnRequestThunkCreator(id);
  }

  render() {
    const wrapperWaitingStyle: CSSProperties = {
      textAlign: "center",
      border: "1px dashed grey",
      marginLeft: "20%",
      marginRight: "20%",
    };
    const wrapperStyle: CSSProperties = {
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

export default compositor(ProfileContainer);
