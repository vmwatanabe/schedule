import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

class FormUser extends Component {
  componentDidMount() {
    this.props.form.validateFields()
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form
    
    const {initialValue} = this.props

    const userNameError = isFieldTouched('name') && getFieldError('name')
    const userPhoneError = isFieldTouched('phone') && getFieldError('phone')
    const userEmailError = isFieldTouched('email') && getFieldError('email')
    const userDocumentError = isFieldTouched('document') && getFieldError('document')

    return (
      <Form>
        <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
            initialValue: (initialValue && initialValue.name) ? initialValue.name : null
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Nome do usuário"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={userPhoneError ? 'error' : ''} help={userPhoneError || ''}>
          {getFieldDecorator('phone', {
            initialValue: (initialValue && initialValue.phone) ? initialValue.phone : null
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="phone"
              placeholder="Telefone"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={userEmailError ? 'error' : ''} help={userEmailError || ''}>
          {getFieldDecorator('email', {
            initialValue: (initialValue && initialValue.email) ? initialValue.email : null
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="E-Mail"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={userDocumentError ? 'error' : ''} help={userDocumentError || ''}>
          {getFieldDecorator('document', {
            rules: [{ required: true, message: 'Campo obrigatório' }],
            initialValue: (initialValue && initialValue.document) ? initialValue.document : null
          })(
            <Input
              prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="document"
              placeholder="CPF"
            />,
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

const WrappedUserForm = Form.create({ name: 'create_user' })(FormUser)

export default WrappedUserForm
