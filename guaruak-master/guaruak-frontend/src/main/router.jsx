import React from 'react';
import { BrowserRouter  as Router, Route } from 'react-router-dom'

import Dictionary from '../dictionary/dictionary';
import authOrAdmin from '../admin/main/authOrAdmin';

export default props => (
    <Router>
        <Route path="/" exact component={Dictionary} />
        <Route path="/admin" component={authOrAdmin} />
    </Router>
);