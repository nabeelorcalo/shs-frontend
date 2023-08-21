import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography,Avatar } from "antd";
import {
  IconEmail,
  IconLocation,
  IconPhone,
  Person,
  UniLogo,
} from "../../../assets/images";
import { useRecoilState } from "recoil";
import { universitySystemAdminState } from "../../../store";
import useCustomHook from "../actionHandler";
import { useNavigate, useParams } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";

const name = "University";

const DetailPage = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [searchItem, setSearchItem] = useState('');
  const action = useCustomHook()
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const recentUniversity = universitySubAdmin[0].filter((item: any) => item.id == params.id)
  
  useEffect(() => {
    action.getSubAdminUniversity({ search: searchItem })
  }, [searchItem])

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  return (
    <div className="university-detail-page">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <span className="font-semibold text-2xl dashboard-primary-color">
            {recentUniversity[0]?.university?.name}
          </span>
          <Divider type="vertical" />
          <span
            onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.UNIVERSITIES}`)
            }}
            className="font-semibold text-base text-secondary-color cursor-pointer">
            University
          </span>
        </Col>
      </Row>
      <Divider />
      <Row gutter={20}>
        <Col xxl={6} xl={7} lg={24} md={24} sm={24} xs={24}>
          <div className="pt-10 university-sidebar">
            <center>
            <Avatar
                size={90}
                src={`${constants.MEDIA_URL}/${recentUniversity[0]?.university?.logo?.mediaId}.${recentUniversity[0]?.university?.logo?.metaData?.extension}`}
              >
                {recentUniversity[0]?.university?.name.charAt(0)}
                {recentUniversity[0]?.university?.name.charAt(5)}
              </Avatar>
              <Typography className="font-semibold text-xl text-primary-color ">
                {recentUniversity[0]?.university?.name || 'N/A'}
              </Typography>
              <Typography className="font-medium text-base text-secondary-color">
                {recentUniversity[0]?.university?.city || 'N/A'} {recentUniversity[0]?.university?.country || 'N/A'}
              </Typography>
            </center>
            <Divider />
            <div className="flex items-center justify-center gap-x-3">
              <span className="font-noraml text-success-placeholder-color text-base">
                Contact Person
              </span>
              <Avatar
                size={32}
                src={`${constants.MEDIA_URL}/${recentUniversity[0]?.contact?.profileImage?.mediaId}.${recentUniversity[0]?.contact?.profileImage?.metaData?.extension}`}
              >
                {recentUniversity[0]?.university?.name.charAt(0)}
                {recentUniversity[0]?.university?.name.charAt(0)}
              </Avatar>
              <span className="font-noraml text-secondary-color text-base">
                {recentUniversity[0]?.contact?.firstName} {recentUniversity[0]?.contact?.lastName}
              </span>
            </div>
            <Divider />
            <div className="social-info ">
              <div className="social-icon flex items-center mt-3 ml-7">
                <IconEmail />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.email || 'N/A'}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 ml-7 ">
                <IconPhone />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.phoneCode || 'N/A'} {recentUniversity[0]?.university?.phoneNumber || 'N/A'}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 mb-1 ml-6">
                <IconLocation />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.address || 'N/A'}
                </Typography>
              </div>
            </div>
            <Divider />
            <div className="map ">
              <Typography className="ml-4 font-semibold text-xl text-primary-color">
                Location
              </Typography>
              <div className="mt-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11361.466148264095!2d-0.5635788254192343!3d53.22763683565447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48785b27c23b160d%3A0xd4016d4c2c43e9ae!2sUniversity%20of%20Lincoln!5e0!3m2!1sen!2sus!4v1680849119123!5m2!1sen!2sus"
                  className="border-0 w-[380px] h-[260px]"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </Col>
        <hr className="border-solid border-[#D9DBE9]"/>
        <Col xxl={12} xl={16} lg={24} md={24} sm={24} xs={24}>
          <div>
            <div className="p-2">
              <div className="pt-10 pb-2 font-semibold text-xl text-primary-color ">
                Basic Information
              </div>
              <div className="pt-2">
                <Row gutter={[5, 20]}>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      {name || 'N/A'} Name
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.name || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Email
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.email || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Phone Number
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.phoneCode || 'N/A'} {recentUniversity[0]?.university?.phoneNumber || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Registered Interns
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.internCount || 'N/A'}
                    </Typography>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="p-2">
              <div className="pt-5 pb-2 font-semibold text-xl text-primary-color ">
                Address
              </div>
              <div className="pt-2">
                <Row gutter={[5, 20]}>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Post Code
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.postCode || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Address
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color  lg:mr-5">
                      {recentUniversity[0]?.university?.address || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      City
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.city || 'N/A'}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Country
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.country || 'N/A'}
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
                    <Typography className="pb-2 font-semibold text-xl text-primary-color ">
                      About {name}
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.aboutUni || 'N/A'}
                    </Typography>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetailPage;
