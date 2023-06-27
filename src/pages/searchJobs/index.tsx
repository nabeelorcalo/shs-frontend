import { useEffect, useState } from "react";
import SearchBarCards from "./searhJobsCards/header/Header";
import SearchJobTabs from "./searhJobsCards/Tabs/Tabs";
import { PageHeader } from "../../components";
import useCustomHook from "./actionHandler";

const SearchJobs = () => {
  const [drawer, setDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const { getSearchJob, serachJobsDepData } = useCustomHook();

  useEffect(() => {
    fetchData();
  }, [tabValue, searchValue]);
  const fetchData = () => {
    let tabParam = null;
    if (tabValue !== "all") tabParam = tabValue;
    getSearchJob(searchValue, null, null, tabParam);
  };

  return (
    <>
      <PageHeader title="Search jobs" />
      <SearchBarCards setDrawer={setDrawer} drawer={drawer} setSearchValue={setSearchValue} />
      <SearchJobTabs setTabValue={setTabValue} />
    </>
  );
};

export default SearchJobs;
