import React from 'react'
import { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd';
export default function Open(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user_name, setUserName] = useState('');
  const [user_mail, setUserMail] = useState('');
  const [user_contact, setUserContact] = useState('');

  const onChangeUsername = (event) => {
    setUserName(event.target.value);
  }
  const onChangeMail = (event) => {
    setUserMail(event.target.value)
  }
  const onChangeNumber = (event) => {
    setUserContact(event.target.value)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const dt = {
        name: user_name,
        email: user_mail,
        phone: user_contact
      }
      const result = await fetch('http://127.0.0.1:5000/insert', {
        'method': 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(dt)
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const handleform = (e) => {
  //     console.log(e)
  // }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Data
      </Button>
      <Modal title="Add Data" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
        <Form>
          <Form.Item label='Name' name='name'>
            <Input placeholder='Enter Name here' onChange={onChangeUsername} />
          </Form.Item>
          <Form.Item label='Email' name = 'email'>
            <Input placeholder='Enter Email here' onChange={onChangeMail} />
          </Form.Item>
          <Form.Item label='Phone No ' name = 'phone  '>
            <Input placeholder='Enter Phone No here' onChange={onChangeNumber}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}