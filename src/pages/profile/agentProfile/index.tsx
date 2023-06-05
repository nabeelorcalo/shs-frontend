import { useState } from 'react'
import ProfileSideBar from './profileSideBar'
import { Row, Col } from "antd";
import PersonalDetails from './personalDetails';
import ChangePassword from './ChangePassword';
const AgentProfile = () => {
  const [showSideViewType, setShowSideViewType] = useState(false);
  return (
    <Row>
      <Col xl={6} lg={12} md={12} sm={24} xs={24}>
        <ProfileSideBar showSideViewType={showSideViewType} setShowSideViewType={setShowSideViewType} />
      </Col>
      <Col xl={18} lg={12} md={12} sm={24} xs={24}>
        {showSideViewType ?
          <ChangePassword showSideViewType={showSideViewType} setShowSideViewType={setShowSideViewType} /> :
          <PersonalDetails />
        }
      </Col>
    </Row>
  )
}
export default AgentProfile