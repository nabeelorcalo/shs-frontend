import React, { useEffect, useState } from 'react'
import { Alert, BoxWrapper, DragAndDropUpload } from "../../../../components";
import "../style.scss";
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, studentProfileState } from '../../../../store';
import constants from '../../../../config/constants';
import { Avatar, Button, Divider, Form, Modal, Space, Typography } from 'antd';
import { CloseCircleFilled, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import useCustomHook from '../../actionHandler';
import { IconEmail, IconLocation, IconPhone } from '../../../../assets/images';
import video from "../../../../assets/images/profile/student/Vedio.svg";

const CompanySideBar = (props: any) => {
  const action = useCustomHook();
  const { setShowSideViewType } = props;
  const [files, setFiles] = useState('');
  const { profileImage,
    id,
    firstName,
    lastName,
    email,
    phoneCode,
    phoneNumber,
    country,
    city,
    street,
   company,
    role } = useRecoilValue(currentUserState)

  const [actionBox, setActionBox] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("entityId", id);
    formData.append("entityType", "PROFILE");
    formData.append("media", files);
    action.updateStudentImage(
      formData
    );
    setOpenImage(false);
  };

  return (
    <div className="company-side-bar">
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
              <Avatar size={90}
                src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData.extension}`}
              >
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Avatar>
            <div>
              <Typography className="emp-name">
                {firstName ? firstName:'N/A'} {lastName ? lastName:'N/A'} 
              </Typography>
              <Typography className="emp-desgination">
                {role || 'N/A'}
              </Typography>
              <Typography className="emp-role">
                {company?.businessName === "undefined" ?  "N/A" : company?.businessName } {company?.businessType ? company?.businessType :"N/A"}
              </Typography>
            </div>
          </center>
        </div>
        <Divider />
        <div className="social-info">
          <div className="social-icon flex items-center mt-3">
            <IconEmail />
            <Typography className="emp-social">
              {email ? email :"N/A"}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3">
            <IconPhone />
            <Typography className="emp-social">
              {phoneCode ? phoneCode:'N/A'} {phoneNumber ? phoneNumber:'N/A'}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3 mb-1">
            <IconLocation />
            <Typography className="emp-social">
              {street ? street :"N/A"} {city ? city :"N/A"} {country ? country :"N/A"} 
            </Typography>
          </div>
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
              className="pb-2 pt-2 cursor-pointer"
            >
              <img src={video} alt="" />
              <Typography className="video-p">Add Video</Typography>
            </div>
          </center>
        </div>
        <Divider />
        <p
          className="a-tag-side pb-3 cursor-pointer"
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
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
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
          if (profileImage.id)
            action.deleteUserImage(
              profileImage?.id
            );
        }}
        okBtntxt={"Delete"}
        children={"Are you sure you want to delete this image."}
        type={"error"}
      />
    </div>
  )
}

export default CompanySideBar
