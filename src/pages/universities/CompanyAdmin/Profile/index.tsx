import React, { useState } from "react";
import { Col, Divider, Row, Typography } from "antd";
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
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import './style.scss'

const breadcrumbArray = [
  { name: "University of Lincoln " },
  { name: "Universities", onClickNavigateTo: `${ROUTES_CONSTANTS.UNIVERSITIES}` },
];

const commonObj = {
  moduleName: "University of Lincoln",
  type: "Univesity",
  depName: "University of Lincoln",
  area: "Lincoln, United Kingdom",
  logo: UniLogo,
  personName: "Arlene McCoy",
  personImg: Person,
  iconEmail: IconEmail,
  iconPhone: IconPhone,
  iconLocation: IconLocation,
  email: "enquiries@lincoln.ac.uk",
  phone: "+44 7700 900077",
  location: "Brayford Way, Brayford, Pool, Lincoln LN6 7TS, United Kingdom",
  basic: {
    name: "University of Lincoln",
    email: "enquiries@lincoln.ac.uk",
    mobile: "+44 7700 900077",
    regIntern: "234",
  },
  address: {
    postCode: "LN6 7TS",
    address: "Brayford Way, Brayford, Pool, Lincoln LN6 7TS, United Kingdom",
    city: "Lincoln",
    country: "United Kingdom",
  },
  about: {
    description:
      "Situated in the heart of a beautiful and historic city, we are placed among the top 30 universities in the UK for student satisfaction in the Guardian University Guide 2023.Employers are increasingly looking for individuals who can make a difference in today’s global workplace. With our expert staff, modern facilities, close links with business, and world-leading research we aim to provide the tools you need to achieve your career aspirations. Whether you are thinking about coming to study or undertake research with us, you can be confident that you are joining a university that places the quality of the student experience at the heart of everything it does.",
  },
};

const index = () => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  return (
    <div className="university-profile-detail-page">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <Breadcrumb breadCrumbData={breadcrumbArray} />
          <Divider />
        </Col>
      </Row>

      <Row gutter={[20,20]} className="md:my-5 "  >
        <Col xxl={6} xl={8} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper className="md:min-h-[850px]">
            <div className="pt-10">
              <center>
                <UniLogo />
                <Typography className="font-semibold text-xl text-primary-color font-[outfit]">
                  {commonObj.depName}
                </Typography>
                <Typography className="font-medium text-base text-secondary-color font-[outfit]">
                  {commonObj.area}
                </Typography>
              </center>
              <Divider />

              <div className="social-info ">
                <div className="social-icon flex  items-center mt-3 ">
                  <IconEmail />
                  <Typography className=" font-[outfit] font-normal text-sm text-secondary-color ml-4">
                    {commonObj.email}
                  </Typography>
                </div>
                <div className="social-icon flex items-center mt-3 ">
                  <IconPhone />
                  <Typography className=" font-[outfit] font-normal text-sm text-secondary-color ml-4">
                    {commonObj.phone}
                  </Typography>
                </div>
                <div className="social-icon flex items-center mt-3 mb-1 ">
                  <IconLocation />
                  <Typography className=" font-[outfit] font-normal text-sm text-secondary-color ml-4">
                    {commonObj.location}
                  </Typography>
                </div>
              </div>
              <Divider />
              <div className="flex-col flex sm:flex-row items-center justify-between">
                <span className="font-noraml text-[#A0A3BD] text-base font-[outfit]">
                  University Rep
                </span>

                <span className="font-noraml text-secondary-color  font-[outfit] flex my-2 md:sm-0">
                  <img src={Image1} /><span className="mt-1 px-2">{commonObj.personName}</span>
                </span>
              </div>
              <Divider />
              <div className="map ">
                <Typography className="ml-4 font-[outfit] font-semibold text-xl text-primary-color">
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
          <BoxWrapper className="md:min-h-[850px]">
            <div>
              <div className="p-2">
                <div className="pt-10 pb-2 font-semibold text-xl text-primary-color font-[outfit]">
                  Basic Information
                </div>
                <div className="pt-2">
                  <Row gutter={[5, 20]}>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                      University Name
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
                        {commonObj.basic.name}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        Email
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
                        {commonObj.basic.email}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        Phone Number
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
                        {commonObj.basic.mobile}
                      </Typography>
                    </Col>

                  </Row>
                </div>
              </div>
              <div className="p-2">
                <div className="pt-5 pb-2 font-semibold text-xl text-primary-color font-[outfit]">
                  Address
                </div>
                <div className="pt-2">
                  <Row gutter={[5, 20]}>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        Post Code
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
                        {commonObj.address.postCode}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        Address
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit] lg:mr-5">
                        {commonObj.address.address}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        City
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
                        {commonObj.address.city}
                      </Typography>
                    </Col>
                    <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                      <Typography className="font-medium text-base text-primary-color font-[outfit]">
                        Country
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
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
                      <Typography className="pb-2 font-semibold text-xl text-primary-color font-[outfit]">
                        About University
                      </Typography>
                      <Typography className="font-normal text-lg text-secondary-color font-[outfit]">
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
