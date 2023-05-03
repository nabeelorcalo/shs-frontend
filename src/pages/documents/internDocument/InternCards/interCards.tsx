import React from "react";
import { Col, Row, Rate, Divider } from "antd";
import { BoxWrapper } from "../../../../components";
import { Dots, DoucmentCard1 } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";
import "./Styles.scss";

const InterCards = () => {
  const items = [
    {
      label: "View",
      value: "View",
    },
    {
      label: "Download",
      value: "Download",
    },
  ];
  const DocsMockData = [
    {
      id: "1",
      title: "resume.pdf",
      description: "Davide Miller",
      date: "01/07/2022",
      fileSize: "2.3 MB",
    },
    {
      id: "2",
      title: "resume.pdf",
      description: "Davide Miller",
      date: "01/07/2022",
      fileSize: "2.3 MB",
    },
    {
      id: "3",
      title: "resume.pdf",
      description: "Davide Miller",
      date: "01/07/2022",
      fileSize: "2.3 MB",
    },
    {
      id: "4",
      title: "resume.pdf",
      description: "Davide Miller",
      date: "01/07/2022",
      fileSize: "2.3 MB",
    },
  ];
  return (
    <>
      <Row gutter={[20, 20]} justify="space-between">
        {DocsMockData.map((data: any) => (
          <Col lg={6} md={8} sm={12} xs={24}>
            <BoxWrapper
              boxShadow={"box-shadow: 0px 0px 8px 1px rgba(9, 161, 218, 0.1);"}
            >
              <div className="flex justify-between">
                <Rate count={1} />
                <DropDownNew items={items}>
                  <img className="cursor-pointer" src={Dots} alt="icon" />
                </DropDownNew>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="my-1 docuemnt-card">
                  <img src={DoucmentCard1} alt="" />
                </div>
                <p>{data.title}</p>
                <p>{data.description}</p>
              </div>
              <Divider />
              <div className="flex justify-around">
                <div className="text-sm">
                  <p className="text-primary-color ">
                    Date
                  </p>
                  <p className="text-success-placeholder-color">{data.date}</p>
                </div>
                <Divider className="h-[40px]" type={"vertical"} />
                <div className="text-sm">
                  <p className="text-primary-color ">
                    File Size
                  </p>
                  <p className="text-success-placeholder-color">
                    {data.fileSize}
                  </p>
                </div>
              </div>
            </BoxWrapper>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default InterCards;
