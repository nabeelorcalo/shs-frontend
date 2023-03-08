import { Col, Row } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { DropDown, SearchBar } from "../../components";
import "./style.scss";

const Candidates = () => {
  return (
    <>
      <div className="flex justify-between align-middle flex-wrap gap-4" style={{ border: "1px solid black" }}>
        <SearchBar size="large" handleChange={(e) => { }} />
        <div className="flex gap-2 align-middle flex-wrap	">
          <DropDown name="sfrggreg" options={['item 1', 'item 2']} value={''} setValue={''} endIcon={''} />
          <DropDown options={['item 1', 'item 2']} />
          <DropDown options={["pdf", "excel"]} requiredDownloadIcon />
        </div>
      </div>

      <Row gutter={20} className='justify-between flex-wrap'>
        <Col lg={4}>
          <SearchBar size="large" handleChange={(e) => { }} />
        </Col>
        <Col className="flex justify-end gap-2">
          <DropDown name="sfrggreg" options={['item 1', 'item 2']} value={''} setValue={''} endIcon={''} />
          <DropDown options={['item 1', 'item 2']} />
          <DropDown options={["pdf", "excel"]} requiredDownloadIcon />
        </Col>
      </Row>
    </>
  )
}

export default Candidates