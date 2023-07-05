import { useEffect, useState } from "react";
import "./style.scss";
import { Col, Divider, Row } from "antd";
import { Loader, NoDataFound, SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const OfferLetterStudent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<any>(null)
  const { getOfferLetterList, contractList, loading } = useCustomHook();
  const status = {
    received: 'RECEIVED',
    rejected: 'REJECTED',
    signed: 'SIGNED'
  }

  useEffect(() => {
    getOfferLetterList(null, search)
  }, [search])

  const signedData = contractList?.filter((item: any) => item?.status === status.signed);
  const rejectData = contractList?.filter((item: any) => item?.status === status.rejected);
  const receivedData = contractList?.filter((item: any) => item?.status === status.received);

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
          <SearchBar placeholder="Search By Title" handleChange={(e: any) => setSearch(e)} />
        </Col>
        {loading ? <Loader /> : <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {receivedData.length === 0 && <NoDataFound />}
              {contractList?.map((item: any) => (
                <div>
                  {item.status === 'RECEIVED' && <ContractCard
                    img={Recevied}
                    title={item?.type}
                    description={item?.receiver?.company?.businessName}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: item })}
                  />}
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status ">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {rejectData.length === 0 && <NoDataFound />}
              {contractList.map((item: any) => (
                <div>
                  {item.status === 'REJECTED' && <ContractCard
                    img={Rejected}
                    title={item?.type}
                    description={item?.receiver?.company?.businessName}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`, { state: item })}
                  />
                  }
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box teriary-bg-color"></div>
                <div className="status-box-text">Signed</div>
              </div>
              {signedData.length === 0 && <NoDataFound />}
              {contractList.map((item: any) => (
                <div>
                  {item.status === 'SIGNED' && <ContractCard
                    img={Signed}
                    title={item?.type}
                    description={item?.receiver?.company?.businessName}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: item })}
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
