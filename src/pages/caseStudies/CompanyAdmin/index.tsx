import React, { useEffect, useRef, useState } from "react";
import { BoxWrapper, Drawer, DropDown, FiltersButton, Notifications, PageHeader, SearchBar } from "../../../components";
import CaseStudiesTable from "../Common/caseStudiesTable";
import Filters from "../Common/filter";
import useCustomHook from "../actionHandler";
import { Row, Col } from "antd";
import "./style.scss";

const index = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [filterValue, setFilterValue] = useState<any>();
  const { getData, downloadPdfOrCsv, caseStudyData, isLoading } = useCustomHook();
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getData();
    }
  }, []);

  useEffect(() => { }, [caseStudyData]);

  const caseStudyTableData = caseStudyData?.data;

  const TableColumn = [
    "No.",
    "Avatar",
    " Name",
    "Report Name",
    "Department",
    "Assessment Date",
    "Reporting Manager",
    "Status",
  ];
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleChange = (value: any) => {
    getData({ search: value });
  };
  const handleFilter = () => {
    getData(filterValue);
  };

  return (
    <div className="manager-case-studies">
      <PageHeader title="Case Studies" actions bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} placeholder="Search by Report Name" />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <FiltersButton
            label="Filters"
            onClick={() => {
              setShowDrawer(!showDrawer);
            }}
          />
          <DropDown
            requiredDownloadIcon
            options={["PDF", "excel"]}
            setValue={(event: any) => {
              downloadPdfOrCsv(event, TableColumn, caseStudyTableData, "Case Studies");
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <CaseStudiesTable caseStudyTableData={caseStudyData} loading={isLoading} />
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
          <Filters
            setShowDrawer={setShowDrawer}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            handleFilter={handleFilter}
          />
        </React.Fragment>
      </Drawer>
    </div>
  );
};

export default index;
