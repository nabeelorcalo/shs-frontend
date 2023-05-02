import { useState } from "react";
import { Divider } from "antd";
import SearchBarCards from "./searhJobsCards/header/Header";
import SearchJobTabs from "./searhJobsCards/Tabs/Tabs";

const SearchJobs = () => {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <p className="primary-color font-semibold text-2xl">SearchJobs</p>
      <Divider className="my-7" />
      <SearchBarCards setDrawer={setDrawer} drawer={drawer} />
      <SearchJobTabs />
    </>
  );
};

export default SearchJobs;
