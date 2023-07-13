import dayjs from "dayjs";
import { Col, Row, Divider } from 'antd';

const CompanyProfileTabs = (props: any) => {

  const { data } = props;
  const { ownerName, postCode, ownerAddress, country, DOB, gender, email, phoneNumber, city } = data;

  const PersnolInformationData = [
    { title: "First Name", value: ownerName ?? "N/A" },
    { title: "Last Name", value: ownerName ?? "N/A" },
    { title: "Gender", value: gender ?? "N/A" },
    { title: "Date of Birth", value: dayjs(DOB).format("DD MMMM, YYYY") ?? "N/A" },
    { title: "Personal Email", value: email ?? "N/A" },
    { title: "Phone Number", value: phoneNumber ?? "N/A" },
  ];
  const Address = [
    { title: "Post Code", value: postCode ?? "N/A" },
    { title: "Address", value: ownerAddress ?? "N/A" },
    { title: "City", value: city ?? "N/A" },
    { title: "Country", value: country ?? "N/A" },
  ];
  return (
    <div>
      <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Personal Details</p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData?.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
              <p className="m-0 text-lg text-teriary-color ">{item?.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider />
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
    </div>
  )
}

export default CompanyProfileTabs