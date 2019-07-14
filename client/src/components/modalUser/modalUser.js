import React, { Component } from 'react'
import { Modal } from 'antd'

import FormUser from '../../components/formUser/formUser'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ModalUser extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleOk = e => {
    const {onOk} = this.props

    const {form} = this.formRef.props

    form.validateFields((err, values) => {
      if (!err)
        onOk && onOk(values)
    })
  }

  handleCancel = e => {
    const {onCancel} = this.props

    const {form} = this.formRef.props
    form.resetFields()

    onCancel && onCancel()
  }

  render() {
    const {title} = this.props

    return (
      <Modal
        title={title || 'Criação de Usuário'}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormUser
          wrappedComponentRef={node => this.formRef = node}
        />
      </Modal>
    )
  }
}

export default ModalUser