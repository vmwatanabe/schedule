import React, { Component } from 'react'
import { Table, Button, Divider, Input} from 'antd'

import ModalUser from '../../components/modalUser/modalUser'

import UsersService from '../../services/users'

import './users.css'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUsers: [],
      loading: false,
      modalOpen: false,
      modalIsEditing: false,
      modalEditingData: null
    }

    this.columns = [
      {
        title: 'Nome do Usuário',
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
            <span onClick={() => this.setLoading(this.deleteUser.bind(this, record.id))}>Deletar</span>
          </div>
        ),
      },
    ]
  }

  componentDidMount() {
    this.setLoading(this.getUsers.bind(this))
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

  getUsers() {
    UsersService.getUsers()
      .then(res => {
        this.setState({
          loading: false,
          currentUsers: res.data
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
      this.onEditUser(params)
    } else {
      this.onCreateUser(params)
    }
  }

  onCreateUser(params) {
    UsersService.postUser(params)
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false
        }, this.getUsers.bind(this))
      })
  }

  onEditUser(params) {
    UsersService.editUser({
      ...params,
      id: this.state.modalEditingData.id
    })
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false,
          modalIsEditing: false,
          modalEditingData: null
        }, this.getUsers.bind(this))
      })
  }

  deleteUser(id) {
    UsersService.deleteUser(id)
      .then(this.getUsers.bind(this))
      .finally(res => {
        this.setState({
          loading: false
        })
      })
  }

  onSearchChange(e) {
    const value = e.target.value
    if (e.target.value) {
      this.setLoading(() => this.getUsersByName(value))
    } else {
      this.setLoading(this.getUsers.bind(this))
    }
  }

  getUsersByName(value) {
    UsersService.getUsersByName(value)
      .then(res => {
        this.setState({
          loading: false,
          currentUsers: res.data
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
    const {loading, currentUsers} = this.state

    return (
      <div className="users">
        <div className="details">
          <div className="title">
            <span>Usuários</span>
            <Input
              onChange={this.onSearchChange.bind(this)}
              placeholder="Pesquisar usuário por nome"
              style={{ width: 200 }}
            />
          </div>
          <Button onClick={() => this.setState({modalOpen: true})}>Criar usuário</Button>
        </div>
        <ModalUser
          visible={this.state.modalOpen}
          onOk={this.onOk.bind(this)}
          title={this.state.modalIsEditing ? 'Editando usuário' : null}
          onCancel={() => this.setState({modalOpen: false, modalIsEditing: false, modalEditingData: null})}
          editing={this.state.modalIsEditing}
          editingData={this.state.modalEditingData}
        />
        <Table
          columns={this.columns}
          loading={loading}
          dataSource={currentUsers}
        />
      </div>
    )
  }
}

export default Medics
