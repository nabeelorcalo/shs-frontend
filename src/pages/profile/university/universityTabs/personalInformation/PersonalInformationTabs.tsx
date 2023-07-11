import { useEffect, useState } from 'react'
import { Col, Divider, Row } from 'antd'
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { studentProfileState } from '../../../../../store';
import useCustomHook from '../../../actionHandler';
import { useParams } from 'react-router-dom';

const Other = ["surfing", "reading", "sketching", "video games", "movies", "travelling"];
const allergie = ["pollen Allergy", "peanuts allergy"];

const PersonalInformationTabs = () => {
  let params = useParams()
  const action = useCustomHook();
  const personalInformation = useRecoilState<any>(studentProfileState);

  useEffect(() => {
    action.getStudentProfile(params?.id);
  }, [])

  const PersnolInformationData = [
    { title: "First name", value: personalInformation[0]?.personalInfo?.firstName },
    { title: "Last Name", value: personalInformation[0]?.personalInfo?.lastName },
    { title: "Gender", value: personalInformation[0]?.personalInfo?.gender?.toLowerCase() },
    { title: "Date of Birth", value: dayjs(personalInformation[0]?.personalInfo?.DOB).format("DD MMMM, YYYY") },
    { title: "Place of Birth", value: personalInformation[0]?.personalInfo?.birthPlace },
    { title: "Nationality", value: personalInformation[0]?.personalInfo?.country?.toLowerCase() },
    { title: "Personal Email", value: personalInformation[0]?.personalInfo?.personalEmail },
    { title: "Phone Number", value: personalInformation[0]?.personalInfo?.phoneNumber },
    { title: "National Insurance Number", value: personalInformation[0]?.personalInfo?.insuranceNumber },
    { title: "Visa Status", value: personalInformation[0]?.personalInfo?.visaStatus },
  ];

  const Address = [
    { title: "Post Code", value: personalInformation[0]?.personalInfo?.postCode },
    { title: "Address", value: personalInformation[0]?.personalInfo?.address },
    { title: "City", value: personalInformation[0]?.personalInfo?.city },
    { title: "Country", value: personalInformation[0]?.personalInfo?.country },
  ];

  const workDetails = [
    { title: "Title", value: personalInformation[0]?.personalInfo?.work },
    { title: "Department", value: personalInformation[0]?.personalInfo?.department?.name },
    { title: "Work Email", value: personalInformation[0]?.personalInfo?.email ? personalInformation[0]?.personalInfo?.email : "N/A" },
    { title: "Hiring Date", value: dayjs(personalInformation[0]?.personalInfo?.updatedAt).format('DD/MM/YYYY') },
  ];
  const dependants = [
    { title: "Name", Value: personalInformation[0]?.personalInfo?.dependents[0]?.name },
    { title: "Relationship", Value: personalInformation[0]?.personalInfo?.dependents[0]?.relationship },
    { title: "Date of Birth", Value: personalInformation[0]?.personalInfo?.dependents[0]?.DOB },
  ]

  const [others, setOthers] = useState(Other);
  const [allergies, setAllergies] = useState(allergie);

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
            {personalInformation[0]?.personalInfo?.aboutMe}
          </p>
        </div>
        <Divider type="horizontal" />
        <div className="acedmic-details">
          <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">Work Details</p>
          <Row gutter={[30, 20]}>
            {workDetails.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.id}>
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
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.id}>
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
            {personalInformation[0]?.personalInfo?.hobbies.length > 0 ? (
              personalInformation[0]?.personalInfo?.hobbies?.map((item: string) => (
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
          {personalInformation[0]?.personalInfo?.allergies?.length > 0 ? (
            personalInformation[0]?.personalInfo?.allergies?.map((item: string) => (
              <div className="other-item flex items-center gap-5 cursor-pointer">
                <p className="m-0 capitalize" key={item}>
                  {item}
                </p>
                <CloseOutlined
                  className="other-icon"
                  onClick={() => setAllergies(allergies?.filter((val: string) => val !== item))}
                />
              </div>
            ))
          ) : (
            <span>No Data Found...</span>
          )}
        </div>
        <div className="medical my-4">
          <p className="font-medium text-base text-primary-color title pt-2">Medical Conditions</p>
          <p className="pt-2 text-lg text-teriary-color">{personalInformation[0]?.personalInfo?.medicalCondition}</p>
        </div>
        <div className="dependants ">
          <p className="font-medium text-base text-primary-color mb-3">Dependants</p>
          <Row gutter={[30, 20]}>
            {dependants?.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                <div className="personal-information-wrap ">
                  <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
                  <p className="m-0 text-lg text-teriary-color">{item?.Value}</p>
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