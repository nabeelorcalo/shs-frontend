import { Button, Col, Divider, Row, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { BlowWistle } from "../../../../assets/images";
import { Breadcrumb, AppTabs, DropDown, FiltersButton, Drawer, BoxWrapper, PopUpModal, SearchBar, Notifications } from "../../../../components";
import BlowWhistleForm from "../../Common/blowWhistleForm";
import EscalatedByMe from "./escalatedByMe";
import EscalatedToMe from "./escalatedToMe";
import Filters from "../../Common/filters";
import "./style.scss";
import useCustomHook from "../actionHandler";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import dayjs from "dayjs";

const index = () => {
  const { grievanceList, getGreviencesList, downloadPdfOrCsv, managersList, getManagerList, createGrievance, grievanceLoading } = useCustomHook();
  const escalatedByMe = [
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
      escalatedTo: "Maria Sanoid",
      status: "Re-Opened",
    },
    {
      no: "04",
      subject: "Attendance Log Issue",
      type: "Work",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "Resolved",
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
      escalatedTo: "Maria Sanoid",
      status: "Re-Opened",
    },
    {
      no: "04",
      subject: "Attendance Log Issue",
      type: "work",
      date: "22/09/2022",
      escalatedTo: "Maria Sanoid",
      status: "Resolved",
    },
  ];
  const items: TabsProps["items"] = [
    {
      children: <EscalatedToMe escalatedToMeTableData={grievanceList} loading={grievanceLoading} />,
      key: "1",
      label: "Escalated To Me",
    },
    {
      children: <EscalatedByMe escalatedByMe={grievanceList} loading={grievanceLoading} />,
      key: "2",
      label: "Escalated By Me",
    },
  ];

  const filtersTab: any = {
    1: "ESCALATEDTOME",
    2: "ESCALATEDBYME",
  };

  const breadcrumbArray = [{ name: "All Grievance" }, { name: "Grievances", onClickNavigateTo: `/${ROUTES_CONSTANTS.GRIEVANCES}` }];
  const TableColumn1 = ["No.", "Subject", "Type", "Date", "Escalated To", "Status"];
  const TableColumn2 = ["No.", "Subject", "Type", "Date", "Escalated To", "Status"];
  const [selectedTab, setSelectedTab] = useState<any>("1");
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const downloadPdfCsvData = () => {
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
  const handleChange = (e: any) => {
    setSearch(e);
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
  return (
    <div className="all-grievance">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-row justify-end gap-4">
          <Button
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </Button>
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
              downloadPdfOrCsv(event, downloadPdfCsvColumn(), downloadPdfCsvData(), "All Grievance", selectedTab);
              Notifications({ title: "Success", description: "Grievance list downloaded ", type: "success" });
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <AppTabs
              items={items}
              onChange={(selectedTab: any) => {
                setSelectedTab(selectedTab);
              }}
            />
          </BoxWrapper>
        </Col>
      </Row>

      <PopUpModal open={showBlowWhistleModal} title="Blow a Whistle" width={600} close={() => setShowBlowWhistleModal(false)} footer="">
        <BlowWhistleForm setState={setShowBlowWhistleModal} managers={managersList} createGrievance={createGrievance} />
      </PopUpModal>
      <Drawer closable={() => setShowDrawer(false)} onClose={() => setShowDrawer(false)} title="Filters" open={showDrawer}>
        <React.Fragment key=".0">
          <Filters managers={managersList} fetchData={getGreviencesList} selectedTab={selectedTab} setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  );
};
export default index;
