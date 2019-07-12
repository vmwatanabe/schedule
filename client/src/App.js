import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './views/home/home'
import Medics from './views/medics/medics'
import Users from './views/users/users'

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
            <li>
              <Link to="/medics/">Medics</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/medics/" component={Medics} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default App;
