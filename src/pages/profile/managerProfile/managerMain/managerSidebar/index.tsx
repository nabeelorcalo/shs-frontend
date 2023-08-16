import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Divider, Modal, Space, Form, Button } from 'antd';
import { EllipsisOutlined, CloseCircleFilled } from '@ant-design/icons';
import useCustomHook from '../../../actionHandler';
import constants from '../../../../../config/constants';
import { IconEmail, IconLocation, IconPhone } from '../../../../../assets/images';
import '../../styles.scss';
import { Alert, DragAndDropUpload } from '../../../../../components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, settingDepartmentState } from '../../../../../store';

const ManagerSidebar = (props: any) => {
  const { setShowSideViewType } = props;
  const action = useCustomHook();
  const [hide, setHide] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const departmentData = useRecoilState<any>(settingDepartmentState);

  const departmentNames = departmentData[0]?.map((department: any) => {
    return department.name;
  });

  const [files, setFiles] = useState("");
  const { id, firstName,
    lastName,
    title,
    email,
    phoneCode,
    phoneNumber,
    country,
    departmentId,
    city,
    address, profileImage } = useRecoilValue(currentUserState);

  const findByID = departmentData[0]?.find((id: any) => id.id === departmentId)

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

  useEffect(() => {
    action.getSettingDepartment(1, "");
  }, []);

  return (
    <div className="manager-side-bar h-[97vh]">
      <div className="main-manager-side-bar">
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
              src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData?.extension}`}
              size={90}
            >
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </Avatar>
            <div>
              <Typography className="emp-name">
                {firstName || 'N/A'} {lastName || 'N/A'}
              </Typography>
              <Typography className="emp-desgination">
                {title || 'N/A'}
              </Typography>
              <Typography>{findByID?.name || 'N/A'}</Typography>
            </div>
          </center>
        </div>
        <Divider />
        <div className="social-info">
          <div className="social-icon flex items-center mt-3">
            <IconEmail />
            <Typography className="emp-social">
              {email || 'N/A'}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3">
            <IconPhone />
            <Typography className="emp-social">
              {phoneCode || 'N/A'} {phoneNumber || 'N/A'}
            </Typography>
          </div>
          <div className="social-icon flex items-center mt-3 mb-1">
            <IconLocation />
            <Typography className="emp-social">
              {address || 'N/A'} {city || 'N/A'} {country || 'N/A'}
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
          if (profileImage?.id)
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

export default ManagerSidebar