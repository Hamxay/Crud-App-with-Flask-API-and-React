import React from 'react'
import {Table} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


export default function Home() {

  const dataSource = [
    {
      id: '1',
      name: 'Hamza',
      email: 'asd@gmail.com',
      phone: '1234566789',
    },
    {
      id: '2',
      name: 'Ubaid',
      email: 'ubaid@gmail.com',
      phone: '123555559',
    },
    {
      id: '3',
      name: 'Mohsin',
      email: 'mohsin@gmail.com',
      phone: '1100006789',
    },
  ];

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
          <EditOutlined />
          <DeleteOutlined style={{ marginLeft: 15 }} />
        </>
      }
    },
  ];


    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}
