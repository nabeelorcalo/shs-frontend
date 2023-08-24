import { Button, Divider, TabsProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BlowWistle } from "../../../../assets/images";
import {
  DropDown,
  FiltersButton,
  Notifications,
  PageHeader,
  PopUpModal,
  SearchBar,
  BoxWrapper,
  AppTabs,
  Drawer,
  ButtonThemePrimary,
} from "../../../../components";
import Filters from "../../Common/filters";
import useCustomHook from "../actionHandler";
import useGrievanceHook from "../../Manager/actionHandler";
// import BlowWhistleForm from "../blowWhistleForm";
import BlowWhistleForm from "../../Common/blowWhistleForm";
import EscalatedByMe from "./escalatedByMe";
import EscalatedToMe from "./escalatedToMe";
import "./style.scss";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { grievanceFilterState, grievancePaginationState, grievanceTabState } from "../../../../store";

const index = () => {
  const createGrievanceRef = useRef<any>(null);
  const escalatedByMeTableData = [
    {
      no: "01",
      subject: "Attendance Log Issue",
      type: "Others",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "New",
    },
  ];
  const escalatedToMeTableData = [
    {
      no: "01",
      subject: "Attendance Log Issue",
      type: "Others",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "New",
    },
    {
      no: "02",
      subject: "Working conditions",
      type: "Discipline",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "In Progess",
    },
    {
      no: "03",
      subject: "Bullying",
      type: "Personal",
      date: "22/09/2022",
      escalatedTo: "David Miller",
      status: "Re-Opened",
    },
    {
      no: "04",
      subject: "Working Environment",
      type: "Work",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "Resolved",
    },
  ];

  const filtersTab: any = {
    1: "ESCALATEDTOME",
    2: "ESCALATEDBYME",
  };
  const TableColumn1 = ["No.", "Subject", "Type", "Date", "Escalated To", "Status"];
  const TableColumn2 = ["No.", "Subject", "Type", "Date", "Escalated To", "Status"];
  const action = useCustomHook();
  const [selectedTab, setSelectedTab] = useRecoilState<any>(grievanceTabState);
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [tableParams, setTableParams] = useRecoilState(grievancePaginationState);
  const [filter, setFilter] = useRecoilState(grievanceFilterState);
  const { grievanceList, setGrievanceList, getGreviencesList, downloadPdfOrCsv, managersList, getManagerList, createGrievance, grievanceLoading } =
    useGrievanceHook();

  useEffect(() => {
    fetchGrievanceList();
  }, [filter]);
  const downloadPdfCsvData = () => {
    if (!selectedTab) return;
    return grievanceList?.data?.map((grieved: any) => {
      return {
        no: grieved.id,
        subject: grieved.subject,
        type: grieved.type?.toLowerCase(),
        date: dayjs(grieved.createdAt).format("YYYY-MM-DD"),
        escalatedTo: grieved.escalated?.firstName + " " + grieved.escalated?.lastName,
        status: grieved.status?.toLowerCase(),
      };
    });
  };

  const downloadPdfCsvColumn = () => {
    if (selectedTab === "1") {
      return TableColumn1;
    } else if (selectedTab === "2") {
      return TableColumn2;
    } else {
      null;
    }
  };
  const fetchGrievanceList = () => {
    const params: any = removeEmptyValues(filter);
    params["filterTab"] = filtersTab[parseInt(selectedTab)];
    getGreviencesList(params, tableParams, setTableParams);
    getManagerList({});
  };

  const handleChange = (e: any) => {
    setTableParams({ pagination: { ...tableParams.pagination, current: 1 } });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      search: e,
    }));
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };
  const handleTableChange = (pagination: any) => {
    const { current }: any = pagination;

    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  const items: TabsProps["items"] = [
    {
      children: (
        <EscalatedToMe
          escalatedToMeTableData={grievanceList?.data}
          loading={grievanceLoading}
          handleTableChange={handleTableChange}
          pagination={grievanceList?.pagination}
          tableParams={tableParams}
        />
      ),
      key: "1",
      label: "Escalated To Me",
    },
    {
      children: (
        <EscalatedByMe
          escalatedByMeTableData={grievanceList?.data}
          loading={grievanceLoading}
          handleTableChange={handleTableChange}
          pagination={grievanceList?.pagination}
          tableParams={tableParams}
        />
      ),
      key: "2",
      label: "Escalated By Me",
    },
  ];
  return (
    <div className="all-grievance">
      <div className="header">
        <PageHeader title="Grievances" actions bordered />
      </div>
      <div className="flex justify-between">
        <div>
          <SearchBar placeholder="Search by Subject" size="middle" handleChange={handleChange} />
        </div>
        <div className="flex  gap-2">
          <FiltersButton
            label="Filters"
            onClick={() => {
              setShowDrawer(!showDrawer);
            }}
          />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(event, downloadPdfCsvColumn(), downloadPdfCsvData(), "All Grievance", selectedTab);
              Notifications({ title: "Success", description: "Grievance list downloaded ", type: "success" });
            }}
          />
          <ButtonThemePrimary
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </ButtonThemePrimary>
        </div>
      </div>
      <BoxWrapper className="my-5">
        <AppTabs
          activeTab={selectedTab}
          items={items}
          onChange={(selectedTab: any) => {
            setSelectedTab(selectedTab);
            setFilter({ ...filter, filterTab: selectedTab, page: 1 });
            setTableParams({ pagination: { ...tableParams.pagination, current: 1 } });
            setGrievanceList([]);
          }}
        />
      </BoxWrapper>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => {
          if (createGrievanceRef.current) createGrievanceRef.current.handleCancel();
          setShowBlowWhistleModal(false);
        }}
        footer=""
      >
        <BlowWhistleForm
          ref={createGrievanceRef}
          setState={setShowBlowWhistleModal}
          managers={managersList}
          createGrievance={createGrievance}
          fetchGrievanceList={fetchGrievanceList}
        />
      </PopUpModal>
      <Drawer closable={() => setShowDrawer(false)} onClose={() => setShowDrawer(false)} title="Filters" open={showDrawer}>
        <React.Fragment key=".0">
          <Filters managers={managersList} setFilter={setFilter} selectedTab={selectedTab} setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  );
};
export default index;
