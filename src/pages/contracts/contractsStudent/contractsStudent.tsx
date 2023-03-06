import { Col, Divider, Row } from "antd";
import React from "react";
import { SearchBar } from "../../../components";
import "./contractStudent.scss";


const contractStatus = [
    {
        id:"1",
        color:"#FFC15E",
        status:"Received",
    },
    {
        id:"2",
        color:"#E94E5D",
        status:"Rejected",
    },
    {
        id:"3",
        color:"#4A9D77",
        status:"Signed",
    }
]

const ContractsStudent = () => {
  const handleChange = () => {
    console.log("clicks");
  };

  return (
    <div className="contract-student">
      <Row>
        <Col>
          <div className="contract-student-title">Contracts</div>
        </Col>
        <Divider />

        <Col className="mb-6" xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={handleChange} />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[10, 4]}>
            {
                contractStatus.length && contractStatus.map((item) => {
                    return (
                        <Col key={item.id} xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                        <div className="contract-status">
                          <div className= "status-box"></div>
                          <div className="status-box-text">{item.status}</div>
                        </div>
                      </Col>
                    )
                })
            }
          </Row>
        </Col>
        <Col>
          <div></div>
        </Col>
      </Row>
    </div>
  );
};

export default ContractsStudent;
