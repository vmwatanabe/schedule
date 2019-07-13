import React, { Component } from 'react'
import { Form, DatePicker, Button, Select } from 'antd'

import MedicsService from '../../services/medics'
import UsersService from '../../services/users'

const { Option } = Select

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class FormSchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingMedics: false,
      loadingUsers: false,
      medicsList: [],
      usersList: []
    }
  }

  componentDidMount() {
    this.props.form.validateFields()
    this.getMedics()
    this.getUsers()
  }

  getMedics() {
    MedicsService.getMedics()
      .then(res => {
        this.setState({
          loadingMedics: false,
          medicsList: res.data || []
        })
      })
      .catch(err => {
        this.setState({
          loadingMedics: false
        })
        console.log('error: ', err)
      })
  }

  getUsers() {
    UsersService.getUsers()
      .then(res => {
        this.setState({
          loadingUsers: false,
          usersList: res.data || []
        })
      })
      .catch(err => {
        this.setState({
          loadingUsers: false
        })
        console.log('error: ', err)
      })
  }

  handleSubmit = e => {
    const {onSubmit} = this.props

    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit({
          ...values,
          scheduledTo: values.scheduledTo.toISOString()
        })
        this.handleReset()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  onChangeDate(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const medicNameError = isFieldTouched('medicId') && getFieldError('medicId')
    const medicPhoneError = isFieldTouched('userId') && getFieldError('userId')
    const medicEmailError = isFieldTouched('scheduledTo') && getFieldError('scheduledTo')
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={medicNameError ? 'error' : ''} help={medicNameError || ''}>
          {getFieldDecorator('medicId', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecione o médico"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.medicsList.map(elem => {
                return (<Option value={elem.id}>{elem.name}</Option>)
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item validateStatus={medicPhoneError ? 'error' : ''} help={medicPhoneError || ''}>
          {getFieldDecorator('userId', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecione o paciente"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.usersList.map(elem => {
                return (<Option value={elem.id}>{elem.name}</Option>)
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item validateStatus={medicEmailError ? 'error' : ''} help={medicEmailError || ''}>
          {getFieldDecorator('scheduledTo', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
          })(
            <DatePicker
              onChange={this.onChangeDate.bind(this)}
              showTime
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Cadastrar Consulta
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
            Limpar campos
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedMedicForm = Form.create({ name: 'create_medic' })(FormSchedule)

export default WrappedMedicForm
