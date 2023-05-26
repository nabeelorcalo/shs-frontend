import React, { useState } from 'react'
// import { CloseOutlined } from '@ant-design/icons/lib/icons'
import { Col, Divider, Row } from 'antd'
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';

const Other = ["surfing", "reading", "sketching", "video games", "movies", "travelling"];
const allergie = ["pollen Allergy", "peanuts allergy"];
interface IPersnolInformation {
  selectedCandidate: any;
}
const PersonalInformationTabs = (props: any) => {
  const { firstName,
    lastName,
    avatar,
    gender,
    DOB,
    phoneNumber,
    veriffStatus,
    postCode,
    email,
    address,
    country,
    city,
  } = props;

  const PersnolInformationData = [
    { title: "First name", value: "Maria" },
    { title: "Last Name", value: "Sanoid" },
    { title: "Gender", value: "Sanoid" },
    { title: "Date of Birth", value: dayjs("21st April, 1996 (26 years old)").format("DD MMMM, YYYY") },
    { title: "Place of Birth", value: "London,United Kingdom" },
    { title: "Nationality", value: "British" },
    { title: "Persnol Email", value: "maria@gmail.com" },
    { title: "Phone Number", value: "+44 7700 900077" },
    { title: "national Insurance Number", value: "AB12356A" },
    { title: "Visa Status", value: "Post Study Work Visa PSW" },
  ];

  const Address = [
    { title: "Post Code", value: "SG12 1HW" },
    { title: "Address", value: "263 Eversholt" },
    { title: "City", value: "London" },
    { title: "Country", value: "United Kingdom" },
  ];

  const workDetails = [
    { title: "Title", value: "UI UX Designer" },
    { title: "Department", value: "Design" },
    { title: "Work Email Email", value: "maria.sanaid@icl.co.uk" },
    { title: "Hiring Date", value: "10/02/2022" },
  ];
  const dependants = [
    { title: "Name", Value: "Albert Thomas" },
    { title: "Relationship", Value: "Son" },
    { title: "date of Birth", Value: "19/06/2010" },
  ]

  const [others, setOthers] = useState(Other);
  const [allergies, setAllergies] = useState(allergie);

  return (
    <div>
      <div className="persnol-main">
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

        <Divider type="horizontal" />
        <div className="personal-heading">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">About Me</p>
          <p className="persnol-para-text text-lg text-teriary-color mt-2">
            I'm Maria Sanoid, and I know I can help your company create stunning visuals. As someone who has studied in
            marketing and graphic design for last four years, I understand what brands need to capture their audiences'
            attention. With my intuitive design skills and knack for marketing, I have the right background for your
            company's needs. While marketing and graphic design are my two passions, I also enjoy surfing, doing
            crosswords and exploring the world. I am insanely curious about different cultures, so you'll also find my
            nose buried in a book or travel blog.
          </p>
        </div>
        <Divider type="horizontal" />

        <div className="acedmic-details">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">Work Details</p>

          <Row gutter={[30, 20]}>
            {workDetails.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                <div className="personal-information-wrap ">
                  <h2 className="m-0 font-medium text-base text-primary-color title">{item.title}</h2>
                  <p className="m-0  text-lg text-teriary-color">{item.value}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Divider type="horizontal" />
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
        <Divider type="horizontal" />

        <div className="acedmic-details">
          <p className="font-semibold text-primary-color text-xl mb-4">Others</p>
          <p className="font-medium text-base text-primary-color title mb-4">Hobbies</p>

          <div className="flex items-center flex-wrap gap-4 others">
            {others.length > 0 ? (
              others.map((item: string) => (
                <div className="other-item flex items-center gap-5 cursor-pointer">
                  <p className="m-0 capitalize" key={item}>
                    {item}
                  </p>
                  <CloseOutlined
                    className="other-icon"
                    onClick={() => setOthers(others.filter((val: string) => val !== item))}
                  />
                </div>
              ))
            ) : (
              <span>No Data Found...</span>
            )}
          </div>
        </div>
        <p className="font-medium text-base text-primary-color my-4">Allergies</p>
        <div className="flex items-center flex-wrap gap-4 others">
          {allergies.length > 0 ? (
            allergies.map((item: string) => (
              <div className="other-item flex items-center gap-5 cursor-pointer">
                <p className="m-0 capitalize" key={item}>
                  {item}
                </p>
                <CloseOutlined
                  className="other-icon"
                  onClick={() => setAllergies(allergies.filter((val: string) => val !== item))}
                />
              </div>
            ))
          ) : (
            <span>No Data Found...</span>
          )}
        </div>
        <div className="medical my-4">
          <p className="font-medium text-base text-primary-color title pt-2">Medical Conditions</p>
          <p className="pt-2 text-lg text-teriary-color">I have a diagnose of asthama. I had this condition for 1year</p>
        </div>
        <div className="dependants ">
          <p className="font-medium text-base text-primary-color mb-3">Dependants</p>
          <Row gutter={[30, 20]}>
            {dependants.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                <div className="personal-information-wrap ">
                  <h2 className="m-0 font-medium text-base text-primary-color title">{item.title}</h2>
                  <p className="m-0 text-lg text-teriary-color">{item.Value}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformationTabs