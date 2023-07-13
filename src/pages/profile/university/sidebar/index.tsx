import {useState } from "react";
import { Divider, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { IconEmail, IconLocation, IconPhone, UniLogo } from "../../../../assets/images";
import {  useRecoilValue } from "recoil";
import { currentUserState } from "../../../../store";
import useCustomHook from "../../actionHandler";
import constants from "../../../../config/constants";
import "../../style.scss";

const StudentSideBar = (props: any) => {
  const { setShowSideViewType } = props;
  const action = useCustomHook();
  const [hide, setHide] = useState(false);
  const { userUniversity } = useRecoilValue(currentUserState);

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
            {/* <img
              src={
                `${constants.MEDIA_URL}/${userUniversity?.logo?.mediaId}.${userUniversity[0]?.logo?.metaData?.extension}`
                  ? `${constants.MEDIA_URL}/${userUniversity?.logo?.mediaId}.${userUniversity[0]?.logo?.metaData?.extension}`
                  :uniLogo
              }
              alt=""
              width={85}
            /> */}
            <UniLogo />
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
          className="a-tag-side"
        >
          Change Password
        </p>
      </div>
    </div>
  );
};

export default StudentSideBar;
