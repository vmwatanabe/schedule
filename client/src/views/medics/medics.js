import React, { Component } from 'react'
import { Table, Button, Divider, Input } from 'antd'

import ModalMedic from '../../components/modalMedic/modalMedic'

import MedicsService from '../../services/medics'

import './medics.css'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMedics: [],
      loading: false,
      modalOpen: false,
      modalIsEditing: false,
      modalEditingData: null
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
            <span onClick={() => this.setEditingData(record)}>Editar</span>
            <Divider type="vertical" />
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

  setEditingData(data) {
    this.setState({
      modalEditingData: data,
      modalIsEditing: true,
      modalOpen: true
    })
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

  onOk(params) {
    if (this.state.modalEditingData && this.state.modalEditingData.id) {
      this.onEditMedic(params)
    } else {
      this.onCreateMedic(params)
    }
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

  onEditMedic(params) {
    MedicsService.editMedic({
      ...params,
      id: this.state.modalEditingData.id
    })
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false,
          modalIsEditing: false,
          modalEditingData: null
        }, this.getMedics.bind(this))
      })
  }

  onSearchChange(e) {
    const value = e.target.value
    if (e.target.value) {
      this.setLoading(() => this.getMedicsByName(value))
    } else {
      this.setLoading(this.getMedics.bind(this))
    }
  }

  getMedicsByName(value) {
    MedicsService.getMedicsByName(value)
      .then(res => {
        this.setState({
          loading: false,
          currentMedics: res.data || []
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
        <div className="details">
          <div className="title">
            <span>Médicos</span>
            <Input
              onChange={this.onSearchChange.bind(this)}
              placeholder="Pesquisar médico por nome"
              style={{ width: 200 }}
            />
          </div>
          <Button onClick={() => this.setState({modalOpen: true})}>Criar médico</Button>
        </div>
        <ModalMedic
          visible={this.state.modalOpen}
          onOk={this.onOk.bind(this)}
          title={this.state.modalIsEditing ? 'Editando médico' : null}
          onCancel={() => this.setState({modalOpen: false, modalIsEditing: false, modalEditingData: null})}
          editing={this.state.modalIsEditing}
          editingData={this.state.modalEditingData}
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
