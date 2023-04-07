import { Col, Divider, Row } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchBarCards from "./searhJobsCards/Header";
import SearchJobTabs from "./searhJobsCards/Tabs/Tabs";
import "./style.scss";

const SearchJobs = () => {
  return (
    <>
      <p className="primary-color font-semibold text-2xl">SearchJobs</p>
      <Divider className="my-7" />
      <SearchBarCards />
      <SearchJobTabs />
    </>
  );
};

export default SearchJobs;
