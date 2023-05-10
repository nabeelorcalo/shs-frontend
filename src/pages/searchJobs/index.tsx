import { useState } from "react";
import SearchBarCards from "./searhJobsCards/header/Header";
import SearchJobTabs from "./searhJobsCards/Tabs/Tabs";
import { PageHeader } from "../../components";

const SearchJobs = () => {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <PageHeader title="Search jobs"/>
      <SearchBarCards setDrawer={setDrawer} drawer={drawer} />
      <SearchJobTabs />
    </>
  );
};

export default SearchJobs;
