import React from 'react'
import { Col, Row } from 'antd'
import StudentProfileSideBar from '../sidebar/studentProfileSideBar/StudentProfileSideBar'
import UniversityProfileTab from './universityProfileTab'

const ProfileTabsMain = () => {
  return (
    <Row>
      <Col xxl={6} xl={10} lg={24} md={24} sm={24} xs={24} >
        <StudentProfileSideBar />
      </Col>
      <Col xxl={18} xl={14} lg={24} md={24} sm={24} xs={24}>
        <UniversityProfileTab />
      </Col>
    </Row>

  )
}

export default ProfileTabsMain