import React from 'react'
import { Col, Divider, Row, Typography } from 'antd'
import AppTabs from '../../../components/Tabs'
import ListingRequest from '../listingRequest'
import PropertyAgentTable from '../propertAgentTable'
import MainDashboard from './Dashboard'
import '../style.scss';


const items = [
    {
        key: '1',
        label: "Dashboard",
        children:<MainDashboard/>,
    },
    {
        key: '2',
        label: "Listings Request",
        children:<ListingRequest/>,
    },
    {
        key: '3',
        label: "Property Agents",
        children:<PropertyAgentTable/>,
    },
]

const PropertyDashboard = () => {
  return (
      <>
          <Row>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Typography className="text-2xl font-semibold font-[Outfit] primary-color">Property Agent</Typography>
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