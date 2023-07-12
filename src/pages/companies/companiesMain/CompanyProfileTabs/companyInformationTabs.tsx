import { Row, Col, Divider } from "antd";

const CompanyInformationTabs = (props: any) => {
  const { data } = props;
  const { businessType, registrationNumber, businessSector, country, website,
    ownerName, ownerRole, address, postCode, ownerAddress, city } = data;

  const PersnolInformationData = [
    { title: "Business Type", value: businessType ?? "N/A" },
    { title: "Business Name", value: businessType ?? "N/A" },
    { title: "Company Registration Number", value: registrationNumber ?? "N/A" },
    { title: "Business Sector", value: businessSector ?? "N/A" },
    { title: "Country", value: country ?? "N/A" },
    { title: "Website", value: website ?? "N/A" },
  ];
  const OwnerDetails = [
    { title: "Name", value: ownerName ?? "N/A" },
    { title: "Role", value: ownerRole ?? "N/A" },
    { title: "Correspondence Address", value: address ?? "N/A" },
  ];
  const Address = [
    { title: "Post Code", value: postCode ?? "N/A" },
    { title: "Address", value: ownerAddress ?? "N/A" },
    { title: "City", value: city ?? "N/A" },
    { title: "Country", value: country ?? "N/A" },
  ];
  return (
    <div className='h-[80vh] '>
      <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Business information</p>
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
      <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Owner Details</p>
      <Row gutter={[30, 20]}>
        {OwnerDetails?.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base text-primary-color title">{item?.title}</h2>
              <p className="m-0 text-lg text-teriary-color ">{item?.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider />
      <p className="persnol-para font-semibold text-primary-color text-xl mb-4">Address</p>
      <Row gutter={[30, 20]}>
        {Address?.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className="personal-information-wrap">
              <h2 className="m-0 font-medium text-base text-primary-color title">{item.title}</h2>
              <p className="m-0 text-lg text-teriary-color ">{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider />
      <div className="personal-heading">
        <p className="persnol-para mb-4 font-semibold text-primary-color text-xl">About Us</p>
        <p className="persnol-para-text text-lg text-teriary-color mt-2">
          I'm Maria Sanoid, and I know I can help your company create stunning visuals. As someone who has studied in
          marketing and graphic design for last four years, I understand what brands need to capture their audiences'
          attention. With my intuitive design skills and knack for marketing, I have the right background for your
          company's needs. While marketing and graphic design are my two passions, I also enjoy surfing, doing
          crosswords and exploring the world. I am insanely curious about different cultures, so you'll also find my
          nose buried in a book or travel blog.
        </p>
      </div>
    </div >
  )
}

export default CompanyInformationTabs