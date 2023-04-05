import React from "react";
import { Button, Divider, Typography } from "antd";
import "../../style.scss";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { profileInfo } from "./studentSideBarMock";
import video from "../../../../assets/images/profile/student/Vedio.svg";

const StudentSideBar = (props: any) => {
  const { setShowSideViewType } = props;

  return (
    <div className="student-side-bar">
      <div className="main-student-side-bar">
        {profileInfo.map((item, index) => {
          return (
            <>
              <div className="profile-main-detail">
                <div className="flex justify-end">
                  <MoreOutlined className="pt-5 pr-5" />
                </div>
                <center>
                  <img src={item.profile} alt="" />
                  <div>
                    <Typography className="emp-name">{item.name}</Typography>
                    <Typography className="emp-desgination">
                      {item.designation}
                    </Typography>
                  </div>
                </center>
              </div>
              <Divider />
              <div className="social-info">
                <div className="social-icon flex items-center mt-3">
                  <img src={item.iconEmail} alt="" />
                  <Typography className="emp-social">{item.email}</Typography>
                </div>
                <div className="social-icon flex items-center mt-3">
                  <img src={item.iconPhone} alt="" />
                  <Typography className="emp-social">{item.phone}</Typography>
                </div>
                <div className="social-icon flex items-center mt-3 mb-1">
                  <img src={item.iconLocation} alt="" />
                  <Typography className="emp-social">
                    {item.location}
                  </Typography>
                </div>
              </div>
              <Divider />

              <div className="flex justify-center items-center">
                <Typography className="mr-2">Conatact Person:</Typography>

                <img height={50} src={item.profile} alt="" />

                <Typography className="">Marie Gold</Typography>
              </div>

              <Divider />
              <p
                onClick={() => {
                  setShowSideViewType("change-password");
                }}
                className="a-tag-side"
              >
                Change Password
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default StudentSideBar;
