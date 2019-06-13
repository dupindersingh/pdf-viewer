import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import Dashboard from './container/dashboard/index';
import Login from './container/account/login';
import {store} from '../src/index';
import Footer from "./components/app/footer";
import Sidebar from "./components/dashboard/sidebar";
import Profile from './container/dashboard/profile';
import {getProfile} from "./actions/dashboard/profile";
import Account from './components/Account/index';

function checkAuth() {
    const {auth} = store.getState().accountReducer;
    const {isAuthenticated} = auth;
    return isAuthenticated
}

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Component {...props}/>
            : <Redirect to='/login'/>
    }
    }/>
);

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Redirect to='/dashboard'/>
            : <Component {...props}/>
    }}/>
);

export function BodyWrapper(props) {
    return (
        <div>
            <div className="wrapper">
                {/* <Header/>*/}
                <Sidebar/>
                <div className="content-wrapper">
                    {/*<PageNavigationHeader/>*/}
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute exact path="/profile-2" component={Account}/>
                        <Redirect from="*" to='/dashboard'/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

class RouteComponent extends Component {
    componentDidMount() {
        if (this.props.isAuthenticated && this.props.location.pathname !== "/profile") {
            this.props.dispatch(getProfile())
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            if (nextProps.isAuthenticated) {
              nextProps.dispatch(getProfile())
            }
        }
    }

    render() {
        return (

            <div>
                <Switch>
                    <ProtectedRoute exact path="/login" component={Login}/>
                    <BodyWrapper props={this.props}/>
                    <Footer/>
                </Switch>
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.accountReducer;
    const {isAuthenticated} = auth;
    return {isAuthenticated}
}

export default withRouter(connect(mapStateToProps)(RouteComponent));