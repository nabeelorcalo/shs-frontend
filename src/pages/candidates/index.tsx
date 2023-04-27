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
  const [timeFrame, setTimeFrame] = useState('');
  const [internship, setInternship] = useState('');
  const [download, setDownload] = useState('');
  const interShipDropDown = ['UI UX Designer',
    'Business Analyst',
    'Data Scientists',
    'Product Manager',
    'Human Resources']

  return (
    <>
      <PageHeader title="Candidates" />
      <Row gutter={[20, 20]} className="candidate-main">
        <Col  xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e) => { }} />
        </Col>
        <Col  xl={18} lg={15} md={24} sm={24} xs={24} className="flex justify-end gap-4 candidate-right-sec">
          <DropDown name="Time Frame" options={['This Week', 'Last Week', 'This Month', 'Last Month', 'Date Range']}
            showDatePickerOnVal={'Date Range'}
            value={timeFrame}
            setValue={setTimeFrame}
            requireRangePicker
          />
          <DropDown name="Internship"
            options={interShipDropDown}
            value={internship}
            setValue={setInternship}
          />
          <DropDown options={["PDF", "Excel"]} requiredDownloadIcon
            value={download}
            setValue={setDownload}
          />
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