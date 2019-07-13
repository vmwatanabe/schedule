import React, { Component } from 'react'
import { Table } from 'antd'

import FormSchedule from '../../components/formSchedule/formSchedule'

import ConsultationsService from '../../services/consultations'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentConsultations: [],
      loading: false
    }

    this.columns = [
      {
        title: 'Nome do Usuário',
        dataIndex: 'User',
        key: 'User',
        render: user => <span>{user.name}</span>
      },
      {
        title: 'Nome do Médico',
        dataIndex: 'Medic',
        key: 'Medic',
        render: medic => <span>{medic.name}</span>
      },
      {
        title: 'Data e hora',
        dataIndex: 'scheduledTo',
        key: 'scheduledTo',
        render: date => <span>{date}</span>
      }
    ]
  }

  componentDidMount() {
    this.setState({
      loading: true
    }, this.getConsultations.bind(this))
  }

  getConsultations() {
    ConsultationsService.getConsultations()
      .then(res => {
        this.setState({
          loading: false,
          currentConsultations: res.data
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        console.log('error: ', err)
      })
  }

  onCreateConsultation(params) {
    ConsultationsService.postConsultation(params)
      .then(() => {
        this.setState({
          loading: false
        }, this.getConsultations.bind(this))
      })
  }

  render () {
    const {loading, currentConsultations} = this.state

    return (
      <div className="home">
        <FormSchedule onSubmit={this.onCreateConsultation.bind(this)}/>
        <Table
          columns={this.columns}
          loading={loading}
          dataSource={currentConsultations}
        />
      </div>
    )
  }
}

export default Home
