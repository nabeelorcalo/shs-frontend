import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Modal, Typography, Form, Space, Avatar, Input, Popover, Tag, InputRef } from "antd";
import "../../style.scss";
import {
  PlusOutlined,
  EllipsisOutlined,
  CloseCircleFilled,
  CloseCircleOutlined
} from "@ant-design/icons";
import { profileInfo } from "./studentSideBarMock";
import video from "../../../../assets/images/profile/student/Vedio.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, studentProfileState } from "../../../../store";
import useCustomHook from "../../actionHandler";
import { IconEmail, IconLocation, IconPhone } from "../../../../assets/images";
import { DragAndDropUpload, Alert } from "../../../../components";
import constants from "../../../../config/constants";
import { filteredText } from "../../../../helpers";

const StudentSideBar = (props: any) => {
  const action = useCustomHook();
  const { setShowSideViewType } = props;
  const [files, setFiles] = useState('');
  const [actionBox, setActionBox] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const studentInformation = useRecoilValue<any>(studentProfileState);
  const { id } = useRecoilValue(currentUserState);
  const {
    general: { userUniversity = {} } = {},
    personalInfo = {},
    general: { course }
  } = studentInformation || {};
  const { firstName, lastName, email, phoneCode,
    phoneNumber, city,
    country, skills, street,
    profileImage = {}, } = personalInfo;
    
  console.log(course)
  const { university = {} } = userUniversity ?? {};
  const { name = "" } = university;
  const { mediaId = '', metaData = {} } = profileImage ?? {}
  const { extension = "" } = metaData ?? {}

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("entityId", id);
    formData.append("entityType", "PROFILE");
    formData.append("media", files);
    action.updateStudentImage(
      formData
    );
    () => action.getStudentProfile()
    setOpenImage(false);
  };

  // popover image upload
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  // popover image upload end

  // skills
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [skillTags, setSkillTags] = useState(skills || []);

  const showInputSkills = () => {
    setInputVisible(true)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && skillTags.indexOf(inputValue) === -1) {
      setSkillTags([...skillTags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  // end skills

  return (
    <div className="student-side-bar">
      <div className="main-student-side-bar py-5">
        <div className="image-popover absolute top-4 right-6">
          <Popover
            content={
              <>
                <p
                  className="pt-2 pb-2 mx-2  cursor-pointer text-base font-normal text-secondary-color"
                  onClick={() => {
                    setActionBox(false);
                    setOpenImage(true);
                  }}
                >
                  Upload Image
                </p>
                <p
                  className="pb-2 mx-2 cursor-pointer text-base font-normal text-secondary-color"
                  onClick={() => {
                    setActionBox(false);
                    setOpenDelete(true);
                  }}
                >
                  Delete Image
                </p>
              </>
            }
            placement="bottomRight"
            trigger="click"
            arrow={false}
            open={open}
            onOpenChange={handleOpenChange}
          >
            <EllipsisOutlined className="cursor-pointer text-3xl text-gray-500 " />
          </Popover>
        </div>
        <div className="avatar-info flex flex-col items-center">
          <Avatar
            size={80}
            src={`${constants.MEDIA_URL}/${mediaId}.${extension}`}
          >
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </Avatar>
          <div className="flex flex-col items-center mt-3">
            <Typography className="emp-name">
              {`${filteredText(firstName)} ${filteredText(lastName)}`}
            </Typography>
            <Typography className="emp-desgination">{filteredText(name)}</Typography>
            <Typography className="emp-role">{filteredText(course)}</Typography>
          </div>
        </div>
        <Divider />
        {/* email info */}
        <div className="social-info">
          <div className="social-icon flex items-center mt-3">
            <IconEmail />
            <Typography className="emp-social">{filteredText(email)}</Typography>
          </div>
          <div className="social-icon flex items-center mt-3">
            <IconPhone />
            <Typography className="emp-social">
              {phoneCode || '0'} {phoneNumber || '0'}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3 mb-1">
            <IconLocation />
            <Typography className="emp-social">
              {`${filteredText(street)}, ${filteredText(city)}, ${filteredText(country)}`}
            </Typography>
          </div>
        </div>
        <Divider />
        {/* skills */}
        <div className="ml-5 mb-3">
          <Typography className="emp-name">Skills</Typography>
        </div>
        <div className="skill-list px-4">
          <Space size={[0, 8]} wrap>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                autoFocus
                placeholder="New Skill"
                className="w-32 bg-[#e6f4f9]"
                // style={{ backgroundColor: "#e6f4f9"}}
              />
            ) : (
              <Tag onClick={showInputSkills} color="#e6f4f9" className="py-1 px-4 rounded-3xl">
                <span className="text-gray-400">
                  <PlusOutlined className="mr-1" /> Add
                </span>
              </Tag>
            )}
          {skillTags?.map((item: any) =>
            <Tag color="#e6f4f9" className="py-1 px-4 rounded-3xl">
              <span className="text-black">
                {item}
              </span>
            </Tag>
          )}
          </Space>
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
