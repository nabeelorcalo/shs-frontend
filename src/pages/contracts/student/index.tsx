import { Col, Divider, Row } from "antd";
import { SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import { useEffect } from "react";

const contractReceived = [
  {
    id: "1",
    img: Recevied,
    title: "Contract",
    subTitle: "From PowerSource",
    path: "/received",
  },
  {
    id: "2",
    img: Recevied,
    title: "Contract",
    subTitle: "From PowerSource",
    path: "/received",
  },
];

const contractReject = [
  {
    id: "1",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
    path: "/rejected",

  },
  {
    id: "2",
    img: Rejected,
    title: "Contract",
    subTitle: "From PowerSource",
    path: "/rejected",
  },
];

const contractSigned = [
  {
    id: "1",
    img: Signed,
    title: "Contract",
    subTitle: "From PowerSource",
    path: "/signed",

  },
];

const ContractsStudent = () => {

  const { getContractList, contractList } = useCustomHook();
  useEffect(() => {
    getContractList(null, 'THIS_MONTH')
  }, [])

  const handleChange = () => {
    console.log("clicks");
  };

  const navigate = useNavigate();

  return (
    <div className="contract-student">
      <Row gutter={[20, 20]}>
        <Col>
          <div className="contract-student-title text-2xl font-semibold">
            Contracts
          </div>
        </Col>
        <Divider />

        <Col xl={6} lg={12} md={12} sm={24} xs={24}>
          <SearchBar handleChange={handleChange} />
        </Col>

        <Col xs={24}>
          <Row gutter={[20, 40]}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
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
                      onClick={() => navigate(item.path)}
                    />
                  </div>
                );
              })}
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
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
                    onClick={() => navigate(item.path)}
                  />
                );
              })}
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
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
                    onClick={() => navigate(item.path)}
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
