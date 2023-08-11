import { useState } from "react";
import { Avatar, Button, Divider, Form, Modal, Space, Typography } from "antd";
import { CloseCircleFilled, EllipsisOutlined } from "@ant-design/icons";
import { IconEmail, IconLocation, IconPhone, UniLogo } from "../../../../assets/images";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../../store";
import useCustomHook from "../../actionHandler";
import constants from "../../../../config/constants";
import "../../style.scss";
import { DragAndDropUpload,Alert } from "../../../../components";

const StudentSideBar = (props: any) => {
  const { setShowSideViewType } = props;
  const action = useCustomHook();
  const [hide, setHide] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [files, setFiles] = useState("");
  const { userUniversity, id } = useRecoilValue(currentUserState);

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("entityId", userUniversity?.university.id);
    formData.append("entityType", "UNIVERSITY_LOGO");
    formData.append("media", files);
    action.updateStudentImage(formData);
    () => action.getStudentProfile();
    setOpenImage(false);
  };

  const data: any = localStorage.getItem("recoil-persist");
  const parsedData = JSON.parse(data);
  const profileImage = parsedData?.currentUserState?.profileImage?.mediaId;
  const profileType = parsedData?.currentUserState?.profileImage?.metaData?.extension;

  return (
    <div className="student-side-bar h-[97vh]">
      <div className="main-student-side-bar">
        <div className="profile-main-detail">
          <div className="flex justify-end relative">
            <EllipsisOutlined
              className="pt-5 pr-3 text-xl cursor-pointer"
              onClick={() => {
                setHide(true);
              }}
            />
            {hide && (
              <div className="pt-2 pb-1 cursor-pointer text-secondary-color upload-box">
                <p
                  className=" upload-text"
                  onClick={() => {
                    setHide(false);
                    setOpenImage(true);
                  }}
                >
                  Upload Photo
                </p>
                <p
                  className="pt-2 pb-1 cursor-pointer text-secondary-color  upload-text"
                  onClick={() => {
                    setHide(false);
                    setOpenDelete(true)
                  }}
                >
                  Delete Photo
                </p>
              </div>
            )}
          </div>
          <center>
            <Avatar
              src={`${constants.MEDIA_URL}/${userUniversity?.university?.logoImage?.mediaId}.${userUniversity?.university?.logoImage?.metaData?.extension}`
              }
              size={90}
            >
              {userUniversity?.university?.name.charAt(0)}
              {userUniversity?.university?.name.charAt(5)}
            </Avatar>
            <div>
              <Typography className="emp-name">
                {userUniversity?.university?.name}
              </Typography>
              <Typography className="emp-desgination">
                {userUniversity?.university?.designation}
              </Typography>
            </div>
          </center>
        </div>
        <Divider />
        <div className="flex justify-center items-center">
          <Typography className="mr-2 font-normal text-base light-grey-color">
            Conatact Person:
          </Typography>
          <img
            src={`${constants.MEDIA_URL}/${profileImage}.${profileType}`}
            alt=""
            width={32}
            className="rounded-[50%]"
          />
          <Typography className="ml-2 font-normal text-base text-secondary-color">
            {userUniversity?.contact?.firstName}
            {userUniversity?.contact?.lastName}
          </Typography>
        </div>
        <Divider />
        <div className="social-info">
          <div className="social-icon flex items-center mt-3">
            <IconEmail />
            <Typography className="emp-social">
              {userUniversity?.university?.email}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3">
            <IconPhone />
            <Typography className="emp-social">
              {userUniversity?.university?.phoneNumber}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3 mb-1">
            <IconLocation />
            <Typography className="emp-social">
              {userUniversity?.university?.address}
            </Typography>
          </div>
        </div>
        <Divider />
        <p
          onClick={() => {
            setShowSideViewType("change-password");
          }}
          className="a-tag-side cursor-pointer"
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
          <Form.Item>
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
          if (userUniversity?.university?.logoImage?.id)
            action.deleteUserImage(
              userUniversity?.university?.logoImage?.id, ()=> {} , 'UNIVERSITY_LOGO');
        }}
        okBtntxt={"Delete"}
        children={"Are you sure you want to delete this image."}
        type={"error"}
      />
    </div>
  );
};

export default StudentSideBar;
