import { useEffect, useRef, useState } from "react";
import SearchBarCards from "./searhJobsCards/header/Header";
import SearchJobTabs from "./searhJobsCards/Tabs/Tabs";
import { PageHeader } from "../../components";
import useCustomHook from "./actionHandler";

const SearchJobs = () => {
  const initialVal: any = useRef(true)

  const [drawer, setDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const [tabValue, setTabValue] = useState("all");
  const { getSearchJob } = useCustomHook();

  useEffect(() => {
    if (initialVal.current) {
      initialVal.current = false
      getSearchJob();
    }
  }, []);

  const handleTabChange = (value: string) => {
    getSearchJob(null, null, null, value === "all" ? "" : value);

  }

  const handleChangeSearch = (value: string) => {
    setSearchValue(value)
    if (value === "") {
      getSearchJob()
    }
  }

  const handleSearchBtn = () => {
    getSearchJob(searchValue)
  }
  return (
    <>
      <PageHeader title="Search jobs" />
      <SearchBarCards handleSearchBtn={handleSearchBtn} setDrawer={setDrawer} drawer={drawer} handleChangeSearch={handleChangeSearch} />
      <SearchJobTabs handleTabChange={handleTabChange} />
    </>
  );
};

export default SearchJobs;
