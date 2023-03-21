import React from "react";
import "./style.scss";
import { PageHeader } from "../../../components";
import { Button, Row, Col, Card } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Offerimg1, Offerimg3 } from "../../../assets/images";

const offersCardData = [
  {
    id: "1",
    img: Offerimg1,
    title: "Boston heights",
    disc: "15% off-between 1 and 6 months bookings",
  },
  {
    id: "2",
    img: Offerimg1,
    title: "Gregory Maxwell Hall",
    disc: "15% off-between 1 and 6 months bookings",
  },
  {
    id: "3",
    img: Offerimg1,
    title: "8th Sapphire Avenue",
    disc: "15% off-between 1 and 6 months bookings",
  },
];

const OffersAgent = () => {
  return (
    <div className="offers-agent">
      <PageHeader title="Offers" bordered={true} />

      {/* <div className="offers-agent-body flex justify-center items-center flex-col h-[50vh] text-center">
        <div className="font-medium text-4xl text-[#14142A] mb-4">
          No Offers Yet
        </div>
        <div className="font-normal text-base text-[#14142A] mb-8">
          Create your first offer and draw attention to your properties!
        </div>

        <div className="">
          <Button className="add-offers-btn flex items-center">
            <PlusCircleFilled
              width={22}
              height={22}
              style={{
                color: "white",
                background: "#4a9d77",
                borderRadius: "80%",
              }}
            />

            <span className="text-[white]">Add New Offer</span>
          </Button>
        </div>
      </div> */}

      <div className="offers-main">
        <div className="flex justify-end mb-4">
          <Button className="add-offers-btn flex items-center">
            <PlusCircleFilled
              width={22}
              height={22}
              style={{
                color: "white",
                background: "#4a9d77",
                borderRadius: "80%",
              }}
            />

            <span className="text-[white]">Add New Offer</span>
          </Button>
        </div>

        <Row gutter={[20, 20]}>
          {offersCardData.map((item) => {
            return (
              <Col xxl={4} xl={6} lg={8} md={12} sm={24} xs={24}>
                <Card
                  key={item.id}
                  className="offer-card"
                  cover={<img alt="img" src={item.img} height={195} />}
                >
                  <div className="offer-card-body">
                    <div className="text-[#363565] font-semibold text-xl pb-4">
                      {item.title}
                    </div>
                    <div className="text-[#363565] font-normal text-sm pb-4">
                      {item.disc}
                    </div>

                    <div className="w-[100%] inline-grid">
                      <Button className="offer-card-btn">Edit</Button>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default OffersAgent;
