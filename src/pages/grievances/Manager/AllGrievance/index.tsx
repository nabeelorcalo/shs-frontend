import { Button, Col, Divider, Row, TablePaginationConfig, TabsProps } from "antd";
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
import { useRecoilState } from "recoil";
import { grievanceFilterState, grievancePaginationState } from "../../../../store";

const index = () => {
  const { grievanceList, getGreviencesList, downloadPdfOrCsv, managersList, getManagerList, createGrievance, grievanceLoading, setGrievanceList } =
    useCustomHook();
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
  const [tableParams, setTableParams] = useRecoilState(grievancePaginationState);
  const [filter, setFilter] = useRecoilState(grievanceFilterState);

  useEffect(() => {
    fetchGrievanceList();
  }, [filter]);

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };
  const downloadPdfCsvData = () => {
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
  const handleChange = (e: any) => {
    setTableParams({ pagination: { ...tableParams.pagination, current: 1 } });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      search: e,
    }));
  };

  const fetchGrievanceList = () => {
    const params: any = removeEmptyValues(filter);
    params["filterTab"] = filtersTab[parseInt(selectedTab)];
    getGreviencesList(params, tableParams, setTableParams);
    getManagerList({});
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
          escalatedByMe={grievanceList?.data}
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
                setFilter({ ...filter, filterTab: selectedTab, page: 1 });
                setTableParams({ pagination: { ...tableParams.pagination, current: 1 } });
                setGrievanceList([]);
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
          <Filters managers={managersList} setFilter={setFilter} selectedTab={selectedTab} setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  );
};
export default index;
