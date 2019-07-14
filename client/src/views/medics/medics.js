import React, { Component } from 'react'
import { Table, Button } from 'antd'

import ModalMedic from '../../components/modalMedic/modalMedic'

import MedicsService from '../../services/medics'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMedics: [],
      loading: false,
      modalOpen: false
    }

    this.columns = [
      {
        title: 'Nome do Médico',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'CPF',
        dataIndex: 'document',
        key: 'document',
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
          loading: false,
          modalOpen: false
        }, this.getMedics.bind(this))
      })
  }

  render () {
    const {loading, currentMedics} = this.state

    return (
      <div className="medics">
        <Button onClick={() => this.setState({modalOpen: true})}>Criar médico</Button>
        <ModalMedic
          visible={this.state.modalOpen}
          onOk={this.onCreateMedic.bind(this)}
          onCancel={() => this.setState({modalOpen: false})}
        />
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
