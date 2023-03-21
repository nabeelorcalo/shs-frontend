import React from "react";
import "./style.scss";
import { Col, Divider, Row } from "antd";
import { SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";

const offerLetterRecieved = [
  {
    id: "1",
    img: Recevied,
    title: "Offer Letter",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Recevied,
    title: "Offer Letter",
    subTitle: "From PowerSource",
  },
];

const offerLetterRejected = [
  {
    id: "1",
    img: Rejected,
    title: "Offer Letter",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Rejected,
    title: "Offer Letter",
    subTitle: "From PowerSource",
  },
];

const offerLetterSigned = [
  {
    id: "1",
    img: Signed,
    title: "Offer Letter",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Signed,
    title: "Offer Letter",
    subTitle: "From PowerSource",
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
          <div className="offer-latter-student-title text-2xl font-semibold">
            Offer Letters
          </div>
        </Col>
        <Divider />

        <Col className="mb-6" xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar size="large" handleChange={handleChange} />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {offerLetterRecieved.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <ContractCard
                      img={item.img}
                      title={item.title}
                      description={item.subTitle}
                    />
                  </React.Fragment>
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="offer-letter-status ">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {offerLetterRejected.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <ContractCard
                      img={item.img}
                      title={item.title}
                      description={item.subTitle}
                    />
                  </React.Fragment>
                );
              })}
            </Col>
            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box teriary-bg-color"></div>
                <div className="status-box-text">Signed</div>
              </div>
              {offerLetterSigned.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <ContractCard
                      img={item.img}
                      title={item.title}
                      description={item.subTitle}
                    />
                  </React.Fragment>
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
