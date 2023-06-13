import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";
import { FC } from "react";

interface IPersnolInformation {
  selectedCandidate: any;
  studentDetails: any;
}
const PersnolInformation: FC<IPersnolInformation> = (props) => {
  const {
    selectedCandidate: {
      userDetail,
    },
    studentDetails,
  } = props;

  const personal = studentDetails?.personal;
  const general = studentDetails?.general;
  const university = general?.userUniversity?.university;

  const PersnolInformationData = [
    { title: "First name", value: userDetail?.firstName },
    { title: "Last Name", value: userDetail?.lastName },
    { title: "Gender", value: userDetail?.gender },
    { title: "Date of Birth", value: dayjs(userDetail?.DOB).format("DD MMMM, YYYY") },
    { title: "Place of Birth", value: personal?.birthPlace },
    { title: "Nationality", value: personal?.nationality },
    { title: "Persnol Email", value: userDetail?.email },
    { title: "Phone Number", value: userDetail?.phoneNumber },
    { title: "National Insurance Number", value: personal?.insuranceNumber },
    { title: "Visa Status", value: userDetail?.veriffStatus },
  ];

  const Address = [
    { title: "Post Code", value: userDetail?.postCode },
    { title: "Address", value: userDetail?.address },
    { title: "City", value: userDetail?.city },
    { title: "Country", value: userDetail?.country },
  ];

  const AcademicData = [
    { title: "University", value: university?.name },
    { title: "Course", value: general?.course },
    { title: "University Email", value: university?.email },
    { title: "Post Code", value: university?.postCode },
    { title: "Address", value: university?.address },
    { title: "City", value: university?.city },
    { title: "Country", value: university?.country },
    { title: "University Contact Name ", value: "" },
    { title: "Universty Contact Phone", value: university?.phoneNumber },
    { title: "Internship Start Date", value: dayjs(general?.internshipStartDate).format("DD/MMMM/YYYY") },
    { title: "Internship End Date", value: dayjs(general?.internshipEndDate).format("DD/MMMM/YYYY") },
    { title: "Internship Duration", value: general?.internshipDuration },
  ];

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
        <p className="persnol-para-text mt-2">{personal?.aboutMe}</p>
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
          {personal?.hobbies?.length > 0 ? (
            personal?.hobbies?.map((item: string) => (
              <div className="other-item flex items-center gap-5 cursor-pointer">
                <p className="m-0 capitalize" key={item}>
                  {item}
                </p>
              </div>
            ))
          ) : (
            <span>No</span>
          )}
        </div>
      </div>
      <p className="persnol-para my-4">Allergies</p>
      <div className="flex items-center flex-wrap gap-4 others">
        {personal?.allergies?.length > 0 ? (
          personal?.allergies?.map((item: string) => (
            <div className="other-item flex items-center gap-5 cursor-pointer">
              <p className="m-0 capitalize" key={item}>
                {item}
              </p>
            </div>
          ))
        ) : (
          <span>No</span>
        )}
      </div>
      <div className="medical my-4">
        <p className="persnol-para pt-2">Medical Conditions</p>
        <p className="pt-2">{personal?.medicalCondition ?? "No"}</p>
      </div>
      <div className="dependants ">
        <p className="persnol-para ">Dependants</p>
        <p className="pt-2">{personal?.haveDependents ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default PersnolInformation;
