import React, { Component } from 'react'

import ConsultationsService from '../../services/consultations'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentConsultations: []
    }
  }

  componentDidMount() {
    ConsultationsService.getConsultations()
      .then(res => {
        console.log(res)
      })
  }

  render () {
    return (
      <div className="home">
        Esta é a home
      </div>
    )
  }
}

export default Home
