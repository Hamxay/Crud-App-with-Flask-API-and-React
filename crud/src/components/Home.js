import React from 'react'
import { Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';


export default function Home() {
  const [data, setData] = useState([]);
  const [isediting, setIsEditing] = useState(false);
  const [dataEditing, setDataEditing] = useState('')


// Get Data from Database

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch('http://127.0.0.1:5000/')
        const getLoadData = await result.json()
        setData(getLoadData.data)
      } catch (error) {
        console.log(error)
      }

    }
    getData();
  }, [])

  // Delete Data from Database
  const delrow = async (id) => {
    try {
      await fetch('http://127.0.0.1:5000/delete/' + id)
    } catch (error) {
      console.log(error)
    }
  }

// Columns Name of Database
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 1,

    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 2,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 3,
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 4,
    },
    {
      title: 'Action',
      key: 5,
      render: (record) => {
        return <>
          <EditOutlined onClick={() => editData(record)} />
          <DeleteOutlined style={{ marginLeft: 15 }} onClick={() => delrow(record.id)} />
        </>
      }
    },
  ];
// Edit data From Database
  const [user_name, setUserName] = useState('');
  const [user_mail, setUserMail] = useState('');
  const [user_contact, setUserContact] = useState('');
  const [user_id, setUserId] = useState('');

  const onChangeId = (event) => {
    setUserId(event.target.value)
  }

  const onChangeUsername = (event) => {
    setUserName(event.target.value)
  }

  const onChangeMail = (event) => {
    setUserMail(event.target.value)
  }
  const onChangeNumber = (event) => {
    setUserContact(event.target.value)
  }

  const editData = async (record) => {
    setIsEditing(true)
    setDataEditing(record)
    setUserName(record.name)
    setUserMail(record.email)
    setUserContact(record.phone)
    setUserId(record.id)
  }
  const handleOk = async () => {
    try {
      const dt = {
        id : user_id,
      name: user_name,
      email: user_mail,
      phone: user_contact
    }
    // console.log(dt)
    const result = await fetch('http://127.0.0.1:5000/update', {
      'method': 'POST',
      headers: {
      'content-type': 'application/json',
          },
          body: JSON.stringify(dt)
        })
        // console.log(result)
      } catch (error) {
        console.log(error)
      }
setIsEditing(false)
    }



  // console.log(data)
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id} />
      <Modal
        title='Edit Data'
        visible={isediting}
        okText="Save Data"
        onCancel={() => {
          setIsEditing(false)
        }}
        onOk={handleOk} >
        <Input value={user_id} onChange={onChangeId} disabled={true}/>
        <Input value={user_name} onChange={onChangeUsername} />
        <Input value={user_mail} onChange={onChangeMail} />
        <Input value={user_contact} onChange={onChangeNumber} />

      </Modal>
    </div>
  )

}
