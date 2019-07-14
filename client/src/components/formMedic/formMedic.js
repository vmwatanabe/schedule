import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class FormMedic extends Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    const {onSubmit} = this.props

    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit && onSubmit(values)
        this.handleReset()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const medicNameError = isFieldTouched('name') && getFieldError('name')
    const medicPhoneError = isFieldTouched('phone') && getFieldError('phone')
    const medicEmailError = isFieldTouched('email') && getFieldError('email')
    const medicDocumentError = isFieldTouched('document') && getFieldError('document')
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={medicNameError ? 'error' : ''} help={medicNameError || ''}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nome do médico"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={medicPhoneError ? 'error' : ''} help={medicPhoneError || ''}>
          {getFieldDecorator('phone')(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="phone"
              placeholder="Telefone"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={medicEmailError ? 'error' : ''} help={medicEmailError || ''}>
          {getFieldDecorator('email')(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="E-Mail"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={medicDocumentError ? 'error' : ''} help={medicDocumentError || ''}>
          {getFieldDecorator('document', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
          })(
            <Input
              prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="document"
              placeholder="CPF"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Cadastrar Médico
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
            Limpar campos
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedMedicForm = Form.create({ name: 'create_medic' })(FormMedic)

export default WrappedMedicForm
