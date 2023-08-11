import React, { useEffect, useRef, useState } from "react";
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar, Drawer, Notifications } from "../../../components";
import useCustomHook from "../actionHandler";
import UniversityRepReportTable from "./reportTable";
import Filters from "./filter";
import { Col, Row } from "antd";

const index = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { getData, downloadPdfOrCsv, universityReports, isLoading, handleTableChange } = useCustomHook();
  const TableColumn = ["No.", "Avater", " Name", "Department", "Company", "Reviewer"];
  const reportTableData = universityReports?.data;
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getData();
    }
  }, []);
  const handleChange = (value: any) => {
    getData({ search: value });
  };
  const handleDownload = (event: any) => {
    downloadPdfOrCsv(
      event,
      (event === "excel" ?
        (TableColumn?.filter((ele: any) => ele !== "Avater")) :
        TableColumn),
      reportTableData?.map((
        { no, avatar, company, department, firstName, lastName, reviewer }: any) => ({
          no,
          avatar,
          name: `${firstName} ${lastName}`,
          department,
          company,
          reviewer
        })), "Report");
  }
  return (
    <div>
      <PageHeader title="Report" actions bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <FiltersButton
            label="Filter"
            onClick={() => {
              setShowDrawer(!showDrawer);
            }}
          />
          <DropDown
            requiredDownloadIcon
            options={["PDF", "excel"]}
            setValue={(event: any) => {
              handleDownload(event)
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityRepReportTable
              reportTableData={universityReports}
              isLoading={isLoading}
              handleTableChange={handleTableChange}
            />
          </BoxWrapper>
        </Col>
      </Row>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  );
};

export default index;
