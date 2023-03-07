import { Col, Divider, Row, Typography } from 'antd'
import React from 'react'
import AppTabs from '../../../components/Tabs'
import MainDashboard from './Dashboard'


const items = [
    {
        key: '1',
        label: "Dashboard",
        children:<MainDashboard/>,
    },
    {
        key: '2',
        label: "Listings Request",
        children:"rrr",
    },
    {
        key: '3',
        label: "Property Agents",
        children:"xxx",
    },
]



const PropertyDashboard = () => {
  return (
      <>
          <Row>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography>Property Agent</Typography>
              </Col>
              <Divider/>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <AppTabs items={items} />
              </Col>
          </Row>
   
      
      </>
  )
}

export default PropertyDashboard