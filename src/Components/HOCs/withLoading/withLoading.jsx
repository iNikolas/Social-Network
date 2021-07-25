import React from 'react'
import Loader from "../../Common/loader/Loader";

function withLoading (Component) {
    return function WithLoadingComponent ({isLoading, ...props}) {
        if (isLoading === false) {
            return <Component {...props} />
        }
        return <Loader />
    }
}

export default withLoading