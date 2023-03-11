import { Menu, Space } from 'antd';
import React from 'react'
import GlobalTable from '../../../../components/Table/Table';
import CustomDroupDown from '../../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown';


const tableData = [
  {
    key: "01",
    ID:"01",
    Subject: "Subject",
    ReportedBy:"john",
   Role:"issue Name",
    Type: "kljdasfhuasd",
    Priority:"high",
    Date:"22/09/2013",
    Assigned:"amila clark",
    Status:"Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID:"02",
    Subject: "file2",
    ReportedBy:"john",
    Role:"issue Name",
    Type: "kljdasfhuasd",
    Priority:"high",
    Date:"22/09/2013",
    Assigned:"amila clark",
    Status:"Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID:"03",
    Subject: "file3",
    ReportedBy:"john",
    Type: "kljdasfhuasd",
    Role:"issue Name",
    Priority:"high",
    Date:"22/09/2013",
    Assigned:"amila clark",
    Status:"Resolved",
    Actions: "fduhguisd",
  },
];

const UnassignedData = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      minWidth: 300,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
      minWidth: 300,
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Reported By",
      dataIndex: "ReportedBy",
      key: "Reported By",
    },
    {
        title: "Role",
        dataIndex: "Role",
        key: "Role",
      },
      {
        title: "Priority",
        dataIndex: "Priority",
        key: "Priority",
      },
      {
        title: "Date",
        dataIndex: "Date",
        key: "Date",
      },
      {
        title: "Assigned",
        dataIndex: "Assigned",
        key: "Assigned",
      },
      {
        title: "Status",
        dataIndex: "Status",
        key: "Status",
      },
    {
      title: "Action",
      key: "Action",
      render: (_: any, data: any) => (
        <Space size="middle">
          <CustomDroupDown menu1={menu2} />
        </Space>
      ),
    },
  ];

  const menu2 = (
    <Menu>
     <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Add Flag</Menu.Item>
         <Menu.Item key="3">Unassign</Menu.Item>
         <Menu.Item key="4">History</Menu.Item>
    </Menu>
  );

  return (
    <div>
       <GlobalTable 
            columns={columns}
            tableData={tableData}/>
    </div>
  )
}

export default UnassignedData