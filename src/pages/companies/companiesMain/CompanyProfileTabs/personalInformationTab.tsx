import React from 'react'
import dayjs from "dayjs";
import { Col, Row, Divider } from 'antd';
import { BoxWrapper } from '../../../../components';

const CompanyProfileTabs = () => {
  const PersnolInformationData = [
    { title: "First name", value: "Maria" },
    { title: "Last Name", value: "Sanoid" },
    { title: "Gender", value: "Sanoid" },
    { title: "Date of Birth", value: dayjs("21st April, 1996 (26 years old)").format("DD MMMM, YYYY") },
    { title: "Persnol Email", value: "maria@gmail.com" },
    { title: "Phone Number", value: "+44 7700 900077" },
  ];
  const Address = [
    { title: "Post Code", value: "SG12 1HW" },
    { title: "Address", value: "263 Eversholt" },
    { title: "City", value: "London" },
    { title: "Country", value: "United Kingdom" },
  ];
  return (
    <div>
      <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Personal Details</p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base text-primary-color title">{item.title}</h2>
              <p className="m-0 text-lg text-teriary-color ">{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider />
      <div className="acedmic-details">
        <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">Address</p>

        <Row gutter={[30, 20]}>
          {Address.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
              <div className="personal-information-wrap ">
                <h2 className="m-0 font-medium text-base text-primary-color title">{item.title}</h2>
                <p className="m-0 text-lg text-teriary-color">{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default CompanyProfileTabs