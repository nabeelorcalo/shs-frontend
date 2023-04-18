import { Button, Col, Row, Space, Typography } from "antd";
import { managerCar } from "./managerMock";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const ManagerInfo = () => {
  return (
    <div className="manager-info">
      <Row gutter={[30, 20]}>
        {managerCar.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className="rounded-[10px] p-1  white-bg-color shadow-[0px 0px 8px 2px rgba(9, 161, 218, 0.1)] 
                border-1 border-solid border-[#E6F4F9]">
                  <center>
                    <img src={item.img} alt="user-img" className="pt-3"/>
                    <Typography className="text-2xl  text-primary-color font-medium pt-3">
                      {item.managerName}
                    </Typography>
                    <Typography className="text-sm text-secondary-color font-normal pt-1 pb-3">
                      {item.desgination}
                    </Typography>
                    <div className="border border-[#D9DBE9] border-solid ml-10 mr-10 mb-3 mt-3 rounded-[8px] p-3">
                      <Typography className="text-sm light-grey-color font-normal">
                        Assigned Interns
                      </Typography>
                      <Typography className="text-sm text-secondary-color font-normal">
                        {item.interns}
                      </Typography>
                    </div>
                    {/* <Space className="pb-3 pr-4 pl-3 pt-3"> */}
                    <div className="btn-wrapper flex md:flex-row flex-col gap-2 justify-center ">
                    <Button className="info-dark-bg-color text-info-color-dark text-base 
                      font-semibold rounded-[8px] border-0 ">
                        <a href={`${ROUTES_CONSTANTS.MANAGER_PROFILE}`}>Profile</a>
                      </Button>
                      <Button className="text-green-color reset-bg-color text-base 
                      ont-semibold rounded-[8px] border-0 ">
                        Reset
                      </Button>
                    </div>
                      
                    {/* </Space> */}
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
