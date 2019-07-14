import React, { Component } from 'react'
import { Table, Button, Divider } from 'antd'

import ModalSchedule from '../../components/modalSchedule/modalSchedule'

import ConsultationsService from '../../services/consultations'

import moment from 'moment'

import './home.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentConsultations: [],
      loading: false,
      modalOpen: false,
      modalIsEditing: false,
      modalEditingData: null
    }

    this.columns = [
      {
        title: 'Nome do Usuário',
        dataIndex: 'User',
        key: 'User',
        render: user => <span>{(user && user.name) || '-'}</span>
      },
      {
        title: 'Nome do Médico',
        dataIndex: 'Medic',
        key: 'Medic',
        render: medic => <span>{(medic && medic.name) || '-'}</span>
      },
      {
        title: 'Data e hora',
        dataIndex: 'scheduledTo',
        key: 'scheduledTo',
        render: date => <span>{date && moment(date).format('lll')}</span>
      },
      {
        title: 'Ações',
        key: 'action',
        render: (text, record) => (
          <div className="actions">
            <span onClick={() => this.setEditingData(record)}>Editar</span>
            <Divider type="vertical" />
            <span onClick={() => this.setLoading(this.deleteConsultation.bind(this, record.id))}>Deletar</span>
          </div>
        ),
      },
    ]
  }

  componentDidMount() {
    this.setLoading(this.getConsultations.bind(this))
  }

  setLoading(callback) {
    this.setState({
      loading: true
    }, callback)
  }

  setEditingData(data) {
    this.setState({
      modalEditingData: data,
      modalIsEditing: true,
      modalOpen: true
    })
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

  onOk(params) {
    if (this.state.modalEditingData && this.state.modalEditingData.id) {
      this.onEditConsultation(params)
    } else {
      this.onCreateConsultation(params)
    }
  }

  onCreateConsultation(params) {
    ConsultationsService.postConsultation(params)
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false
        }, this.getConsultations.bind(this))
      })
  }

  onEditConsultation(params) {
    ConsultationsService.editConsultation({
      ...params,
      id: this.state.modalEditingData.id
    })
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false,
          modalIsEditing: false,
          modalEditingData: null
        }, this.getConsultations.bind(this))
      })
  }

  deleteConsultation(id) {
    ConsultationsService.deleteConsultation(id)
      .then(this.setLoading.bind(this, this.getConsultations.bind(this)))
      .finally(res => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const {loading, currentConsultations} = this.state

    return (
      <div className="home">
        <div className="details">
          <div className="title">
            <span>Consultas</span>
          </div>
          <Button onClick={() => this.setState({modalOpen: true})}>Criar consulta</Button>
        </div>
        <ModalSchedule
          visible={this.state.modalOpen}
          onOk={this.onOk.bind(this)}
          title={this.state.modalIsEditing ? 'Editando consulta' : null}
          onCancel={() => this.setState({modalOpen: false, modalIsEditing: false, modalEditingData: null})}
          editing={this.state.modalIsEditing}
          editingData={this.state.modalEditingData}
        />
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
