import React, { Component } from 'react'
import { withRouter } from "react-router-dom"

import './header.css'

class Header extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  render() {
    return (
      <div className="header">
        <div className="main">
          <span className="title">Schedule</span>
          <span className="subtitle">por Victor Matos Watanabe</span>
        </div>
        <div className="routes">
          <span onClick={() => this.props.history.push('/')}>CONSULTAS</span>
          <span onClick={() => this.props.history.push('/users')}>USUÁRIOS</span>
          <span onClick={() => this.props.history.push('/medics')}>MÉDICOS</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
