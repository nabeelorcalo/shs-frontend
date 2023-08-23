import { useEffect, useRef, useState } from "react";
import { Col, Row, Select } from "antd";
import { DropDown, Loader, PageHeader, SearchBar } from "../../components";
import CandidateTable from "./candidateTable";
import actionHandler from "./actionHandler";
import { filterTypes } from "./data";
import "./style.scss";
const Candidates = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [tableColumn, setTableColumn] = useState<any>([]);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
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
    handleDataModification,
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
  const data = handleDataModification(cadidatesList?.data);
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getCadidatesData(params);
      getInternShipList()
    }
  }, []);

  return <>
    <PageHeader title="Candidates" bordered={true} />
    <Row gutter={[20, 30]} className="candidate-main">
      <Col xl={6} lg={9} md={24} sm={24} xs={24}>
        <SearchBar handleChange={handleSearch} placeholder={"Search by name"} />
      </Col>
      <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4 candidate-right-sec">
        <DropDown
          name="Time Frame"
          options={filterTypes}
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
};

export default Candidates;
