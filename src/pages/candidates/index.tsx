import { useEffect, useRef, useState } from "react";
import { Col, Row, Select } from "antd";
import { DropDown, PageHeader, SearchBar } from "../../components";
import CandidateTable from "./candidateTable";
import actionHandler from "./actionHandler";
import "./style.scss";
import dayjs from "dayjs";
const Candidates = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [tableColumn, setTableColumn] = useState<any>([]);
  const {
    params,
    cadidatesList,
    handleSearch,
    getCadidatesData,
    timeFrame,
    handleTimeFrameFilter,
    internship,
    handleInternShipFilter,
    download,
    getInternShipList,
    internShipList,
    downloadPdfOrCsv,
  } = actionHandler();

  const handleDownLoad = (event: string) => {
    downloadPdfOrCsv(
      event,
      tableColumn?.filter(({ title }: any) => title !== "Actions")?.map(({ title }: any) => title),
      data,
      "Candidates"
    );
  };

  // modifying table data according to tale keys
  const data = cadidatesList?.data?.map((item: any, index: number) => ({
    id: item?.id,
    no: index + 1,
    avatar: item?.userDetail?.avatar,
    name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
    internship: item?.internship?.title ?? "",
    type: item?.internship?.departmentData?.name ?? "",
    appliedDate: dayjs(item?.createdAt).format("DD/MM/YYYY"),
    rating: item?.rating ?? 0,
    stage: item?.stage,
  }));

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getCadidatesData(params);
      getInternShipList();
    }
  }, []);

  return (
    <>
      <PageHeader title="Candidates" bordered={true} />
      <Row gutter={[20, 30]} className="candidate-main">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleSearch} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4 candidate-right-sec">
          <DropDown
            name="Time Frame"
            options={["All", "This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
            showDatePickerOnVal={"Date Range"}
            value={timeFrame}
            setValue={handleTimeFrameFilter}
            requireRangePicker
          />
          <Select
            value={internship}
            placeholder="Internship"
            className="internship-filter"
            style={{ width: 170 }}
            allowClear
            onChange={handleInternShipFilter}
            options={internShipList}
          />
          <DropDown
            options={["PDF", "Excel"]}
            requiredDownloadIcon
            value={download}
            setValue={(event: string) => handleDownLoad(event)}
          />
        </Col>
        <Col xs={24}>
          <CandidateTable tableData={cadidatesList} setTableColumn={setTableColumn} />
        </Col>
      </Row>
    </>
  );
};

export default Candidates;
