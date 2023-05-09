import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { DropDown, PageHeader, SearchBar } from "../../components";
import CandidateTable from "./candidateTable";
import DetailDrawer from "./viewDetails";
import RejectModal from "./RejectModal";
import actionHandler from "./actionHandler";
import "./style.scss";
import { interShipDropDown } from "./data";
const Candidates = () => {
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
    setDownload,
  } = actionHandler();

  useEffect(() => {
    getCadidatesData(params);
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
            options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
            showDatePickerOnVal={"Date Range"}
            value={timeFrame}
            setValue={handleTimeFrameFilter}
            requireRangePicker
          />
          <DropDown
            name="Internship"
            options={interShipDropDown}
            value={internship}
            setValue={handleInternShipFilter}
          />
          <DropDown options={["PDF", "Excel"]} requiredDownloadIcon value={download} setValue={setDownload} />
        </Col>
        <Col xs={24}>
          <CandidateTable tableData={cadidatesList} />
        </Col>
      </Row>
    </>
  );
};

export default Candidates;
