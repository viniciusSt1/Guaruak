import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openSidebar } from './templateActions';
import { logout } from '../auth/authActions';

import { headerStyle } from './styles';


class Header extends Component {
    render(){
        return (
            <header className="main-header">
                <a href="/" className="logo">
                    <span className="logo-mini"><b>Gua</b></span>
                    <span className="logo-lg"><b>Gua</b>ruak</span>
                </a>

                <nav className="navbar navbar-static-top">
                    <a href="/#" className="sidebar-toggle" data-toggle="push-menu" onClick={ this.props.openSidebar }>
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown user user-menu">
                                <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/img/userIcon.png" className="user-image" alt="User" />
                                    <span className="hidden-xs">{ this.props.user.name }</span>
                                </a>
                                <ul className="dropdown-menu" style={ headerStyle.dropdownUserMenu }>
                                    <li className="user-header">
                                        <img src="/img/userIcon.png" className="img-circle" alt="User" style={{ zIndex: '1' }} />
                                        <p>{ this.props.user.name }</p>
                                        <p><small>{ this.props.user.email }</small></p>
                                    </li>
                                    <li className="user-footer">
                                        <div className="pull-left">
                                            <a href="/#" className="btn btn-default btn-flat">Perfil</a>
                                        </div>
                                        <div className="pull-right">
                                            <a href="#/" 
                                                className="btn btn-default btn-flat" 
                                                onClick={this.props.logout}>
                                                Sair</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ openSidebar, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);