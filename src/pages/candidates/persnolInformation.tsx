import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import { FC, useState } from "react";

const Other = ["surfing", "reading", "sketching", "video games", "movies", "travelling"];
const allergie = ["pollen Allergy", "peanuts allergy"];
interface IPersnolInformation {
  selectedCandidate: any;
}
const PersnolInformation: FC<IPersnolInformation> = (props) => {
  const {
    selectedCandidate: {
      userDetail: {
        firstName,
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
      },
    },
  } = props;

  const PersnolInformationData = [
    { title: "First name", value: firstName },
    { title: "Last Name", value: lastName },
    { title: "Gender", value: gender },
    { title: "Date of Birth", value: dayjs(DOB).format("DD MMMM, YYYY") },
    { title: "Place of Birth", value: "London,United Kingdom" },
    { title: "Nationality", value: "British" },
    { title: "Persnol Email", value: email },
    { title: "Phone Number", value: phoneNumber },
    { title: "national Insurance Number", value: "AB12356A" },
    { title: "Visa Status", value: veriffStatus },
  ];

  const Address = [
    { title: "Post Code", value: postCode },
    { title: "Address", value: address },
    { title: "City", value: city },
    { title: "Country", value: country },
  ];

  const AcademicData = [
    { title: "University", value: "Imperial College London" },
    { title: "Course", value: "Creatice Design" },
    { title: "University Email", value: "maria.sanaid@icl.co.uk" },
    { title: "Post Code", value: "SG121HW" },
    { title: "Address", value: "263 Eversholt" },
    { title: "City", value: "London" },
    { title: "Country", value: "United Kingdom" },
    { title: "University Contact Name ", value: "Albert John" },
    { title: "Universty Contact Phone", value: "+44 20 7589 5111" },
    { title: "Internship Start Date", value: "01/01/2022" },
    { title: "Internship End Date", value: "30/12/2022" },
    { title: "Internship Duration", value: "12 months" },
  ];

  const [others, setOthers] = useState(Other);
  const [allergies, setAllergies] = useState(allergie);
  return (
    <div className="persnol-main">
      <p className="persnol-para mb-4">Personal Details</p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base title">{item.title}</h2>
              <p className="m-0">{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Divider type="horizontal" />
      <div className="personal-heading">
        <p className="persnol-para mb-4">About Me</p>
        <p className="persnol-para-text mt-2">
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
        <p className="persnol-para mb-4">Academic Details</p>

        <Row gutter={[30, 20]}>
          {AcademicData.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
              <div className="personal-information-wrap ">
                <h2 className="m-0 font-medium text-base title">{item.title}</h2>
                <p className="m-0">{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Divider type="horizontal" />
      <div className="acedmic-details">
        <p className="persnol-para mb-4">Address</p>

        <Row gutter={[30, 20]}>
          {Address.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
              <div className="personal-information-wrap ">
                <h2 className="m-0 font-medium text-base title">{item.title}</h2>
                <p className="m-0">{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Divider type="horizontal" />

      <div className="acedmic-details">
        <p className="persnol-para mb-4">Others</p>
        <p className="persnol-para mb-4">Hobbies</p>

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
      <p className="persnol-para my-4">Allergies</p>
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
        <p className="persnol-para pt-2">Medical Conditions</p>
        <p className="pt-2">I have a diagnose of asthama. I had this condition for 1year</p>
      </div>
      <div className="dependants ">
        <p className="persnol-para ">Dependants</p>
        <p className="pt-2">No</p>
      </div>
    </div>
  );
};

export default PersnolInformation;
