import React from 'react'
import {Redirect} from "react-router-dom";
import Loader from "../../Common/loader/Loader";
import {connect} from "react-redux";

export function withAuth(Component) {

    let mapStateToProps = (state) => (
        {
            isAuthorized: state.authInfo.isAuthorized,
            isLoading: state.authInfo.isLoading
        }
    )

    class AuthenticatedComponent extends React.Component {
        isAuthorized() {
            return this.props.isAuthorized
        }

        isLoading() {
            return this.props.isLoading
        }

        render() {
            let wrapperWaitingStyle = {
                textAlign: 'center',
                border: '1px dashed grey',
                marginLeft: '20%',
                marginRight: '20%'
            }

            if (this.isLoading()) {
                return <div style={wrapperWaitingStyle}><Loader/></div>
            }
            let {isAuthorized, isLoading, ...newProps} = {...this.props}

            return <div>
                {this.isAuthorized() ? <Component {...newProps}/> : <Redirect to={'/login'}/>}
            </div>
        }
    }

    let ConnectedAuthenticatedComponent = connect(mapStateToProps)(AuthenticatedComponent)

    return ConnectedAuthenticatedComponent
}