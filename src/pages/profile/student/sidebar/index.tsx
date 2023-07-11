import React, { useEffect, useState } from "react";
import { Button, Divider, Modal, Typography, Form, Space, Avatar } from "antd";
import "../../style.scss";
import {
  PlusOutlined,
  EllipsisOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { profileInfo } from "./studentSideBarMock";
import video from "../../../../assets/images/profile/student/Vedio.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, studentProfileState } from "../../../../store";
import useCustomHook from "../../actionHandler";
import { IconEmail, IconLocation, IconPhone } from "../../../../assets/images";
import { DragAndDropUpload, Alert } from "../../../../components";
import constants from "../../../../config/constants";

const StudentSideBar = (props: any) => {
  const action = useCustomHook();
  const { setShowSideViewType } = props;
  const [files, setFiles] = useState([]);
  const [actionBox, setActionBox] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const studentInformation = useRecoilState<any>(studentProfileState);
  const { firstName, lastName, avatar } = useRecoilValue(currentUserState);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("entityId", "1");
    formData.append("entityType", "PROFILE");
    formData.append("media", files[0]);
    action.updateStudentImage(
      formData,
      studentInformation[0]?.personalInfo?.profileImage?.id
    );
    setOpenImage(false);
  };

  useEffect(() => {
    action.getStudentProfile();
  }, []);

  const  mediaId  = studentInformation[0]?.personalInfo?.profileImage.mediaId
  const  extension  = studentInformation[0]?.personalInfo?.profileImage.metaData.extension
  const profileImg = `${constants.MEDIA_URL}/${mediaId}.${extension}`;

  return (
    <div className="student-side-bar">
      <div className="main-student-side-bar">
        <div className="profile-main-detail">
          <div className="flex justify-end relative">
            <EllipsisOutlined
              className="pt-5 pr-5 cursor-pointer text-3xl"
              onClick={() => {
                setActionBox(true);
              }}
            />
            {actionBox && (
              <div className="upload-box">
                <p
                  className="pt-2 pb-2 cursor-pointer text-base font-normal text-secondary-color"
                  onClick={() => {
                    setActionBox(false);
                    setOpenImage(true);
                  }}
                >
                  Upload Image
                </p>
                <p
                  className="pb-2 cursor-pointer text-base font-normal text-secondary-color"
                  onClick={() => {
                    setActionBox(false);
                    setOpenDelete(true);
                  }}
                >
                  Delete Image
                </p>
              </div>
            )}
          </div>
          <center>
            {studentInformation[0]?.personalInfo?.profileImage?.mediaId ? (
              <img
                src={profileImg}
                alt="User Image"
                width={100}
                className="rounded-[50%]"
              />
            ) : (
              <Avatar size={48} src={avatar}>
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Avatar>
            )}

            <div>
              <Typography className="emp-name">
                {studentInformation[0]?.personalInfo?.firstName}{" "}
                {studentInformation[0]?.personalInfo?.lastName}
              </Typography>
              <Typography className="emp-desgination">
                {
                  studentInformation[0]?.general?.userUniversity?.university
                    ?.name
                }
              </Typography>
              <Typography className="emp-role">
                {studentInformation[0]?.personalInfo?.role}
              </Typography>
            </div>
          </center>
        </div>
        <Divider />
        {/* email info */}
        <div className="social-info">
          <div className="social-icon flex items-center mt-3">
            <IconEmail />
            <Typography className="emp-social">
              {studentInformation[0]?.personalInfo?.email}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3">
            <IconPhone />
            <Typography className="emp-social">
              {studentInformation[0]?.personalInfo?.phoneCode}{" "}
              {studentInformation[0]?.personalInfo?.phoneNumber}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3 mb-1">
            <IconLocation />
            <Typography className="emp-social">
              {studentInformation[0]?.personalInfo?.street}{" "}
              {studentInformation[0]?.personalInfo?.city}
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
          {studentInformation[0]?.personalInfo?.skills.map(
            (item: any, index: any) => {
              return (
                <>
                  <div className="skill-box">
                    <Typography className="skills-typography pl-2 pr-2">
                      {item}
                    </Typography>
                  </div>
                </>
              );
            }
          )}
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
                setShowSideViewType("add-video");
              }}
              className="pb-2 pt-2"
            >
              <img src={video} alt="" />
              <Typography className="video-p">Add Video</Typography>
            </div>
          </center>
        </div>
        <Divider />
        <p
          className="a-tag-side pb-3"
          onClick={() => {
            setShowSideViewType("change-password");
          }}
        >
          Change Password
        </p>
      </div>
      <Modal
        open={openImage}
        centered
        footer={null}
        closeIcon={
          <CloseCircleFilled
            className="text-success-placeholder-color text-xl"
            onClick={() => setOpenImage(false)}
          />
        }
        title="Upload Image"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="profileUploader">
            <DragAndDropUpload files={files} setFiles={setFiles} />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button
                htmlType="submit"
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 py-0 px-5"
              >
                Upload
              </Button>
              <Button
                className="border-1 border-[#4A9D77] teriary-color font-semibold"
                onClick={() => setOpenImage(false)}
              >
                Cancel
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
      <Alert
        state={openDelete}
        setState={setOpenDelete}
        cancelBtntxt={"Cancel"}
        okBtnFunc={() => {
          if (studentInformation[0]?.personalInfo?.profileImage.id)
            action.deleteUserImage(
              studentInformation[0]?.personalInfo?.profileImage?.id
            );
        }}
        okBtntxt={"Delete"}
        children={"Are you sure you want to delete this image."}
        type={"error"}
      />
    </div>
  );
};

export default StudentSideBar;
