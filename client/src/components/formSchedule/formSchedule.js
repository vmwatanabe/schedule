import React, { Component } from 'react'
import { Form, DatePicker, Button, Select } from 'antd'

import MedicsService from '../../services/medics'
import UsersService from '../../services/users'

import moment from 'moment'

const { Option } = Select

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

  handleReset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form

    const {initialValue} = this.props

    const medicNameError = isFieldTouched('medicId') && getFieldError('medicId')
    const userError = isFieldTouched('userId') && getFieldError('userId')
    const scheduledError = isFieldTouched('scheduledTo') && getFieldError('scheduledTo')
    return (
      <Form>
        <Form.Item validateStatus={medicNameError ? 'error' : ''} help={medicNameError || ''}>
          {getFieldDecorator('medicId', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
            initialValue: (initialValue && initialValue.medicId) ? initialValue.medicId : undefined
          })(
            <Select
              showSearch
              style={{ width: 472 }}
              placeholder="Selecione o médico"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.medicsList.map(elem => {
                return (<Option key={elem.id} value={elem.id}>{elem.name}</Option>)
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item validateStatus={userError ? 'error' : ''} help={userError || ''}>
          {getFieldDecorator('userId', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
            initialValue: (initialValue && initialValue.userId) ? initialValue.userId : undefined
          })(
            <Select
              showSearch
              style={{ width: 472 }}
              placeholder="Selecione o paciente"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.usersList.map(elem => {
                return (<Option key={elem.id} value={elem.id}>{elem.name}</Option>)
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item validateStatus={scheduledError ? 'error' : ''} help={scheduledError || ''}>
          {getFieldDecorator('scheduledTo', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
            initialValue: (initialValue && initialValue.scheduledTo) ? moment(initialValue.scheduledTo) : null
          })(
            <DatePicker
              style={{ width: 472 }}
              showTime
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleReset.bind(this)}>
            Limpar campos
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedMedicForm = Form.create({ name: 'create_schedule' })(FormSchedule)

export default WrappedMedicForm
