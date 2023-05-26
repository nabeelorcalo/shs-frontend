import React, { useState } from "react";
import { Divider, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { profileInfo } from "./studentSideBarMock";
import { UniLogo } from "../../../../assets/images";
import profile from "../../../../assets/images/profile/student/profiled.svg";
import "../../style.scss";

const StudentSideBar = (props: any) => {
  const { setShowSideViewType } = props;
  const [hide, setHide] = useState(false);

  return (
    <div className="student-side-bar h-[97vh]">
      <div className="main-student-side-bar">
        {profileInfo.map((item, index) => {
          return (
            <>
              <div className="profile-main-detail">
                <div className="flex justify-end relative">
                  <EllipsisOutlined
                    className="pt-5 pr-5 text-xl cursor-pointer"
                    onClick={() => {
                      setHide(true);
                    }}
                  />
                  {hide && (
                    <div className="absolute top-9 right-9 poper">
                      <p
                        className="option-style"
                        onClick={() => {
                          setHide(false);
                        }}
                      >
                        Upload Photo
                      </p>
                      <p
                        className="option-style"
                        onClick={() => {
                          setHide(false);
                        }}
                      >
                        Delete Photo
                      </p>
                    </div>
                  )}
                </div>
                <center>
                  <UniLogo />
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

                <img src={profile} alt="" width={40} />

                <Typography className="ml-2">Marie Gold</Typography>
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
