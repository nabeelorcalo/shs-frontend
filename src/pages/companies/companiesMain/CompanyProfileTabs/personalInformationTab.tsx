import dayjs from "dayjs";
import { Col, Row, Divider } from 'antd';

const CompanyProfileTabs = (props: any) => {

  const { data } = props
    
  const PersnolInformationData = [
    { title: "First Name", value: data?.user?.firstName },
    { title: "Last Name", value: data?.user?.lastName },
    { title: "Gender", value: data?.user?.gender },
    { title: "Date of Birth", value: dayjs(data?.DOB).format("DD MMMM, YYYY") },
    { title: "Personal Email", value: data?.user?.email },
    { title: "Phone Number", value: data?.user?.phoneNumber },
  ];
  const Address = [
    { title: "Post Code", value:data?.user?.postCode },
    { title: "Address", value: data?.user?.address },
    { title: "City", value: data?.user?.city },
    { title: "Country", value: data?.user?.country },
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