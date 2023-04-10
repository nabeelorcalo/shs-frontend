import { useState } from "react";
import { Col, Row } from "antd";
import { DropDown, PageHeader, SearchBar } from "../../components";
import CandidateTable from "./candidateTable";
import DetailDrawer from "./viewDetails";
import RejectModal from "./RejectModal";

import "./style.scss";

const Candidates = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  return (
    <>
    <PageHeader title="Candidates"/>
      <Row gutter={[20,20]} className="candidate-main">
        <Col xxl={6} xl={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e) => { }} />
        </Col>
        <Col xxl={18} xl={18} md={24} sm={24} xs={24} className="flex justify-end gap-4 candidate-right-sec">
          <DropDown name="Time Frame" options={['This Week', 'Last Week', 'This Month', 'Last Month', 'Date Range']}
            showDatePickerOnVal={'Date Range'}
            requireDatePicker placement="bottomLeft" />
          <DropDown name="Internship" options={['UI UX Designer', 'Business Analyst', 'Data Scientists', 'Product Manager', 'Human Resource']} />
          <DropDown options={["pdf", "excel"]} requiredDownloadIcon />
        </Col>
        <Col xs={24}>
          <CandidateTable setOpenDrawer={setOpenDrawer} setOpenRejectModal={setOpenRejectModal} />
        </Col>
      </Row>
      {openRejectModal && <RejectModal open={openRejectModal} setOpen={setOpenRejectModal} />}
      {openDrawer && <DetailDrawer open={openDrawer} setOpen={setOpenDrawer} />}
    </>
  )
}

export default Candidates