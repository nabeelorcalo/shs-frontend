import React from "react";
import { Col, Row, Rate, Divider } from "antd";
import { BoxWrapper } from "../../../../components";
import { Dots, DoucmentCard } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";

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
      <Row gutter={[20, 20]}>
        {DocsMockData.map((data: any) => (
          <Col lg={6}>
            <BoxWrapper
              boxShadow={"box-shadow: 0px 0px 8px 1px rgba(9, 161, 218, 0.1);"}
            >
              <div className="flex justify-between">
                <Rate count={1} />
                <DropDownNew items={items} >
                  <img className="cursor-pointer" src={Dots} alt="" />
                </DropDownNew>
              </div>
              <div className="text-center">
                <img src={DoucmentCard} alt="" />
                <p>{data.title}</p>
                <p>{data.description}</p>
              </div>
              <Divider />
              <div className="flex justify-around">
                <div>
                  Date
                  <p className="text-success-placeholder-color">{data.date}</p>
                </div>
                <Divider className="h-[40px]" type={"vertical"} />
                <div>
                  File Size
                  <p className="text-success-placeholder-color">
                    {" "}
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
