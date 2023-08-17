import { useState } from "react";
import { Divider, Typography, Modal, Form, Space, Button, Avatar, MenuProps, Dropdown } from "antd";
import { EllipsisOutlined, CloseCircleFilled } from '@ant-design/icons';
import profile from "../../../assets/images/profile/student/profiled.svg";
import iconEmail from "../../../assets/images/profile/student/email.svg";
import iconPhone from "../../../assets/images/profile/student/Phone.svg";
import iconLocation from "../../../assets/images/profile/student/location.svg";
import { DragAndDropUpload, Alert } from "../../../components";
import useCustomHook from "../actionHandler";
import { User } from "../../../assets/images";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../store";
import constants from "../../../config/constants";


const profileInfo = [
  {
    profile: profile,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    role: "Design",
    iconEmail: iconEmail,
    iconPhone: iconPhone,
    iconLocation: iconLocation,
    skills: [
      {
        skill: "UI Interface Design",
      },
      {
        skill: "Documentation",
      },
      {
        skill: "UX Strategy",
      },
      {
        skill: "XD",
      },
    ],
    email: "maria@studenthelpsquad.com",
    phone: "+44 7700 900077",
    location: "263 Eversholt St, London NW11NB, UK",
  },
];
const ProfileSideBar = (props: any) => {
  // const action = useCustomHook();
  const { showSideViewType, setShowSideViewType } = props;
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [actionBox, setActionBox] = useState(false);
  const [files, setFiles] = useState<any>('');
  const action = useCustomHook();
  const {
    profileImage,
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    city,
    address,
    role } = useRecoilValue(currentUserState);

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

  const items: MenuProps['items'] = [
    {
      label: <p className="cursor-pointer text-base font-normal text-secondary-color"
        onClick={() => {
          setActionBox(false);
          setOpenImage(true);
        }}>
        Upload Image
      </p>,
      key: '0',
    },
    {
      label: <p className="cursor-pointer text-base font-normal text-secondary-color"
        onClick={() => {
          setActionBox(false);
          setOpenDelete(true);
        }}>
        Delete Image
      </p>,
      key: '1',
    },
  ];

  return (
    <div >
      <div className="h-[70vh] student-side-bar">
        <div className="main-student-side-bar">
          {profileInfo.map((item: any, index: any) => {
            return (
              <>
                <div className="profile-main-detail">
                  {/* <div className="flex justify-end relative">
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
                            setOpenImage(true);

                          }}>
                          Upload Image
                        </p>
                        <p className="pb-2 cursor-pointer text-base font-normal text-secondary-color"
                          onClick={() => {
                            setActionBox(false);
                            setOpenDelete(true);

                          }}>
                          Delete Image
                        </p>
                      </div>
                    )}
                  </div> */}
                  <Dropdown menu={{ items }} trigger={['click']} className="float-right">
                      <EllipsisOutlined className="pt-5 pr-5 cursor-pointer text-3xl"
                        onClick={() => {
                          setActionBox(true);
                        }}
                      />
                  </Dropdown>
                  <div className="clear-both"></div>
                  <center>
                    <Avatar size={90}
                      src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData.extension}`}
                    >
                      {firstName.charAt(0)}
                      {lastName.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography className="emp-name">{firstName ? firstName : "N/A"} {lastName ? lastName : "N/A"}</Typography>
                      <Typography className="emp-role capitalize">{role?.split("_").join(' ').toLowerCase() ?? "N/A"}</Typography>
                    </div>
                  </center>
                </div>
                <Divider />
                <div className="social-info">
                  <div className="social-icon flex items-center mt-3">
                    <img src={item.iconEmail} alt="" />
                    <Typography className="emp-social">{email ? email : "N/A"}</Typography>
                  </div>
                  <div className="social-icon flex items-center mt-3">
                    <img src={item.iconPhone} alt="" />
                    <Typography className="emp-social">{phoneNumber ? phoneNumber : "N/A"}</Typography>
                  </div>
                  <div className="social-icon flex items-center mt-3 mb-1">
                    <img src={item.iconLocation} alt="" />
                    <Typography className="emp-social">
                      {/* {address ? address : "N/A"} */}
                      {city} {country} {address}
                    </Typography>
                  </div>
                </div>
                <Divider />
                <p className="a-tag-side pb-3 cursor-pointer"
                  onClick={() => { setShowSideViewType(true) }}
                >
                  Change Password
                </p>
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
                    if (profileImage.id)
                      action.deleteUserImage(
                        profileImage?.id
                      );
                  }}
                  okBtntxt={"Delete"}
                  children={"Are you sure you want to delete this image."}
                  type={"error"}
                />
              </>

            );
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfileSideBar