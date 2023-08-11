import { useState } from 'react'
import ProfileSideBar from './profileSideBar'
import { Row, Col } from "antd";
import PersonalDetails from './personalDetails';
import ChangePassword from './ChangePassword';
import { BoxWrapper } from '../../../components';
const AgentProfile = () => {
  const [showSideViewType, setShowSideViewType] = useState(false);
  return (
    <Row gutter={[20, 20]}>
      <Col xl={6} lg={8} xs={24}>
        <ProfileSideBar showSideViewType={showSideViewType} setShowSideViewType={setShowSideViewType} />
      </Col>
      <Col xl={18} lg={16} xs={24}>
        {showSideViewType ?
          <ChangePassword showSideViewType={showSideViewType} setShowSideViewType={setShowSideViewType} /> :
          <PersonalDetails />
        }
      </Col>
    </Row>
  )
}
export default AgentProfile