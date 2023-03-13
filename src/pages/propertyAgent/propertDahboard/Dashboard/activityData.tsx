import { MoreOutlined, NodeExpandOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { DropDown, SearchBar } from '../../../../components'
import GlobalTable from '../../../../components/Table/Table'

const ActivityData = () => {
    const [value, setValue] = useState('');
    const searchValue = () => {
    
    }
    const columns = [
        {
            dataIndex: 'no',
            key: 'no',
            title: 'No'
          },
        {
          dataIndex: "Activity",
          key: "Activity",
          title: "Activity",
        },
        {
          dataIndex: "Description",
          key: "Description",
          title: "Description",
        },
        {
          dataIndex: "PerformedBy",
          key: "PerformedBy",
          title: "Performed By",
        },
        {
          dataIndex: "JobTitle",
          key: "JobTitle",
          title: "Job Title",
        },
        {
          dataIndex: "datetime",
       
          key: "datetime",
          title: "Date & Time",
        },
     
      ];
      const tableData = [
        {
         
          JobTitle: "Company Admin",
          datetime: "22/09/2022, 11:30 AM",
          company: "kljdasfhuasd",
          Description: "Savannah Nguyen Registered University of London with Internship Ken",
          no: '01',
          PerformedBy: "Wade Warren",
          Activity: "User Added",
        },
        {
        
          JobTitle: "System Admin",
      
          datetime: "22/09/2022, 11:30 AM",
          company: "kljdasfhuasd",
          PerformedBy: "Jerome Bell",
          Description: "Floyd Mile’s password reset by Jerome Bell",
          no: '02',
          Activity: "Password Reset",
        },
        {
         
          JobTitle: "Company Admin",
          datetime: "22/09/2022, 11:30 AM",
          company: "kljdasfhuasd",
          PerformedBy: "Savannah Nguyen",
          Description: "Maria Sanoid added by Wade Warren",
          no: '03',
      
          Activity: "Registered University",
        },
        {
         
          JobTitle: "Manager",
          datetime: "22/09/2022, 11:30 AM",
          company: "kljdasfhuasd",
          PerformedBy: "Cameron Walliamson",
          Description: "Cameron Williamson has evaluated Richard's performance.",
          no: '04',
      
          Activity: "Performance Evaluate",
        },
      ];

  return (
      <div className='activity-data'>
          <Row >
              
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div>
                      <Typography className='main-title'>Activity Log</Typography>
                  </div>
              </Col>

          </Row>
          <Divider />
          <Row className='m-2'>
              <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                  <SearchBar handleChange={searchValue}/>
              </Col>
              <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
                  <div className='flex justify-end items-center'>
                  <Button
              style={{
                background: "#E6F4F9",
                borderRadius: "8px",
                color: "#A0A3BD",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "Outfit",
                margin: "12px",
            
              }}
            >
              <NodeExpandOutlined style={{ fontSize: "16px" }}  />
              Filter
              <RightOutlined style={{ fontSize: "12px" }} />
                  </Button>
                  <div className='w-25'>
                  <DropDown
                    
                    requiredDownloadIcon
                    options={['pdf', 'excel']}
                    value={value}
                    setValue={setValue}
                />
                  </div>
                  </div>
             
                 
              </Col>
          </Row> 
          <Row>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className='activity-data-table'>
                      
                  <GlobalTable tableData={tableData} columns={columns} />
                  </div>
              </Col>
          </Row>
          
          </div>
  )
}

export default ActivityData