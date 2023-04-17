import { useState } from "react";
import { Row, Col } from 'antd';
import { PageHeader } from "../../../components";
import ProfileCompletion from "./profileCompletion";
import MainDataSide from "./mainDataSide";
import VerificationForm from "./VerificationFomr";
import "../style.scss";

const logedInUser = 'Maria Sanoid!';

const Student = () => {
  const [hide, setHide] = useState(true);
  return (
    <div className="student-dashboard-main">
      <PageHeader title={<span>Welcome, <span style={{color:"#E94E5D"}}>{logedInUser}</span></span>} />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <ProfileCompletion
            hide={hide}
            setHide={setHide}
          />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
         {!hide === true ? ( <VerificationForm/>):(<MainDataSide />)}
        </Col>
      </Row>
    </div>
  )
}

export default Student