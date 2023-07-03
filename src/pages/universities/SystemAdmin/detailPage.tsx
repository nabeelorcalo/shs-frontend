import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Typography } from "antd";
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
import { useParams } from "react-router-dom";

const name = "University";

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

const DetailPage = () => {
  let params = useParams();
  const [searchItem, setSearchItem] = useState('');
  const action = useCustomHook()
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const recentUniversity = universitySubAdmin[0].filter((item: any) => item.id == params.id)

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  useEffect(() => {
    action.getSubAdminUniversity({ search: searchItem })
  }, [searchItem])
  return (
    <div className="detail-page">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <span className="font-semibold text-2xl dashboard-primary-color">
            {recentUniversity[0]?.university?.name}
          </span>
          <Divider type="vertical" />
          <span className="font-semibold text-base text-secondary-color">
            Univesity
          </span>
        </Col>
      </Row>
      <Divider />
      <Row gutter={20}>
        <Col xxl={6} xl={8} lg={24} md={24} sm={24} xs={24}>
          <div className="pt-10">
            <center>
              <UniLogo />
              <Typography className="font-semibold text-xl text-primary-color ">
                {recentUniversity[0]?.university?.name}
              </Typography>
              <Typography className="font-medium text-base text-secondary-color ">
                {recentUniversity[0]?.university?.city} {recentUniversity[0]?.university?.country}
              </Typography>
            </center>
            <Divider />
            <div className="flex items-center justify-evenly">
              <span className="font-noraml text-success-placeholder-color  text-base ">
                Contact Person
              </span>
              <Person />
              <span className="font-noraml text-secondary-color text-base ">
                {recentUniversity[0]?.contact?.firstName} {recentUniversity[0]?.contact?.lastName}
              </span>
            </div>
            <Divider />
            <div className="social-info ">
              <div className="social-icon flex  items-center mt-3 ml-7">
                <IconEmail />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.email}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 ml-7 ">
                <IconPhone />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.phoneCode} {recentUniversity[0]?.university?.phoneNumber}
                </Typography>
              </div>
              <div className="social-icon flex items-center mt-3 mb-1 ml-6">
                <IconLocation />
                <Typography className="font-normal text-sm text-secondary-color ml-4">
                  {recentUniversity[0]?.university?.address}
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
                      {name} Name
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.name}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Email
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.email}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Phone Number
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.phoneCode} {recentUniversity[0]?.university?.phoneNumber}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Registered Interns
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.internCount}
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
                      {recentUniversity[0]?.university?.postCode}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Address
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color  lg:mr-5">
                      {recentUniversity[0]?.university?.address}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      City
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.city}
                    </Typography>
                  </Col>
                  <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
                    <Typography className="font-medium text-base text-primary-color ">
                      Country
                    </Typography>
                    <Typography className="font-normal text-lg text-secondary-color ">
                      {recentUniversity[0]?.university?.country}
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
                      {recentUniversity[0]?.university?.aboutUni}
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
