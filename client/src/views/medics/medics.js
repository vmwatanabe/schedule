import React, { Component } from 'react'
import { Table } from 'antd'

import MedicsService from '../../services/medics'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMedics: [],
      loading: false
    }

    this.columns = [
      {
        title: 'Nome do Médico',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        render: data => data || '-'
      },
      {
        title: 'Telefone',
        dataIndex: 'phone',
        key: 'phone',
        render: data => data || '-'
      },
    ]
  }

  componentDidMount() {
    this.setState({
      loading: true
    }, this.getMedics.bind(this))
  }

  getMedics() {
    MedicsService.getMedics()
      .then(res => {
        this.setState({
          loading: false,
          currentMedics: res.data
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        console.log('error: ', err)
      })
  }

  render () {
    const {loading, currentMedics} = this.state

    return (
      <div className="medics">
        <Table
          columns={this.columns}
          loading={loading}
          dataSource={currentMedics}
        />
      </div>
    )
  }
}

export default Medics
