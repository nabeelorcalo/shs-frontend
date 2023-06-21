import { Button, Divider, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { BlowWistle } from "../../../../assets/images";
import { DropDown, FiltersButton, Notifications, PageHeader, PopUpModal, SearchBar } from "../../../../components";
import { BoxWrapper } from "../../../../components";
import Drawer from "../../../../components/Drawer";
import AppTabs from "../../../../components/Tabs";
import Filters from "../../Common/filters";
import useCustomHook from "../actionHandler";
import useGrievanceHook from "../../Manager/actionHandler";
// import BlowWhistleForm from "../blowWhistleForm";
import BlowWhistleForm from "../../Common/blowWhistleForm";
import EscalatedByMe from "./escalatedByMe";
import EscalatedToMe from "./escalatedToMe";
import "./style.scss";
import dayjs from "dayjs";

const index = () => {
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
  const [selectedTab, setSelectedTab] = useState<any>("1");
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const {
    grievanceList,
    getGreviencesList,
    downloadPdfOrCsv,
    managersList,
    getManagerList,
    createGrievance,
    grievanceLoading,
  } = useGrievanceHook();
  const items: TabsProps["items"] = [
    {
      children: <EscalatedToMe escalatedToMeTableData={grievanceList} loading={grievanceLoading} />,
      key: "1",
      label: "Escalated To Me",
    },
    {
      children: <EscalatedByMe escalatedByMeTableData={grievanceList} loading={grievanceLoading} />,
      key: "2",
      label: "Escalated By Me",
    },
  ];
  const downloadPdfCsvData = () => {
    if (!selectedTab) return;
    return grievanceList.map((grieved: any) => {
      return {
        no: grieved.id,
        subject: grieved.subject,
        type: grieved.type,
        date: dayjs(grieved.createdAt).format("YYYY-MM-DD"),
        escalatedTo: grieved.escalated?.firstName + " " + grieved.escalated?.lastName,
        status: grieved.status,
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
    const params: any = {};
    params["filterTab"] = filtersTab[parseInt(selectedTab)];
    if (search) params["search"] = search;
    getGreviencesList(params);
    getManagerList({});
  };
  useEffect(() => {
    fetchGrievanceList();
  }, [selectedTab, search]);
  const handleChange = (e: any) => {
    setSearch(e);
  };
  return (
    <div className="all-grievance">
      <div className="header">
        <PageHeader title="Grievances" actions bordered />
      </div>
      <div className="flex justify-between">
        <div>
          <SearchBar size="middle" handleChange={handleChange} />
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
              action.downloadPdfOrCsv(
                event,
                downloadPdfCsvColumn(),
                downloadPdfCsvData(),
                "All Grievance",
                selectedTab
              );
              Notifications({ title: "Success", description: "Grievance list downloaded ", type: "success" });
            }}
          />
          <Button
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </Button>
        </div>
      </div>
      <BoxWrapper className="my-5">
        <AppTabs
          items={items}
          onChange={(selectedTab: any) => {
            setSelectedTab(selectedTab);
          }}
        />
      </BoxWrapper>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => setShowBlowWhistleModal(false)}
        footer=""
      >
        <BlowWhistleForm setState={setShowBlowWhistleModal} managers={managersList} createGrievance={createGrievance} />
      </PopUpModal>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters managers={managersList} fetchData={getGreviencesList} selectedTab={selectedTab} />
        </React.Fragment>
      </Drawer>
    </div>
  );
};
export default index;
