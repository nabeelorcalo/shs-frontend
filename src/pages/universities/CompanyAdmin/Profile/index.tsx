import React, { useState } from "react";
import { Col, Divider, Row, Typography, Avatar } from "antd";
import {
  IconEmail,
  IconLocation,
  IconPhone,
  Person,
  UniLogo,
} from "../../../../assets/images";
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import { BoxWrapper, Breadcrumb, PopUpModal } from "../../../../components";
import mapImage from '../../../../assets/images/universities/map.svg'
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import './style.scss'
import { useLocation } from "react-router-dom";

const breadcrumbArray = [
  { name: "University of Lincoln " },
  { name: "Universities", onClickNavigateTo: `/${ROUTES_CONSTANTS.UNIVERSITIES}`},
];

const index = () => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { state } = useLocation();

  const commonObj = {
    moduleName: "University of Lincoln",
    type: "Univesity",
    depName: state?.university?.name ?? "N/A",
    area: state?.university?.country,
    logo: <Avatar size={50}
      src={`${constants.MEDIA_URL}/${state?.university?.logo?.mediaId}.${state?.university?.logo?.metaData?.extension}`}
    >
      {state?.university?.firstName?.charAt(0)}{state?.university?.lastName?.charAt(0)}
    </Avatar>,
    personname: `${state?.contact?.firstName} ${state?.contact?.lastName}`,
    personImg: <Avatar size={50}
      src={`${constants.MEDIA_URL}/${state?.contact?.profileImage?.mediaId}.${state?.contact?.profileImage?.metaData?.extension}`}
    >
      {state?.university?.firstName?.charAt(0)}{state?.university?.lastName?.charAt(0)}
    </Avatar>,

    iconEmail: IconEmail,
    iconPhone: IconPhone,
    iconLocation: IconLocation,
    email: state?.university?.email,
    phone: state?.university?.phoneNumber,
    location: state?.university?.address,
    basic: {
      name: state?.university?.name,
      email: state?.university?.email,
      mobile: state?.university?.phoneNumber,
      regIntern: "234",
    },
    address: {
      postCode: state?.university?.postCode,
      address: state?.university?.address,
      city: state?.university?.city,
      country: state?.university?.country,
    },
    about: { description: state?.university?.aboutUni },
  };
  return (
    <div className="university-profile-detail-page ">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Breadcrumb breadCrumbData={breadcrumbArray} />
          <Divider />
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="md:my-5 "  >
        <Col xxl={6} xl={8} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper className="md:min-h-[950px]">
            <div className="pt-10">
              <center>
                {/* <UniLogo /> */}
                <Avatar size={70} src={commonObj?.logo}>
                  {/* {state?.userDetail?.firstName?.charAt(0)}{state?.userDetail?.lastName?.charAt(0)} */}
                </Avatar>
                {/* <img src={commonObj?.logo} alt="d;svmsvmslvm" /> */}
                <Typography className="font-semibold text-xl text-primary-color">
                  {commonObj.depName}
                </Typography>
                <Typography className="font-medium text-base text-secondary-color">
                  {commonObj.area}
                </Typography>
              </center>
              <Divider />

              <div className="social-info ">
                <div className="social-icon flex  items-center mt-3 ">
                  <IconEmail />
                  <Typography className=" font-normal text-sm text-secondary-color ml-4">
                    {commonObj.email}
                  </Typography>
                </div>
                <div className="social-icon flex items-center mt-3 ">
                  <IconPhone />
                  <Typography className=" font-normal text-sm text-secondary-color ml-4">
                    {commonObj.phone}
                  </Typography>
                </div>
                <div className="social-icon flex items-center mt-3 mb-1 ">
                  <IconLocation />
                  <Typography className=" font-normal text-sm text-secondary-color ml-4">
                    {commonObj.location}
                  </Typography>
                </div>
              </div>
              <Divider />
              <div className="flex-col flex sm:flex-row items-center justify-between">
                <span className="font-noraml text-[#A0A3BD] text-base">
                  University Rep
                </span>
                <div>
                  <Avatar
                    // size={60}
                    shape="circle"
                    src={commonObj?.personImg}>
                  </Avatar>
                </div>
                <span className="font-noraml text-secondary-color  flex my-2 md:sm-0">
                  <span className="mt-1 px-2">{commonObj?.personname}</span>
                </span>
              </div>
              <Divider />
              <div className="map ">
                <Typography className="ml-4 font-semibold text-xl text-primary-color">
                  Location
                </Typography>
                <div className="container xs:mt-2 md:mt-10">
                  <span className="image">
                    <img src={mapImage} alt="Avatar" className="background-img" />
                  </span>
                  <div
                    className="middle"
                    onClick={() => {
                      setShowEditModal(!showEditModal);
                    }}
                  >
                    <span className="text w-full text-base">Click to preview</span>
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>

        <Col xxl={18} xl={16} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper className="md:min-h-[950px]">
            <div>
              <div className="p-2">
                <div className="pt-10 pb-2 font-semibold text-xl text-primary-color">
                  Basic Information
                </div>
                <div className="pt-2">
                  <Row gutter={[5, 20]}>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        University Name
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.basic.name}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        Email
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.basic.email}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        Phone Number
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.basic.mobile}
                      </Typography>
                    </Col>

                  </Row>
                </div>
              </div>
              <div className="p-2">
                <div className="pt-5 pb-2 font-semibold text-xl text-primary-color">
                  Address
                </div>
                <div className="pt-2">
                  <Row gutter={[5, 20]}>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        Post Code
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.address.postCode}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        Address
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color lg:mr-5">
                        {commonObj.address.address}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        City
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.address.city}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color">
                        Country
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.address.country}
                      </Typography>
                    </Col>
                  </Row>
                </div>
              </div>
              <Divider />
              <div className="about">
                <Row>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div>
                      <Typography className="pb-2 font-semibold text-xl text-primary-color">
                        About University
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color">
                        {commonObj.about.description}
                      </Typography>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </BoxWrapper>
        </Col>
      </Row>
      <PopUpModal
        open={showEditModal}
        title=""
        width={1000}
        footer=""
        close={() => setShowEditModal(false)}
      >

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11361.466148264095!2d-0.5635788254192343!3d53.22763683565447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48785b27c23b160d%3A0xd4016d4c2c43e9ae!2sUniversity%20of%20Lincoln!5e0!3m2!1sen!2sus!4v1680849119123!5m2!1sen!2sus"
          className="border-0 w-full h-[500px]"
          // style="border:0;"
          // allowfullscreen=""
          loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </PopUpModal>
    </div>
  );
};

export default index;
