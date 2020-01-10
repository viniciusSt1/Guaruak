import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faList, faPlus, faBook } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component{

    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar" style={{ height: 'auto' }}>
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="/img/userIcon.png" alt="user" className="img-circle"/>
                        </div>
                        <div className="pull-left info">
                            <p>{ this.props.user.name }</p>
                            <a href="/#">
                                <FontAwesomeIcon icon={faCircle} className="text-success" />
                                &nbsp; Online
                            </a>
                        </div>
                    </div>
                    <ul className="sidebar-menu tree" data-widget="tree">
                        <li className="active treeview menu-open">
                            <a href="#/">
                                <FontAwesomeIcon icon={faBook} />
                                <span>&nbsp; Palavras</span>
                                <span className="pull-right-container">
                                    <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li className={this.props.location.pathname === '/admin' ? 'active' : ''}>
                                    <Link to="/admin">
                                        <FontAwesomeIcon icon={faList} />
                                        &nbsp; Listar
                                    </Link>
                                </li>
                                <li className={this.props.location.pathname === '/admin/adicionar' ? 'active' : ''}>
                                    <Link to="/admin/adicionar">
                                        <FontAwesomeIcon icon={faPlus} />
                                        &nbsp; Adicionar
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
}

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(mapStateToProps)(Sidebar);