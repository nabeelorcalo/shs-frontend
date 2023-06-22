import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CompanyProfileSideBar from './companyProfileSideBar'
import CompanyTabs from './companyTabs'

const CompanyProfile = () => {
  const { state } = useLocation()
  //selected user profile id 
  // const profileId = search?.replace("?", "")
  return (
    <Row>
      <Col lg={5}>
        <CompanyProfileSideBar data={state} />
      </Col>
      <Col lg={19}>
        <CompanyTabs />
      </Col>
    </Row>
  )
}
export default CompanyProfile