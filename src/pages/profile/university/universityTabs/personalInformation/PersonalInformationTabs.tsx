import { Col, Divider, Row } from 'antd'
import dayjs from 'dayjs';

const PersonalInformationTabs = (props: any) => {
  const { info } = props;

  const { firstName, lastName, gender, DOB, birthPlace, nationality,
    email, phoneNumber, insuranceNumber, visaStatus, postCode, address,
    city, country, Hiring, Department, title, relationship, name, aboutMe } = info;

  const PersnolInformationData = [
    { title: "First name", value: firstName },
    { title: "Last Name", value: lastName },
    { title: "Gender", value: gender !== "" ? gender : "N/A" },
    { title: "Date of Birth", value: DOB === "Invalid Date" ? "N/A" : DOB },
    { title: "Place of Birth", value: birthPlace ?? "N/A" },
    { title: "Nationality", value: nationality ?? "N/A" },
    { title: "Personal Email", value: email ?? "N/A" },
    { title: "Phone Number", value: phoneNumber ?? "N/A" },
    { title: "National Insurance Number", value: insuranceNumber ?? "N/A" },
    { title: "Visa Status", value: visaStatus ?? "N/A" },
  ];

  const Address = [
    { title: "Post Code", value: postCode ?? "N/A" },
    { title: "Address", value: address ?? "N/A" },
    { title: "City", value: city ?? "N/A" },
    { title: "Country", value: country ?? "N/A" },
  ];

  const workDetails = [
    { title: "Title", value: title ?? "N/A" },
    { title: "Department", value: Department ?? "N/A" },
    { title: "Work Email", value: email ?? "N/A" },
    { title: "Hiring Date", value: dayjs(Hiring).format('DD/MM/YYYY') ?? "N/A" },
  ];

  const dependants = [
    { title: "Name", value: name ?? "N/A" },
    { title: "Relationship", value: relationship ?? "N/A" },
    { title: "Date of Birth", value: DOB ?? "N/A" },
  ]

  return (
    <div>
      <div className="persnol-main">
        <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Personal Details</p>
        <Row gutter={[30, 20]}>
          {PersnolInformationData?.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.id}>
              <div className="personal-information-wrap">
                <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
                <p className="m-0 text-lg text-teriary-color capitalize break-words">{item?.value}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Divider type="horizontal" />
        <div className="personal-heading">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">About Me</p>
          <p className="persnol-para-text text-lg text-teriary-color mt-2">
            {aboutMe}
          </p>
        </div>
        <Divider type="horizontal" />
        <div className="acedmic-details">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">Work Details</p>
          <Row gutter={[30, 20]}>
            {workDetails?.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                <div className="personal-information-wrap ">
                  <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
                  <p className="m-0  text-lg text-teriary-color">{item?.value}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Divider type="horizontal" />
        <div className="acedmic-details">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">Address</p>
          <Row gutter={[30, 20]}>
            {Address?.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                <div className="personal-information-wrap ">
                  <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
                  <p className="m-0 text-lg text-teriary-color">{item?.value}</p>
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
            {info?.hobbies?.length > 0 ? (
              info?.hobbies?.map((item: string) => (
                <div className="other-item flex items-center gap-5 cursor-pointer">
                  <p className="m-0 capitalize" key={item}>
                    {item}
                  </p>
                  {/* <CloseOutlined
                    className="other-icon"
                    onClick={() => setOthers(others.filter((val: string) => val !== item))}
                  /> */}
                </div>
              ))
            ) : (
              <span>No Data Found...</span>
            )}
          </div>
        </div>
        <p className="font-medium text-base text-primary-color my-4">Allergies</p>
        <div className="flex items-center flex-wrap gap-4 others">
          {info?.allergies?.length > 0 ? (
            info?.allergies?.map((item: string) => (
              <div className="other-item flex items-center gap-5 cursor-pointer">
                <p className="m-0 capitalize" key={item}>
                  {item}
                </p>
                {/* <CloseOutlined
                  className="other-icon"
                  onClick={() => setAllergies(allergies.filter((val: string) => val !== item))}
                /> */}
              </div>
            ))
          ) : (
            <span>No Data Found...</span>
          )}
        </div>
        <div className="medical my-4">
          <p className="font-medium text-base text-primary-color title pt-2">Medical Conditions</p>
          <p className="pt-2 text-lg text-teriary-color">
            {info?.medicalCondition}
          </p>
        </div>
        <div className="dependants ">
          <p className="font-medium text-base text-primary-color mb-3">Dependants</p>
          <Row gutter={[30, 20]}>
            {dependants?.map((item: any) => (
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
    </div>
  )
}

export default PersonalInformationTabs