import './App.css'
import React from "react"
import NavBar from './Components/navBar/navBar';
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import News from "./Components/News/news";
import Music from "./Components/Music/music";
import Settings from "./Components/Settings/settings";
import DialogsContainer from "./Components/Dialogs/dialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import UsersWithAxiosContainer from "./Components/Users/Users with Axios (Class Component)/UsersWithAxiosContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import WithRouterHeaderContainer from "./Components/Header/HeaderContainer";
import LoginContainer from "./Components/Login/LoginForm/LoginContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {appReducerAC} from "./Redux/appReducer";
import coloredCircleIMG from './img/loading/coloredCircle.gif'
import store from "./Redux/redux-store";

class App extends React.Component {

    componentDidMount() {
        this.props.initializationThunkCreator()
    }

    render() {
        if (!this.props.initialized) {
            return <img className={'preloader'} src={coloredCircleIMG} alt={'app initializing loader'}/>
        }
        return (
            <div className='app-wrapper'>
                <WithRouterHeaderContainer/>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path={'/'} render={() => <ProfileContainer/>}/>
                        <Route path={'/profile/:userId?/'} render={() => <ProfileContainer/>}/>
                        <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                        <Route path={'/news'} render={() => <News/>}/>
                        <Route path={'/music'} component={Music}/>
                        <Route path={'/settings'} component={Settings}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/users_from_axios'} render={() => <UsersWithAxiosContainer/>}/>
                        <Route path={'/login'} render={() => <LoginContainer/>}/>
                    </Switch>
                </div>
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

let DefaultApp = compose(withRouter, connect(mapStateToProps, appReducerAC))(App)

let MainApp = () => {
    return <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DefaultApp/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
}

export default MainApp

window.store = store
