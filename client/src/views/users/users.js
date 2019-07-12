import React, { Component } from 'react'
import { Table } from 'antd'

import FormUser from '../../components/formUser/formUser'

import UsersService from '../../services/users'

class Medics extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUsers: [],
      loading: false
    }

    this.columns = [
      {
        title: 'Nome do Usuário',
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
    }, this.getUsers.bind(this))
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
          loading: false
        }, this.getUsers.bind(this))
      })
  }

  render () {
    const {loading, currentUsers} = this.state

    return (
      <div className="users">
        <FormUser onSubmit={this.onCreateUser.bind(this)}/>
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
