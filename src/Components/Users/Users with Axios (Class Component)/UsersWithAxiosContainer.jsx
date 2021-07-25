import React from 'react'
import {connect} from "react-redux";
import {
    usersInfoWithAxiosAC
} from "../../../Redux/usersReducer (with Axios)/usersInfoReducerWithAxios";
import UsersWithAxios from "./UsersWithAxios";

let mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

class UsersWithAxiosContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.users.pageSize, this.props.users.currentPage)
    }

    onPageChanged(pageNumber) {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsersThunkCreator(this.props.users.pageSize, pageNumber)
    }

    updateOnRequest() {
        this.props.getUsersThunkCreator(this.props.users.pageSize, this.props.users.currentPage, 'withoutFetching')
    }

    render() {
        return <UsersWithAxios {...this.props} onPageChanged={this.onPageChanged.bind(this)}
                               updateOnRequest={this.updateOnRequest.bind(this)}/>


    }
}

export default connect(mapStateToProps, usersInfoWithAxiosAC)(UsersWithAxiosContainer)