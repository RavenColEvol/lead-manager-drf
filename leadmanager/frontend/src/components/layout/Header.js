import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth';
class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    }
    render() {
        const {user,isAuthenticated} = this.props.auth;
        const guestLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/login'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to='/register'>Register</Link>
                    </li>
            </ul>
        );
        const authLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' onClick={this.props.logout}>Logout</a>
                    </li>
            </ul>
        );

        const capitalName = () => this.props.auth.user.username.charAt(0).toUpperCase() + this.props.auth.user.username.slice(1);
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="#">{this.props.auth.isAuthenticated?capitalName():'Raven'}Leads</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    
                    {isAuthenticated ? authLinks : guestLinks}
                    <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth:state.auth
});

export default connect(mapStateToProps, {logout})(Header)