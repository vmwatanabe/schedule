import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"

import Home from './views/home/home'
import Medics from './views/medics/medics'
import Users from './views/users/users'
import Header from './components/header/header'

import './App.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <Router>
      <div>
        <Header/>

        <Route path="/" exact component={Home} />
        <Route path="/medics/" component={Medics} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  )
}

export default App
