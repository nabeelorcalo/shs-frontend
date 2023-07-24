import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { companySystemAdminState } from '../../../store/companySystemAdmin';
import { Typography, Divider, Row, Col,Avatar } from 'antd';
import { CompanyLogo, IconEmail, IconLocation, IconPhone, Person } from '../../../assets/images';
import useCustomHook from "./actionHandler";
import constants from '../../../config/constants';

const CompanyDetailPage = () => {
  const action = useCustomHook()
  let params = useParams();
  const companySubAdmin = useRecoilState<any>(companySystemAdminState);
  const recentCompany = companySubAdmin[0].filter((item: any) => item.id == params.id)
  const [searchItem, setSearchItem] = useState('');
  
  useEffect(() => {
    action.getSubAdminCompany({ search: searchItem })
  }, [searchItem])

  const searchValue = (e: any) => {
    setSearchItem(e);
  };
  return (
    <div className="detail-page">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <span className="font-semibold text-2xl dashboard-primary-color">
            {recentCompany[0]?.businessName}
          </span>
          <Divider type="vertical" />
          <span className="font-semibold text-base text-secondary-color">
            Companies
          </span>
        </Col>
      </Row>
      <Divider />
      <Row gutter={20}>
        <Col xxl={6} xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="pt-10">
            <center>
            <Avatar
                size={90}
                src={`${constants.MEDIA_URL}/${recentCompany[0]?.profileImage?.mediaId}.${recentCompany[0]?.profileImage?.metaData?.extension}`}
              >
                {recentCompany[0]?.businessName.charAt(0)}
                {recentCompany[0]?.businessName.charAt(5)}
              </Avatar>
              <Typography className="font-semibold text-xl text-primary-color ">
                {recentCompany[0]?.businessName}
              </Typography>
              <Typography className="font-medium text-base text-secondary-color ">
                {recentCompany[0]?.city} {recentCompany[0]?.country}
              </Typography>
            </center>
            <Divider />
            <div className="flex items-center gap-x-3 justify-center">
              <span className="font-noraml text-success-placeholder-color  text-base ">
                Contact Person
              </span>
              <Avatar
                size={32}
                src={`${constants.MEDIA_URL}/${recentCompany[0]?.admin?.profileImage?.mediaId}.${recentCompany[0]?.admin?.profileImage?.metaData?.extension}`}
              >
                {recentCompany[0]?.businessName.charAt(0)}
                {recentCompany[0]?.businessName.charAt(0)}
              </Avatar>
              <span className="font-noraml text-secondary-color text-base ">
                {recentCompany[0]?.admin?.firstName} {recentCompany[0]?.admin?.lastName}
              </span>
            </div>
            <Divider />
            <div className="social-info ">
              <div className="social-icon flex  items-center mt-3 ml-7">
                <IconEmail />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentCompany[0]?.admin?.email}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 ml-7 ">
                <IconPhone />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentCompany[0]?.admin?.phoneCode} {recentCompany[0]?.admin?.phoneNumber}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 mb-1 ml-6">
                <IconLocation />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentCompany[0]?.street} {recentCompany[0]?.address}
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
                  className="border-0 w-full h-[500px]"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </Col>
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
                      Company Name
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.businessName}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Email
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.admin?.email}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Phone Number
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.admin?.phoneCode} {recentCompany[0]?.admin?.phoneNumber}
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
                      {recentCompany[0]?.postCode}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Address
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color  lg:mr-5">
                      {recentCompany[0]?.address}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      City
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.city}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Country
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.country}
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
                      About Company
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentCompany[0]?.aboutCompany}
                    </Typography>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CompanyDetailPage