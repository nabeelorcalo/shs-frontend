import { useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import { Loader, NoDataFound, SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import "./style.scss";

const OfferLetterStudent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<any>(null)
  const { getOfferLetterList, contractData }: any = useCustomHook();
  const contractList = contractData?.data;
  const [selectArrayData, setSelectArrayData] = useState(contractList)

  useEffect(() => {
    getOfferLetterList(null, search)
  }, [])

  useEffect(() => {
    setSelectArrayData(contractList)
  }, [contractList])

  const signedData = contractList?.filter((item: any) => item?.status === 'SIGNED');
  const rejectData = contractList?.filter((item: any) => item?.status === 'REJECTED');
  const receivedData = contractList?.filter((item: any) => item?.status === 'PENDING' || item?.status === 'NEW');

  const handleSearch = (e: any) => {
    if (e.trim() === '') setSelectArrayData(contractList)
    else {
      const searchedData = selectArrayData?.filter((emp: any) => emp?.receiver?.company?.businessName?.toLowerCase()?.includes(e))
      setSelectArrayData(searchedData)
    }
  }

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
          <SearchBar placeholder="Search By company name" handleChange={handleSearch} />
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 40]}>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {receivedData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => (
                <div key={item.id}>
                  {(item.status === 'NEW' || item.status === 'PENDING') && <ContractCard
                    img={Recevied}
                    title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
                    description={item?.receiver?.company?.businessName}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.RECEIVED_VIEW}`, { state: item })}
                  />}
                </div>
              ))}
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="offer-letter-status ">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {rejectData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => (
                <div key={item.id}>
                  {item.status === 'REJECTED' && <ContractCard
                    img={Rejected}
                    title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
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
              {signedData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => (
                <div key={item.id}>
                  {item.status === 'SIGNED' && <ContractCard
                    img={Signed}
                    title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
                    description={item?.receiver?.company?.businessName}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`, { state: item })}
                  />}
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default OfferLetterStudent;
