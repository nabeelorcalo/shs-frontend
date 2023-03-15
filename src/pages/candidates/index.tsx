import { Col, Row } from "antd";
import { DropDown, SearchBar } from "../../components";
import "./style.scss";
import CandidateTable from "./candidateTable";

import DetailDrawer from "./viewDetails";
import { useState } from "react";
import RejectModal from "./RejectModal";


const Candidates = () => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  return (
    <>

      <Row gutter={20} className='justify-between flex-wrap'>
        <Col lg={5}>
          <SearchBar size="large" handleChange={(e) => { }} />
        </Col>
        <Col className="flex justify-end gap-2">
          <DropDown name="Time Frame" options={['This Week', 'Last Week', 'This Month', 'Last Month', 'Date Range']}
            showDatePickerOnVal={'Date Range'}
            requireDatePicker placement="bottomLeft" />
          <DropDown name="Internship" options={['UI UX Designer', 'Business Analyst', 'Data Scientists', 'Product Manager', 'Human Resource']} />
          <DropDown options={["pdf", "excel"]} requiredDownloadIcon />
        </Col>
      </Row>
      <CandidateTable setOpenDrawer={setOpenDrawer} setOpenRejectModal={setOpenRejectModal} />
      {openRejectModal && <RejectModal open={openRejectModal} setOpen={setOpenRejectModal} />}

      {openDrawer && <DetailDrawer open={openDrawer} setOpen={setOpenDrawer} />}

    </>
  )
}

export default Candidates