import { useState } from "react";
import { Avatar, Dropdown, Progress, Space, MenuProps } from "antd";
// import all reusable componets from component/index.ts
import {
  PageHeader,
  SearchBar,
  FiltersButton,
  IconButton,
  DropDown,
  Button,
  GlobalTable,
  Breadcrumb,
  Notifications,
} from "../../../components";
import Drawer from "../../../components/Drawer";
// end
import {
  DownlaodFileIcon,
  GlassMagnifier,
  MoreIcon,
  TalentBadge,
  Success,
  SuccessIcon
} from "../../../assets/images";
import "../style.scss";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { AppreciationModal } from "./appreciationModal";
import { WarnModal } from "./warnModel";
import useCustomHook from "../actionHandler";
import { header, tableData } from "./pdfData";
import { Link } from "react-router-dom";

const PerformanceHistory = () => {
  const historyBreadCrumb = [
    { name: constants.USER_ROLE === constants.COMPANY_ADMIN ? 'Performance History' : "View History" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
  ];
  const id = 1;
  const action = useCustomHook();

  const columnNames = [
    {
      title: "No.",
      key: "no",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.no}
        </Link>
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      render: (_: any, data: any) => (
        <Space size="middle">
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
          >
            <Avatar size={32} alt="avatar" src={<img src={data.avatar} />} />
          </Link>
        </Space>
      ),
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.name}
        </Link>
      ),
    },
    {
      title: "Department",
      key: "department",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.department}
        </Link>
      ),
    },
    {
      title: "Last Evaluation",
      key: "date",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.date}
        </Link>
      ),
    },
    {
      title: "Evaluated By",
      key: "evaluatedBy",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.evaluatedBy}
        </Link>
      ),
    },
    {
      title: "Total Evaluations",
      key: "totalEvaluations",
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.totalEvaluations}
        </Link>
      ),
    },
    {
      title: "Overall Performance",
      key: "overallPerformance",
      render: (_: any, data: any) => {
        return (
          <Space size="middle">
            <Link
              className="flex gap-2 bread-crumb"
              to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
            >
              <Progress
                size={[200, 13]}
                percent={data.performance}
                strokeColor={data.performance < 50 ? "#E95060" : "#4A9D77"}
                format={(percent: any) => (
                  <p
                    className={
                      "myClass " +
                      (percent < 50 ? "secondary-color" : "teriary-color")
                    }
                  >
                    {percent}%
                  </p>
                )}
              />
              {data.isBadge ? <TalentBadge /> : ""}
            </Link>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, data: any) => (
        <Space size="middle">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="menus_dropdown_main"
          >
            <MoreIcon
              className="cursor-pointer"
            // onClick={() => setActionType({ ...actionType, id: data.key })}
            />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const evaluationHistoryData = [
    {
      id: 1,
      no: 1,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 40,
      isBadge: true,
    },
    {
      id: 2,
      no: 2,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 80,
      isBadge: false,
    },
    {
      id: 3,
      no: 3,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 50,
      isBadge: true,
    },
    {
      id: 4,
      no: 4,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 30,
      isBadge: false,
    },
    {
      id: 5,
      no: 5,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 100,
      isBadge: true,
    },
  ];

  const evaluatedByOptions: any = [
    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Maria Sanoid</p>
    </div>,

    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Janete Samson</p>
    </div>,

    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Alen Juliet</p>
    </div>,
  ];

  const timeFrameOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const departmentOptions = [
    "Design",
    "Business Analyst",
    "Data Scientist",
    "Product Manager",
    "Developer",
  ];
  let items: MenuProps["items"] = [
    {
      label: (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${constants.USER_ROLE !== constants.UNIVERSITY ?
            ROUTES_CONSTANTS.EVALUATION_FORM : ROUTES_CONSTANTS.DETAIL
            }`}
        >
          View Details
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${ROUTES_CONSTANTS.EVALUATE
            }`}
        >
          Evaluate
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <p
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              openAprreciationModal: !state.openAprreciationModal,
            }));
          }}
        >
          Appreciate
        </p>
      ),
      key: "2",
    },
    {
      label: (
        <p
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              openWarnModal: !state.openWarnModal,
            }));
          }}
        >
          Warn
        </p>
      ),
      key: "3",
    },
  ];
  if (constants.USER_ROLE === constants.UNIVERSITY && items.length > 2) {
    items = items.slice(0, -3)
  }

  const [state, setState] = useState({
    openSidebar: false,
    timeFrameVal: "Select",
    departmentVal: "Select",
    evaluatedByVal: "Select",
    openAprreciationModal: false,
    openWarnModal: false,
  });

  const handleSidebarClick = () => {
    setState((prevState) => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  };

  const downloadClick = () => { };

  const evaluatedBySelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      evaluatedByVal: value,
    }));
  };

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      timeFrameVal: value,
    }));
  };

  const departmentSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      departmentVal: value,
    }));
  };

  const onApplyFilterClick = () => {
    alert("Apply Filter");
  };

  const onResetFilterClick = () => {
    alert("Reset Filter");
  };

  const onSubmitAppreciationForm = (values: any) => {
    console.log("Form Data: ", values);
    setState((prevState) => ({
      ...prevState,
      openAprreciationModal: !state.openAprreciationModal,
    }));
  };

  const onSubmitWarningForm = (values: any) => {
    console.log("Form Data: ", values);
    setState((prevState) => ({
      ...prevState,
      openWarnModal: !state.openWarnModal,
    }));
  };

  return (
    <div className="company-admin-performance-history">
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={historyBreadCrumb} />}
      />

      <div className="flex">
        <div className="w-[33%]">
          <SearchBar
            className=""
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="search"
            size="small"
          />
        </div>

        <div className="flex justify-center ml-auto">
          <FiltersButton label="Filters" onClick={handleSidebarClick} />

          <IconButton
            size="large"
            className="icon-btn"
            onClick={() => {
              action.downloadPdf(header, tableData);
              Notifications({title:"Success", description:"Download Done",type:'success'})
            }}
            icon={<DownlaodFileIcon />}
          />

          <Drawer
            title="Filters"
            open={state.openSidebar}
            onClose={handleSidebarClick}
            children={
              <div className="flex flex-col">
                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Evaluated By</p>
                  <DropDown
                    name="Select"
                    options={evaluatedByOptions}
                    setValue={() => evaluatedBySelection(event)}
                    value={state.evaluatedByVal}
                  />
                </div>

                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    setValue={() => timeFrameSelection(event)}
                    value={state.timeFrameVal}
                    showDatePickerOnVal="Date Range"
                    requireDatePicker
                    placement="topLeft"
                  />
                </div>

                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Department</p>
                  <DropDown
                    name="Select"
                    options={departmentOptions}
                    setValue={() => departmentSelection(event)}
                    value={state.departmentVal}
                  />
                </div>

                <div className="flex ml-auto my-2 gap-2">
                  <Button
                    label="Reset"
                    type="default"
                    onClick={onResetFilterClick}
                    className="border-visible-btn"
                  />

                  <Button
                    label="Apply"
                    onClick={onApplyFilterClick}
                    className="bg-visible-btn"
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className="performace-history-list">
        <GlobalTable
          columns={columnNames}
          tableData={evaluationHistoryData}
          pagination={false}
        />
      </div>

      <AppreciationModal
        open={state.openAprreciationModal}
        title="Appreciation Email"
        initialValues={{
          name: "Mino Marina",
          description: "hello world",
          avatar:
            "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        }}
        onSave={onSubmitAppreciationForm}
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            openAprreciationModal: !state.openAprreciationModal,
          }));
        }}
      />

      <WarnModal
        open={state.openWarnModal}
        title="Alert"
        initialValues={{ description: "hello world" }}
        onIssue={onSubmitWarningForm}
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            openWarnModal: !state.openWarnModal,
          }));
        }}
      />
    </div>
  );
};

export default PerformanceHistory;
