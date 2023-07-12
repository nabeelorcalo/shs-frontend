import React, { useEffect, useRef, useState } from "react";
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar, Drawer, Notifications } from "../../../components";
import useCustomHook from "../actionHandler";
import UniversityRepReportTable from "./reportTable";
import Filters from "./filter";
import { Col, Row } from "antd";

const index = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { getData, downloadPdfOrCsv, universityReports, isLoading } = useCustomHook();
  const TableColumn = ["No.", "Avater", " Name", "Department", "Company", "Reviewer"];
  const reportTableData = universityReports?.data;
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  // const [value, setValue] = useState<any>()
  // const [selectedTab, setSelectedTab] = useState<any>(1)
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getData();
    }
  }, []);
  const handleChange = (value: any) => {
    getData({ search: value });
  };
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
            options={["pdf", "excel"]}
            setValue={() => {
              downloadPdfOrCsv(event, TableColumn, reportTableData, "Report");
              Notifications({ title: "Success", description: "Report list downloaded ", type: "success" });
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityRepReportTable reportTableData={reportTableData} isLoading={isLoading} />
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
          <Filters />
        </React.Fragment>
      </Drawer>
    </div>
  );
};

export default index;
