import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Index from '../index/index';
import addWord from '../addWord/addWord';

import Header from '../template/header';
import Sidebar from '../template/sidebar';
import Footer from '../template/footer';

class Admin extends Component {
    render() {
        return (
            <div className={`skin-green sidebar-mini ${this.props.openSidebar ? 'sidebar-collapse' : ''}`} style={{ width: '100%', maxWidth: '100%' }}>
                <div className="wrapper" style={{ width: '100%', maxWidth: '100%' }}>
                    <Header />
                    <Sidebar location={this.props.location} />
                    <Route path="/admin" exact component={Index} />
                    <Route path="/admin/adicionar" exact component={addWord} />
                    <Footer />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    openSidebar: state.template.openSidebar
});
export default connect(mapStateToProps)(Admin);