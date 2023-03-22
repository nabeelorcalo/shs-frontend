import "./style.scss";
import { Col, Divider, Row } from "antd";
import { SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";

const contractReceived = [
  {
    id: "1",
    img: Recevied,
    title: "Contract",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Recevied,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const contractReject = [
  {
    id: "1",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
  },
  {
    id: "2",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const contractSigned = [
  {
    id: "1",
    img: Signed,
    title: "Contract",
    subTitle: "From PowerSource",
  },
];

const ContractsStudent = () => {
  const handleChange = () => {
    console.log("clicks");
  };

  return (
    <div className="contract-student">
      <Row gutter={[10, 10]}>
        <Col>
          <div className="contract-student-title text-2xl font-semibold">
            Contracts
          </div>
        </Col>
        <Divider />

        <Col className="mb-6" xxl={6} xl={12} lg={12} md={24} sm={24} xs={24}>
          <SearchBar size="large" handleChange={handleChange} />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {contractReceived.map((item) => {
                return (
                  <div>
                    <ContractCard
                      img={item.img}
                      title={item.title}
                      description={item.subTitle}
                    />
                  </div>
                );
              })}
            </Col>

            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {contractReject.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>

            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box teriary-bg-color"></div>
                <div className="status-box-text">Signed</div>
              </div>
              {contractSigned.map((item) => {
                return (
                  <ContractCard
                    img={item.img}
                    title={item.title}
                    description={item.subTitle}
                  />
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContractsStudent;
