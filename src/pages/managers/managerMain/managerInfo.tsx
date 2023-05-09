import { Button, Col, Row, Typography } from "antd";
import { managerCar } from "./managerMock";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";

const ManagerInfo = () => {
  const navigate = useNavigate();
  const getCuurentManager = useCustomHook();
  const managerCard = getCuurentManager.getCuurentManager;
  console.log("?>?>?>?>?>", managerCard)

  return (
    <div className="manager-info">
      <Row gutter={[30, 20]}>
        {managerCar.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className="rounded-[10px] py-3  white-bg-color" style={{ boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)" }}>
                  <center>
                    <img src={item.img} alt="user-img" />
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
                    <div className="btn-wrapper flex md:flex-row flex-col gap-2 justify-center">
                      <Button
                        onClick={() => { navigate(`/${ROUTES_CONSTANTS.MANAGER_PROFILE}`) }}
                        style={{ minWidth: "0px" }}
                        className="info-dark-bg-color text-info-color-dark text-base 
                        font-semibold rounded-[8px] border-0 pr-[36px] pt-[9px] pl-[36px] pb-[9px]">
                        Profile
                      </Button>
                      <Button
                        onClick={() => { navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`) }}
                        style={{ minWidth: "0px" }}
                        className="text-green-color reset-bg-color text-base 
                        font-semibold rounded-[8px] border-0 pr-[36px] pt-[9px] pl-[36px] pb-[9px]">
                        Reset
                      </Button>
                    </div>
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
