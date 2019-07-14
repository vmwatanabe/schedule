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
      {
        title: 'Ações',
        key: 'action',
        render: (text, record) => (
          <div className="actions">
            <span onClick={() => 1}>Editar</span>
            <span onClick={() => this.setLoading(this.deleteMedic.bind(this, record.id))}>Deletar</span>
          </div>
        ),
      },
    ]
  }

  componentDidMount() {
    this.setLoading(this.getMedics.bind(this))
  }

  setLoading(callback) {
    this.setState({
      loading: true
    }, callback)
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

  deleteMedic(id) {
    MedicsService.deleteMedic(id)
      .then(this.getMedics.bind(this))
      .finally(res => {
        this.setState({
          loading: false
        })
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
