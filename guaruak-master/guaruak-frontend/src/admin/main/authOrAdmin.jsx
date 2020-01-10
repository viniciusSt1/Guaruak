import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import Admin from './admin';
import Auth from '../auth/auth';
import { validateToken } from '../auth/authActions';

class AuthOrAdmin extends Component {
    componentWillMount() {
        if(this.props.location.pathname.indexOf('/admin') > -1){
            require('./dependencies');
        }
        if (this.props.auth.user) {
            this.props.validateToken(this.props.auth.user.token);
        }
    }
    render() {
        const { user, validToken } = this.props.auth;

        if (user && validToken) {

            axios.defaults.headers.common['authorization'] = 'Bearer ' + user.token;
            return <Admin location={this.props.location}>{this.props.children}</Admin>;

        } else if (!user && !validToken) {
            return <Auth />;

        } else {

            return false;
        }
    }
}
const mapStateToProps = state => ({ auth: state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken },
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrAdmin);