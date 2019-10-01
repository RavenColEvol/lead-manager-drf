import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/css/bootstrap.min.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import AlertTemplate from 'react-alert-template-basic';
import {Provider as AlertProvider} from 'react-alert';

import Header from './layout/Header'
import Dashboard from './leads/Dashboard'

import { Provider } from 'react-redux';
import store from '../store';

import Alerts from '../components/layout/Alerts'
import  Login  from './accounts/Login';
import  Register  from './accounts/Register';

import PrivateRoute from '../components/common/PrivateRoute';
import {loadUser} from '../actions/auth';

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center"
}

class App extends React.Component {

    componentDidMount(){
        store.dispatch(loadUser());
    }

    render(){
        return(
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Header/>
                        <Alerts/>
                        <div className='container'>
                        <Switch>
                            <PrivateRoute path='/' exact component={Dashboard}></PrivateRoute>
                            <Route path='/login' exact component={Login}></Route>
                            <Route path='/register' exact component={Register}></Route>
                        </Switch>
                        </div>
                    </Router>
                <>
                </>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))