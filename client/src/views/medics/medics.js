import React, { Component } from 'react'
import { Table } from 'antd'

import FormMedic from '../../components/formMedic/formMedic'

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

  onCreateMedic(params) {
    MedicsService.postMedic(params)
      .then(() => {
        this.setState({
          loading: false
        }, this.getMedics.bind(this))
      })
  }

  render () {
    const {loading, currentMedics} = this.state

    return (
      <div className="medics">
        <FormMedic onSubmit={this.onCreateMedic.bind(this)}/>
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
