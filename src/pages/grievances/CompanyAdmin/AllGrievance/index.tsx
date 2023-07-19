import { Button, Col, Divider, Row, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { BlowWistle, GrievancesAvater1, GrievancesAvater2, GrievancesAvater3, GrievancesAvater4 } from "../../../../assets/images";
import { Breadcrumb, DropDown, FiltersButton, Drawer, AppTabs, BoxWrapper, PopUpModal, SearchBar, Notifications } from "../../../../components";
import BlowWhistleForm from "../../Common/blowWhistleForm";
import Filters from "../../Common/filters";
import EscalatedByMe from "./escalatedByMe";
import EscalatedToMe from "./escalatedToMe";
import InternGrievances from "./internGrievances";
import ManagerGrievances from "./managerGrievances";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import "./style.scss";
import useCustomHook from "../action.handler";
import useGrievanceHook from "../../Manager/actionHandler";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { grievanceFilterState, grievancePaginationState } from "../../../../store";
// const escalatedToMeTableData = [
//   {
//     no: "01",
//     avater: <GrievancesAvater1 />,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Julie Andrews",
//     status: "New",
//   },
//   {
//     no: "02",
//     avater: <GrievancesAvater2 />,
//     subject: "Working conditions",
//     type: "Discipline",
//     date: "2/09/2022",
//     escalatedBy: "Sean Bean",
//     status: "In Progess",
//   },
//   {
//     no: "03",
//     avater: <GrievancesAvater3 />,
//     subject: "Bullying",
//     type: "Personal",
//     date: "22/09/2022",
//     escalatedBy: "Emma Thompson",
//     status: "Re-Opened",
//   },
//   {
//     no: "04",
//     avater: <GrievancesAvater4 />,
//     subject: "Attendance Log Issue",
//     type: "Work",
//     date: "04/09/2022",
//     escalatedBy: "Robert Carlyle",
//     status: "Resolved",
//   },
// ];
// const EscalatedByMeTableData = [
//   {
//     no: "01",
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedTo: "Maria Sanoid",
//     status: "New",
//   },
//   {
//     no: "02",
//     subject: "Working conditions",
//     type: "Discipline",
//     date: "22/09/2022",
//     escalatedTo: "Zach Levery",
//     status: "In Progess",
//   },
//   {
//     no: "03",
//     subject: "Bullying",
//     type: "Personal",
//     date: "22/09/2022",
//     escalatedTo: "Mino Marina",
//     status: "Re-Opened",
//   },
//   {
//     no: "04",
//     subject: "Work Environment ",
//     type: "Work",
//     date: "22/09/2022",
//     escalatedTo: "Tom Hanks",
//     status: "Resolved",
//   },
// ];
// const internGrievancesTableData = [
//   {
//     no: "01",
//     avater: Image1,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Julie Andrews",
//     escalatedTo: "Maria Sanoid",
//     status: "New",
//   },
//   {
//     no: "02",
//     avater: Image2,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Sean Bean",
//     escalatedTo: "David Miller",
//     status: "In Progess",
//   },
//   {
//     no: "03",
//     avater: Image3,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Emma Thompson",
//     escalatedTo: "Tom Hanks",
//     status: "Re-Opened",
//   },
//   {
//     no: "04",
//     avater: Image4,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedTo: "David Miller",
//     escalatedBy: "Robert Carlyle",
//     status: "Resolved",
//   },
// ];
// const managerGrievancesTableData = [
//   {
//     no: "01",
//     avater: Image1,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Julie Andrews",
//     escalatedTo: "Maria Sanoid",
//     status: "New",
//   },
//   {
//     no: "02",
//     avater: Image2,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Sean Bean",
//     escalatedTo: "David Miller",
//     status: "In Progess",
//   },
//   {
//     no: "03",
//     avater: Image3,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedBy: "Emma Thompson",
//     escalatedTo: "Tom Hanks",
//     status: "Re-Opened",
//   },
//   {
//     no: "04",
//     avater: Image4,
//     subject: "Attendance Log Issue",
//     type: "Others",
//     date: "22/09/2022",
//     escalatedTo: "David Miller",
//     escalatedBy: "Robert Carlyle",
//     status: "Resolved",
//   },
// ];

const index = () => {
  const { grievanceList, setGrievanceList, getGreviencesList, downloadPdfOrCsv, managersList, getManagerList, createGrievance, grievanceLoading } =
    useGrievanceHook();

  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<any>("1");
  const [tableParams, setTableParams] = useRecoilState(grievancePaginationState);
  const [filter, setFilter] = useRecoilState(grievanceFilterState);
  const filtersTab: any = {
    1: "ESCALATEDTOME",
    2: "ESCALATEDBYME",
    3: "INTERN",
    4: "MANAGER",
  };

  const TableColumn1 = ["No.", "Escalated By", "Subject", "Type", "Date", "Status"];
  const TableColumn2 = ["No.", "Subject", "Type", "Date", "Escalated To", "Status"];
  const TableColumn3 = ["No.", "Escalated By", "Subject", "Type", "Date", "Escalated To", "Status"];
  const TableColumn4 = ["No.", "Escalated By", "Subject", "Type", "Date", "Escalated To", "Status"];
  const action = useCustomHook();
  const breadcrumbArray = [{ name: "All Grievances" }, { name: "Grievances", onClickNavigateTo: `/${ROUTES_CONSTANTS.GRIEVANCES}` }];
  const downloadPdfCsvData = () => {
    if (selectedTab === "1") {
      return grievanceList?.data?.map((grieved: any) => {
        return {
          no: grieved.id,
          escalatedBy: grieved?.escalater?.firstName + " " + grieved?.escalater?.lastName,
          subject: grieved.subject,
          type: grieved.type,
          date: dayjs(grieved.createdAt).format("YYYY-MM-DD"),
          status: grieved.status,
        };
      });
    } else if (selectedTab === "2") {
      return grievanceList?.data?.map((grieved: any) => {
        return {
          no: grieved.id,
          subject: grieved.subject,
          type: grieved.type,
          date: dayjs(grieved.createdAt).format("YYYY-MM-DD"),
          escalatedTo: grieved?.escalated?.firstName + " " + grieved.escalated?.lastName,
          status: grieved.status,
        };
      });
    } else {
      return grievanceList?.data?.map((grieved: any) => {
        return {
          no: grieved.id,
          escalatedBy: grieved?.escalater?.firstName + " " + grieved?.escalater?.lastName,
          subject: grieved.subject,
          type: grieved.type,
          date: dayjs(grieved.createdAt).format("YYYY-MM-DD"),
          escalatedTo: grieved?.escalated?.firstName + " " + grieved.escalated?.lastName,
          status: grieved.status,
        };
      });
    }
  };

  const downloadPdfCsvColumn = () => {
    if (selectedTab === "1") {
      return TableColumn1;
    } else if (selectedTab === "2") {
      return TableColumn2;
    } else if (selectedTab === "3") {
      return TableColumn3;
    } else if (selectedTab === "4") {
      return TableColumn4;
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
  useEffect(() => {
    fetchGrievanceList();
  }, [filter]);

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
          EscalatedByMeTableData={grievanceList?.data}
          loading={grievanceLoading}
          handleTableChange={handleTableChange}
          pagination={grievanceList?.pagination}
          tableParams={tableParams}
        />
      ),
      key: "2",
      label: "Escalated By Me",
    },
    {
      children: (
        <InternGrievances
          internGrievancesTableData={grievanceList?.data}
          loading={grievanceLoading}
          handleTableChange={handleTableChange}
          pagination={grievanceList?.pagination}
          tableParams={tableParams}
        />
      ),
      key: "3",
      label: "Intern Grievances",
    },
    {
      children: (
        <ManagerGrievances
          managerGrievancesTableData={grievanceList?.data}
          loading={grievanceLoading}
          handleTableChange={handleTableChange}
          pagination={grievanceList?.pagination}
          tableParams={tableParams}
        />
      ),
      key: "4",
      label: "Manager Grievances",
    },
  ];
  return (
    <div className="all-grievance">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
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
          <div>
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event, downloadPdfCsvColumn(), downloadPdfCsvData(), "All Grievance", selectedTab);
                Notifications({ title: "Success", description: "Grievance list downloaded ", type: "success" });
              }}
            />
          </div>
        </Col>
      </Row>

      <BoxWrapper className="my-5">
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
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => {
          setShowBlowWhistleModal(false);
        }}
        footer=""
      >
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
