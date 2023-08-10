import { Col, Divider, Row } from "antd";
import { Loader, NoDataFound, SearchBar } from "../../../components";
import { ContractCard } from "../../../components/ContractAndOfferLetterrCard";
import { Rejected, Recevied, Signed } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import { useEffect, useState } from "react";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { contractFilterState, contractPaginationState } from "../../../store";

const ContractsStudent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useRecoilState(contractFilterState);
  const { getContractList, contractData }: any = useCustomHook();
  const contractList = contractData?.data;
  const [selectArrayData, setSelectArrayData] = useState(contractList)
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getContractList(args, setLoading)
  }, [])

  useEffect(() => {
    setSelectArrayData(contractList)
  }, [contractList])

  const signedData = contractList?.filter((item: any) => item?.status === 'SIGNED');
  const rejectData = contractList?.filter((item: any) => item?.status === 'REJECTED' || item?.status === 'CHANGEREQUEST');
  const receivedData = contractList?.filter((item: any) => item?.status === 'PENDING' || item?.status === 'NEW');

  const handleSearch = (e: any) => {
    if (e.trim() === '') setSelectArrayData(contractList)
    else {
      const searchedData = contractList?.filter((emp: any) => emp?.receiver?.company?.businessName?.toLowerCase()?.includes(e)
      )
      setSelectArrayData(searchedData)
    }
  }

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
          <SearchBar
            placeholder="Search By company Name"
            handleChange={handleSearch}
          />
        </Col>

        <Col xs={24}>
          <Row gutter={[20, 40]}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box bg-[#FFC15E]"></div>
                <div className="status-box-text">Received</div>
              </div>
              {receivedData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => (
                <div key={item.id}>
                  {(item.status === 'NEW' || item.status === 'PENDING') && <ContractCard
                    img={Recevied}
                    title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
                    description={item?.receiver ? item?.receiver?.company?.businessName
                      :
                      `${item.user?.firstName} ${item.user?.lastName}`}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.RECEIVED_VIEW}`, { state: item })}
                  />}
                </div>
              ))}
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box bg-[#E94E5D]"></div>
                <div className="status-box-text">Rejected</div>
              </div>
              {rejectData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => {
                return (
                  <div key={item.id}>
                    {(item.status === 'REJECTED' || item.status === 'CHANGEREQUEST') && <ContractCard
                      img={Rejected}
                      title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
                      description={item?.receiver ? item?.receiver?.company?.businessName
                        :
                        `${item.user?.firstName} ${item.user?.lastName}`}
                      onClick={() => navigate(`/${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`, { state: item })}
                    />}
                  </div>
                );
              })}
            </Col>

            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contract-status">
                <div className="status-box teriary-bg-color"></div>
                <div className="status-box-text">Signed</div>
              </div>
              {signedData?.length === 0 && <NoDataFound />}
              {selectArrayData?.map((item: any) => {
                return (
                  <div key={item.id}>{item.status === 'SIGNED' && <ContractCard
                    img={Signed}
                    title={<span className="capitalize ">{item?.type?.toLowerCase()?.replace("_", " ")}</span>}
                    description={item?.receiver ? item?.receiver?.company?.businessName
                      :
                      `${item.user?.firstName} ${item.user?.lastName}`}
                    onClick={() => navigate(`/${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`, { state: item })}
                  />}</div>
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
