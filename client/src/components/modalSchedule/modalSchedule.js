import React, { Component } from 'react'
import { Modal } from 'antd'

import FormSchedule from '../../components/formSchedule/formSchedule'

class ModalSchedule extends Component {
  componentDidUpdate(prevProps) {
    const {visible} = this.props

    if (prevProps.visible && !visible) {
      this.formRef && this.formRef.props && this.formRef.props.form.resetFields()
    }
  }

  handleOk = e => {
    const {onOk} = this.props

    const {form} = this.formRef.props

    form.validateFields((err, values) => {
      if (!err)
        onOk && onOk({
          ...values,
          scheduledTo: values.scheduledTo.toISOString()
        })
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
        title={title || 'Criação de Consulta'}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormSchedule
          initialValue={editing && editingData}
          wrappedComponentRef={node => this.formRef = node}
        />
      </Modal>
    )
  }
}

export default ModalSchedule