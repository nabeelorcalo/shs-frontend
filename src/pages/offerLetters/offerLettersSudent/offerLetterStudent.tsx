import { Col, Divider, Row } from "antd";
import React from "react";
import { SearchBar } from "../../../components";
import "./offerLettersStudent.scss";
import Signed from "../../../assets/images/ColorfullIconsProgressbar/Signed.png";
import Recieved from "../../../assets/images/ColorfullIconsProgressbar/recieved.png";
import Rejected from "../../../assets/images/ColorfullIconsProgressbar/rejected.png";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";

const offerLetterRecieved = [
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

const offerLetterRejected = [
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

const offerLetterSigned = [
  {
    id: "1",
    img: Signed,
    title: "Contract",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Signed,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const offerLetterStatus = [
  {
    id: "1",
    color: "#FFC15E",
    status: "Received",
  },
  {
    id: "2",
    color: "#E94E5D",
    status: "Rejected",
  },
  {
    id: "3",
    color: "#4A9D77",
    status: "Signed",
  },
];

const OfferLetterStudent = () => {
  const handleChange = () => {
    console.log("click");
  };

  return (
    <div className="offer-latter-student">
      <Row gutter={[0, 12]}>
        <Col>
          <div className="offer-latter-student-title">Offer Letters</div>
        </Col>
        <Divider />

        <Col className="mb-6" xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar size="large" handleChange={handleChange} />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={10}>
            {offerLetterStatus.map((item) => {
              return (
                <Col key={item.id} xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                  <div className="offer-letter-status">
                    <div
                      style={{ backgroundColor: item.color }}
                      className="status-box"
                    ></div>
                    <div className="status-box-text">{item.status}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={10}>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              {offerLetterRecieved.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              {offerLetterRejected.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
              {offerLetterSigned.map((item) => {
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

export default OfferLetterStudent;
