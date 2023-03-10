import { Col, Divider, Row } from "antd";
import React from "react";
import { SearchBar } from "../../../components";
import "./contractStudent.scss";
import Signed from "../../../assets/images/ColorfullIconsProgressbar/Signed.png";
import Recieved from "../../../assets/images/ColorfullIconsProgressbar/recieved.png";
import Rejected from "../../../assets/images/ColorfullIconsProgressbar/rejected.png";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";

const contractReceived = [
  {
    id: "1",
    img: Recieved,
    title: "Contract",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Recieved,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const contractReject = [
  {
    id: "1",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const contractSigned = [
  {
    id: "1",
    img: Signed,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];


const ContractsStudent = () => {
  const handleChange = () => {
    console.log("clicks");
  };

  return (
    <div className="contract-student">
      <Row gutter={[10, 10]}>
        <Col>
          <div className="contract-student-title">Contracts</div>
        </Col>
        <Divider />

        <Col className="mb-6" xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <SearchBar size="large" handleChange={handleChange} />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="contract-status">
                <div
                  style={{ backgroundColor: "#FFC15E" }}
                  className="status-box"
                ></div>
                <div className="status-box-text">Received</div>
              </div>
              {contractReceived.map((item) => {
                return (
                  <div>
                    <ContractCard
                      img={item.img}
                      title={item.title}
                      description={item.subTitle}
                    />
                  </div>
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="contract-status">
                <div
                  style={{ backgroundColor: "#E94E5D" }}
                  className="status-box"
                ></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {contractReject.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="contract-status">
                <div
                  style={{ backgroundColor: "#4A9D77" }}
                  className="status-box"
                ></div>
                <div className="status-box-text">Signed</div>
              </div>
              {contractSigned.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContractsStudent;
