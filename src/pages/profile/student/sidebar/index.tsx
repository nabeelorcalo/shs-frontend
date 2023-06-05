import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "antd";
import '../../style.scss';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { profileInfo } from "./studentSideBarMock";
import video from "../../../../assets/images/profile/student/Vedio.svg";
import { useRecoilState } from "recoil";
import { studentProfileState } from "../../../../store";
import useCustomHook from "../../actionHandler";
import { IconEmail, IconLocation, IconPhone } from "../../../../assets/images";

const StudentSideBar = (props: any) => {
  const action = useCustomHook();
  const { setShowSideViewType } = props;
  const [actionBox, setActionBox] = useState(false);
  const studentInformation = useRecoilState<any>(studentProfileState);

  console.log(studentInformation,'personalInformation')

  useEffect(() => {
    action.getStudentProfile(studentInformation[0]?.user?.id);
  },[])

  return (
    <div className="student-side-bar">
      <div className="main-student-side-bar">
              <div className="profile-main-detail">
                <div className="flex justify-end relative">
                  <EllipsisOutlined className="pt-5 pr-5 cursor-pointer text-3xl"
                    onClick={() => {
                      setActionBox(true);
                    }}
                  />
                  {actionBox && (
                    <div className="upload-box">
                      <p className="pt-2 pb-2 cursor-pointer text-base font-normal text-secondary-color"
                        onClick={() => {
                          setActionBox(false);
                        }}>
                        Upload Image
                      </p>
                      <p className="pb-2 cursor-pointer text-base font-normal text-secondary-color"
                        onClick={() => {
                          setActionBox(false);
                        }}>
                        Delete Image
                      </p>
                    </div>
                  )}
                </div>
                <center>
                  <img src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} alt="" width={100} />
                  <div>
                    <Typography className="emp-name">{studentInformation[0]?.user?.firstName} {studentInformation[0]?.user?.lastName}</Typography>
                    <Typography className="emp-desgination">
                      {studentInformation[0]?.general?.userUniversity}
                    </Typography>
                    <Typography className="emp-role">{studentInformation[0]?.user?.role}</Typography>
                  </div>
                </center>
              </div>
              <Divider />
              {/* email info */}
              <div className="social-info">
                <div className="social-icon flex items-center mt-3">
                  <IconEmail/>
                  <Typography className="emp-social">{studentInformation[0]?.user?.email}</Typography>
                </div>
                <div className="social-icon flex items-center mt-3">
                  <IconPhone/>
                <Typography className="emp-social">{studentInformation[0]?.user?.phoneCode} {studentInformation[0]?.user?.phoneNumber}</Typography>
                </div>
                <div className="social-icon flex items-center mt-3 mb-1">
                  <IconLocation/>
                  <Typography className="emp-social">
                    {studentInformation[0]?.user?.address}
                  </Typography>
                </div>
              </div>
              <Divider />
              {/* skills */}
              <div className="ml-5 mb-3">
                <Typography className="emp-name">Skills</Typography>
              </div>
              <div className="main-skill-box">
                <Button
                  style={{ minWidth: "0px" }}
                  className="text-input-bg-color rounded-[14.5px] 
                  flex items-center justify-center border-0"
                >
                  <PlusOutlined /> Add
                </Button>
                {studentInformation[0]?.personal?.skills.map((item:any, index:any) => {
                  return (
                    <>
                      <div className="skill-box">
                        <Typography className="skills-typography pl-2 pr-2">
                          {item}
                        </Typography>
                      </div>
                    </>
                  );
                })}
              </div>
              <Divider />
              <div className="intro">
                <div className="ml-5 mb-3">
                  <Typography className="emp-name">Intro</Typography>
                  <Typography className="emp-desgination pt-1 pb-1">
                    Create your video interview to get hired
                  </Typography>
                </div>
                <center>
                  <div
                    onClick={() => {
                      setShowSideViewType('add-video');
                    }}
                    className="pb-2 pt-2"
                  >
                    <img src={video} alt="" />
                    <Typography className="video-p">Add Video</Typography>
                  </div>
                </center>
              </div>
              <Divider />
              <p className="a-tag-side pb-3"
                onClick={() => {
                  setShowSideViewType('change-password')
                }}
              >
                Change Password
              </p>
      </div>
    </div>
  );
};

export default StudentSideBar;
