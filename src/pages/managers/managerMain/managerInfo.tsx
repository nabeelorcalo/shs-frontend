import { Button, Col, Row, Space, Typography } from "antd";
import React from "react";
import { managerCar } from "./managerMock";

const ManagerInfo = () => {
  return (
    <div className="manager-info">
      <Row gutter={[10, 20]}>
        {managerCar.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={6} lg={8} md={12} sm={24} xs={24}>
                <div className="rounded-[10px] p-3 white-bg-color shadow-[0px 0px 8px 2px rgba(9, 161, 218, 0.1)] border-1 border-solid border-[#E6F4F9]">
                  <center>
                    <img src={item.img} alt="" />
                    <Typography className="text-2xl  text-primary-color font-medium">
                      {item.managerName}
                    </Typography>
                    <Typography className="text-sm text-secondary-color font-normal">
                      {item.desgination}
                    </Typography>
                    <div className="border border-solid m-5 rounded-[8px]">
                      <Typography className="text-sm light-grey-color font-normal">
                        Assigned Interns
                      </Typography>
                      <Typography className="text-sm text-secondary-color font-normal">
                        {item.interns}
                      </Typography>
                    </div>
                    <Space>
                      <Button className="info-dark-bg-color  text-info-color-dark text-base font-semibold rounded-[8px]">
                        <a href="managerprofile">Profile</a>
                        
                      </Button>
                      <Button className="text-green-color reset-bg-color text-base font-semibold rounded-[8px]">
                        Reset
                      </Button>
                    </Space>
                  </center>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
   
    </div>
  );
};

export default ManagerInfo;
