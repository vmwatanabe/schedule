import React, { Component } from 'react'
import { Table, Button } from 'antd'

import ModalUser from '../../components/modalUser/modalUser'

import UsersService from '../../services/users'

import './users.css'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUsers: [],
      loading: false,
      modalOpen: false
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
            <span onClick={() => 1}>Editar</span>
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

  onCreateUser(params) {
    UsersService.postUser(params)
      .then(() => {
        this.setState({
          loading: false,
          modalOpen: false
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

  render () {
    const {loading, currentUsers} = this.state

    return (
      <div className="users">
        <div className="details">
          <div className="title">
            <span>Usuários</span>
          </div>
          <Button onClick={() => this.setState({modalOpen: true})}>Criar usuário</Button>
        </div>
        <ModalUser
          visible={this.state.modalOpen}
          onOk={this.onCreateUser.bind(this)}
          onCancel={() => this.setState({modalOpen: false})}
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
