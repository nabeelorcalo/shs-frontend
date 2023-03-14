import React, { useState } from 'react'
import { Col, Menu, Row } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { DropDown, SearchBar } from '../../../../components'
import GlobalTable from '../../../../components/Table/Table'
import CustomDroupDown from '../../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown';
import '../../style.scss';

const DelegateMain = () => {
    const [value, setValue] = useState("");

    const searchValue = () => {};
  
    const columns = [
      {
        dataIndex: "no",
        key: "no",
        title: "No.",
      },
      {
        dataIndex: "name",
        key: "name",
        title: "Name",
      },
      {
        dataIndex: "email",
        key: "email",
        title: "Email",
      },
      {
        dataIndex: "agenttype",
        key: "agenttype",
        title: "Agent Type",
      }, 
      {
        dataIndex: "joiningdate",
        key: "joiningdate",
        title: "Joining Date",
      },
      {
        dataIndex: "delegatemember",
        key: "delegatemember",
        title: "Delegate Member",
      },
      {
        dataIndex: "status",
        render: (_: any, data: any) => (
          <div
            className="table-status-style text-center white-color rounded"
            style={{
              backgroundColor:
                  data.status === "Active"
                  ? "#3DC475"
                  : data.status === "Inactive"
                  ? "#D83A52"
                  : "",
              padding: " 2px 3px 2px 3px",
            }}
          >
            {data.status}
          </div>
        ),
        key: "status",
        title: "Status",
      },
     
      {
        render: (_: any, data: any) => (
          <span>
            <CustomDroupDown menu1={menu2} />
          </span>
        ),
        key: "Actions",
        title: "Actions",
      },
  ];
  const menu2 = (
    <Menu>
       {/* <Menu.Item key="1">View Details</Menu.Item> */}
      <Menu.Item key="2"  >Revoke Access</Menu.Item>
      <Menu.Item key="3" ><a href="create-password">Password Reset</a> </Menu.Item>
     
    </Menu>
  );
    const tableData = [
      {
        Actions: (
          <span>
            <EllipsisOutlined />
          </span>
        ),
        joiningdate: "£9,823",
        status: "Active",
       
        email: "anablack@gmail.com",
        agenttype: "Single Room",
            name: "Natwest Group",
            no: "01",
            delegatemember:"25",
      },
      {
        Actions: (
          <span>
            <EllipsisOutlined />
          </span>
        ),
        joiningdate: "£9,823",
  
        status: "Active",
       
        agenttype: "Single Room",
        email: "anablack@gmail.com",
        delegatemember:"25",
        no:"02",
        name: "Natwest Group",
      },
      {
        Actions: (
          <div>
            <EllipsisOutlined />
         
          </div>
        ),
        joiningdate: "£7,823",
  
        status: "Inactive",
       
        agenttype: "Single Room",
        email: "anablack@gmail.com",
        delegatemember:"25",
        no:"03",
        name: "Natwest Group",
      },
    ];
  return (
      <div className='delegate-main'>  
          <Row>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex  justify-center sm:justify-end gap-3 mt-3 md:mt-0">
            <DropDown
              name="Status"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
            <DropDown
              name="Method"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable tableData={tableData} columns={columns} />
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default DelegateMain