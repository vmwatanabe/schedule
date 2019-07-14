import React, { Component } from 'react'
import { Modal } from 'antd'

import FormMedic from '../../components/formMedic/formMedic'

class ModalMedic extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleOk = e => {
    const {onOk, onError} = this.props

    const {form} = this.formRef.props

    form.validateFields((err, values) => {
      if (!err)
        onOk && onOk(values)
      else
        onError && onError('Preencha ao menos o campo Nome e o campo CPF')
    })
  }

  handleCancel = e => {
    const {onCancel} = this.props
    
    const {form} = this.formRef.props
    form.resetFields()

    onCancel && onCancel()
  }

  render() {
    const {title, editing, editingData} = this.props

    return (
      <Modal
        title={title || 'Criação de Médico'}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormMedic
          initialValue={editing && editingData}
          wrappedComponentRef={node => this.formRef = node}
        />
      </Modal>
    )
  }
}

export default ModalMedic