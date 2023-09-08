import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Col, Row, Typography, Avatar } from "antd";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import { getManagerDetailState } from "../../../store/managerCompanyAdmin";
import { Notifications } from "../../../components";
import { Success } from "../../../assets/images";
import { currentUserState } from "../../../store";

const ManagerInfo = (props: any) => {
  const { searchItem, filter, tableParams, setTableParams } = props;
  const navigate = useNavigate();
  const action = useCustomHook();
  const managerCardData = useRecoilState<any>(getManagerDetailState);

  useEffect(() => {
    action.getManagerCompanyAdmin(filter,tableParams,setTableParams);
  }, [searchItem,filter]);

  return (
    <div className="manager-info">
      <Row gutter={[30, 20]}>
        {managerCardData[0].map((item: any, index: any) => {
          return (
            <>
              <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                <div
                  className="rounded-[10px] py-3 white-bg-color"
                  style={{ boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)" }}
                >
                  <center>
                    <div>
                      <Avatar
                        size={90}
                        src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}>
                          {item?.companyManager?.firstName.charAt(0)}
                          {item?.companyManager?.lastName.charAt(0)}
                        </Avatar>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Typography className="text-2xl  text-primary-color font-medium pt-3">
                        {item?.companyManager?.firstName || 'N/A'}
                      </Typography>
                      <Typography className="text-2xl  text-primary-color font-medium pt-3">
                        {item?.companyManager?.lastName  || 'N/A'}
                      </Typography>
                    </div>
                    <Typography className="text-sm text-secondary-color font-normal pt-1 pb-3">
                      {item?.title || 'N/A'}
                    </Typography>
                    <div className="border border-[#D9DBE9] border-solid ml-10 mr-10 mb-3 mt-3 rounded-[8px] p-3">
                      <Typography className="text-sm light-grey-color font-normal">
                        Assigned Interns
                      </Typography>
                      <Typography className="text-sm text-secondary-color font-normal">
                        {item?.assignedInterns || 'N/A'}
                      </Typography>
                    </div>
                    <div className="btn-wrapper flex md:flex-row flex-col gap-2 justify-center">
                      <Button
                        onClick={() => {
                          navigate(`/${ROUTES_CONSTANTS.MANAGER_PROFILE}/${item?.id}`)
                        }
                        }
                        style={{ minWidth: "0px" }}
                        className="info-dark-bg-color text-info-color-dark text-base 
                        font-semibold rounded-[8px] border-0 pr-[36px] pt-[9px] pl-[36px] pb-[9px] profile-btn"
                      >
                        Profile
                      </Button>
                      <Button
                        onClick={() => {
                          action.forgotpassword({
                            email: item?.companyManager?.email,
                          });
                          Notifications({
                            icon: <Success />,
                            title: "Success",
                            description:
                              "Account resent link sent successfully",
                            type: "success",
                          });
                          navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
                        }}
                        style={{ minWidth: "0px" }}
                        className="text-green-color reset-bg-color text-base 
                        font-semibold rounded-[8px] border-0 pr-[36px] pt-[9px] pl-[36px] pb-[9px] reset-btn"
                      >
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
