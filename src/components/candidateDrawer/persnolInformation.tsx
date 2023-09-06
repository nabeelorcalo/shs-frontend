import { Col, Divider, Row } from "antd";
import dayjs from "dayjs";

export const PersnolInformation = (props: any) => {
  const {
    userDetail,
    personal,
    general,
    university,
  } = props;

  const PersnolInformationData = [
    { title: "First name", value: userDetail?.firstName || "N/A" },
    { title: "Last Name", value: userDetail?.lastName || "N/A" },
    { title: "Gender", value: userDetail?.gender || "N/A" },
    { title: "Date of Birth", value: dayjs(userDetail?.DOB).format("DD MMMM, YYYY") || "N/A" },
    { title: "Place of Birth", value: personal?.birthPlace || "N/A" },
    { title: "Nationality", value: personal?.nationality || "N/A" },
    { title: "Persnol Email", value: userDetail?.email || "N/A" },
    { title: "Phone Number", value: userDetail?.phoneNumber || "N/A" },
    { title: "National Insurance Number", value: personal?.insuranceNumber || "N/A" },
    { title: "Visa Status", value: userDetail?.veriffStatus || "N/A" },
  ];

  const Address = [
    { title: "Post Code", value: userDetail?.postCode || "N/A" },
    { title: "Address", value: userDetail?.address || "N/A" },
    { title: "City", value: userDetail?.city || "N/A" },
    { title: "Country", value: userDetail?.country || "N/A" },
  ];

  const AcademicData = [
    { title: "University", value: university?.name || "N/A" },
    { title: "Course", value: general?.course || "N/A" },
    { title: "University Email", value: university?.email || "N/A" },
    { title: "Post Code", value: university?.postCode || "N/A" },
    { title: "Address", value: university?.address || "N/A" },
    { title: "City", value: university?.city || "N/A" },
    { title: "Country", value: university?.country || "N/A" },
    {
      title: "University Contact Name ",
      value:
        general?.userUniversity?.contact?.firstName || general?.userUniversity?.contact?.lastName
          ? `${general?.userUniversity?.contact?.firstName ?? ""} ${general?.userUniversity?.contact?.lastName ?? ""}`
          : "N/A",
    },
    { title: "Universty Contact Phone", value: university?.phoneNumber || "N/A" },
    { title: "Internship Start Date", value: dayjs(general?.internshipStartDate).format("DD/MMMM/YYYY") || "N/A" },
    { title: "Internship End Date", value: dayjs(general?.internshipEndDate).format("DD/MMMM/YYYY") || "N/A" },
    { title: "Internship Duration", value: general?.internshipDuration || "N/A" },
  ];

  return (
    <div className="persnol-main">
      <p className="persnol-para mb-4">Personal Details</p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.title}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base title">{item?.title}</h2>
              <p className="m-0 break-all text-sm">{item?.value}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Divider type="horizontal" />
      <div className="personal-heading">
        <p className="persnol-para mb-4">About Me</p>
        <p className="persnol-para-text mt-2 text-sm">{personal?.aboutMe ?? "N/A"}</p>
      </div>
      <Divider type="horizontal" />

      <div className="acedmic-details">
        <p className="persnol-para mb-4">Academic Details</p>

        <Row gutter={[30, 20]}>
          {AcademicData.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.title}>
              <div className="personal-information-wrap ">
                <h2 className="m-0 font-medium text-base title">{item?.title}</h2>
                <p className="m-0 text-sm">{item?.value}</p>
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
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.title}>
              <div className="personal-information-wrap ">
                <h2 className="m-0 font-medium text-base title">{item?.title}</h2>
                <p className="m-0 text-sm">{item?.value}</p>
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
            personal?.hobbies?.map((item: string, index: number) => (
              <div key={index} className="other-item flex items-center gap-5 cursor-pointer">
                <p className="m-0 capitalize text-sm" key={item}>
                  {item}
                </p>
              </div>
            ))
          ) : (
            <span className="text-sm">No</span>
          )}
        </div>
      </div>
      <p className="persnol-para my-4">Allergies</p>
      <div className="flex items-center flex-wrap gap-4 others">
        {personal?.allergies?.length > 0 ? (
          personal?.allergies?.map((item: string, index: number) => (
            <div key={index} className="other-item flex items-center gap-5 cursor-pointer">
              <p className="m-0 capitalize text-sm" key={item}>
                {item}
              </p>
            </div>
          ))
        ) : (
          <span className="text-sm">No</span>
        )}
      </div>
      <div className="medical my-4">
        <p className="persnol-para pt-2">Medical Conditions</p>
        <p className="pt-2 text-sm">{personal?.medicalCondition ?? "No"}</p>
      </div>
      <div className="dependants ">
        <p className="persnol-para">Dependants</p>
        <p className="pt-2 text-sm">{personal?.haveDependents ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};
