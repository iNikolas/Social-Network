import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { usersInfoWithAxiosAC } from "../../../Redux/usersReducer (with Axios)/usersInfoReducerWithAxios";
import UsersWithAxios from "./UsersWithAxios";
import { RootState } from "../../../Redux/redux-store";

let mapStateToProps = (state: RootState) => {
  return {
    users: state.users,
  };
};

const connector = connect(mapStateToProps, usersInfoWithAxiosAC);
export type PropsFromRedux = ConnectedProps<typeof connector>;

class UsersWithAxiosContainer extends React.Component<PropsFromRedux, {}> {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.users.pageSize,
      this.props.users.currentPage
    );
  }

  onPageChanged(pageNumber: number) {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsersThunkCreator(this.props.users.pageSize, pageNumber);
  }

  updateOnRequest() {
    this.props.getUsersThunkCreator(
      this.props.users.pageSize,
      this.props.users.currentPage,
      "withoutFetching"
    );
  }

  render() {
    return (
      <UsersWithAxios
        {...this.props}
        onPageChanged={this.onPageChanged.bind(this)}
        updateOnRequest={this.updateOnRequest.bind(this)}
      />
    );
  }
}

export default connector(UsersWithAxiosContainer);
