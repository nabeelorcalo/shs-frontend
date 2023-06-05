import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Divider, Row } from "antd";
import { Loader, NoDataFound, SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import Received from "../../contracts/student/received";

const OfferLetterStudent = () => {
  const [search, setSearch] = useState(null)
  const { getOfferLetterList, contractList,loading } = useCustomHook();

  useEffect(() => {
    getOfferLetterList(null, null, search)
  }, [search])

  return (
    <div className="offer-latter-student">
      <Row gutter={[20, 20]}>
        <Col>
          <div className="offer-latter-student-title text-2xl font-semibold">
            Offer Letters
          </div>
        </Col>
        <Divider />
        <Col xl={6} lg={12} md={24} sm={24} xs={24} >
          <SearchBar handleChange={(e: any) => setSearch(e)} />
        </Col>
        {loading ? <Loader /> : <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {contractList.map((item: any) => (
                <div>
                  {item.status === 'PENDING' && <ContractCard
                    img={Recevied}
                    title={item?.title}
                    description={item.content}
                  // onClick={() => navigate(item.path)}
                  />}
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status ">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {contractList.map((item: any) => (
                <div>
                  {item.status === 'REJECTED' && <ContractCard
                    img={Rejected}
                    title={item?.title}
                    description={item.content}
                  // onClick={() => navigate(item.path)}
                  />}
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box teriary-bg-color"></div>
                <div className="status-box-text">Signed</div>
              </div>
              {contractList.map((item: any) => (
                <div>
                  {item.status === 'SIGNED' && <ContractCard
                    img={Signed}
                    title={item?.title}
                    description={item.content}
                  // onClick={() => navigate(item.path)}
                  />}
                </div>
              ))}
            </Col>
          </Row>
        </Col>}
      </Row>
    </div>
  );
};

export default OfferLetterStudent;
