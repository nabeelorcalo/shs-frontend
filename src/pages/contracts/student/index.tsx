import { Col, Divider, Row } from "antd";
import { Loader, NoDataFound, SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import { useEffect, useState } from "react";
import "./style.scss";


const ContractsStudent = () => {
  const [search, setSearch] = useState<any>(null)
  const { getContractList, contractList, loading } = useCustomHook();

  useEffect(() => {
    getContractList(null, null, search)
  }, [search])

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
          <SearchBar placeholder="Search By Title" handleChange={(e: any) => setSearch(e)} />
        </Col>

        <Col xs={24}>
          {!loading ?
            <Row gutter={[20, 40]}>
              <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="contract-status">
                  <div className="status-box bg-[#FFC15E]"></div>
                  <div className="status-box-text">Received</div>
                </div>
                {contractList.map((item: any) => {
                  console.log("items are", item);
                  return (
                    <div>
                      {item.status === 'RECEIVED' && <ContractCard
                        img={Recevied}
                        title={item?.title}
                        description={item.content}
                      // onClick={() => navigate(item.path)}
                      />}
                    </div>
                  );
                })}
              </Col>

              <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="contract-status">
                  <div className="status-box bg-[#E94E5D]"></div>
                  <div className="status-box-text">Rejected</div>
                </div>
                {contractList.map((item: any) => {
                  return (
                    <div>{item.status === 'REJECTED' && <ContractCard
                      img={Rejected}
                      title={item?.title}
                      description={item.content}
                    // onClick={() => navigate(item.path)}
                    />}</div>
                  );
                })}
              </Col>

              <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="contract-status">
                  <div className="status-box teriary-bg-color"></div>
                  <div className="status-box-text">Signed</div>
                </div>
                {contractList.map((item: any) => {
                  return (
                    <div>{item.status === 'SIGNED' && <ContractCard
                      img={Signed}
                      title={item?.title}
                      description={item.content}
                    // onClick={() => navigate(item.path)}
                    />}</div>
                  );
                })}
              </Col>
            </Row> : contractList.length === 0 ? <NoDataFound /> : <Loader />}
        </Col>
      </Row>
    </div>
  );
};

export default ContractsStudent;
