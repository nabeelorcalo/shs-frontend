import React from "react";
import { Row, Col } from "antd";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { SearchBar } from "../../../components";
import { Filter } from "../../../assets/images";

const index = () => {
  return (
    <div className="chat-main">
      <Row gutter={20}>
        <Col xxl={5} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>
            <div>
              <div>
                <span className="text-[#4E4B66] text-2xl font-semibold mr-2">
                  Index
                </span>

                <span className="text-sm text-[#6E7191]">
                  (<span className="mr-1">98</span> message)
                </span>
              </div>

              <div className="flex items-center mt-4">
                <div className="">
                  <SearchBar handleChange={() => {}} />
                </div>
                <div className="flex items-center cursor-pointer justify-center w-[48px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>

              <div>
                
              </div>
            </div>
          </BoxWrapper>
        </Col>
        <Col xxl={14} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>fwefwefwefwefwef</BoxWrapper>
        </Col>
        <Col xxl={5} xl={12} lg={12} md={12} sm={12} xs={24}>
          <BoxWrapper>fwefwefwefwefwef</BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default index;
