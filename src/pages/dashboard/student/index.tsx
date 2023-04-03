import { useState } from "react";
import { Row, Col } from 'antd';
import { PageHeader } from "../../../components";
import ProfileCompletion from "./profileCompletion";
import MainDataSide from "./mainDataSide";
import "../style.scss";
import VerificationForm from "./VerificationFomr";

const Student = () => {
  const [hide, setHide] = useState(true);
  return (
    <div className="student-dashboard-main">
      <PageHeader title="Welcome, Maria Sanoid!" />
      <Row gutter={[20,20]}>
        <Col xxl={6} xl={6} lg={8} md={10} sm={10} xs={24}>
          <ProfileCompletion
            hide={hide}
            setHide={setHide}
          />
        </Col>
        <Col xxl={18} xl={18} lg={14} md={14} sm={14} xs={24}>
         {!hide === true ? ( <VerificationForm/>):(<MainDataSide />)}

        </Col>
      </Row>
    </div>
  )
}

export default Student