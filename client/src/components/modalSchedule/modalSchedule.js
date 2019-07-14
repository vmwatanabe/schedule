import React, { Component } from 'react'
import { Modal } from 'antd'

import FormSchedule from '../../components/formSchedule/formSchedule'

class ModalSchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {}
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
    const {title} = this.props


    return (
      <Modal
        title={title || 'Criação de Consulta'}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormSchedule
          wrappedComponentRef={node => this.formRef = node}
        />
      </Modal>
    )
  }
}

export default ModalSchedule