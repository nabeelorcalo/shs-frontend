import { useEffect, useState } from "react";
import { Button, Col, Divider, Menu, Row, Select, Space, TabsProps, Tooltip, Avatar } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton, Loader, } from "../../../components";
import AppTabs from "../../../components/Tabs";
import ResolvedData from "./Resolved";
import AllData from "./allData";
import AssignedData from "./AssignedData";
import UnassignedData from "./UnassignedData";
import Drawer from "../../../components/Drawer";
import { AntDesignOutlined, CloseCircleFilled, UserOutlined } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
import useCustomHook from '../actionHandler';
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import PriorityDropDown from "./priorityDropDown/priorityDropDown";
import dayjs from "dayjs";
import "./style.scss";

const tableDataAll = [
  {
    key: "01",
    ID: "01",
    Subject: "Subject kmy cc",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const tableDataUnassigned = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectUnassined",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const tableDataAssigned = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectAssigned",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];


const tableDataResolved = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectResoveld",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const filterData = [
  {
    title: "UserRole",
    userRole: [
      "Company Admin",
      "System Admin",
      "Intern",
      "Student",
      "Manager",
      "Agent"
    ],
  },
];
const priorityOption = [
  {
    key: "1",
    value: "Highest",
  },
  {
    key: "2",
    value: "High",
  },
  {
    key: "3",
    value: "Medium",
  },
  {
    key: "4",
    value: "Low",
  },
];

const drawerAssignToData = [
  {
    id: "1",
    avatar: Avatar,
    name: "David Miller",
    btn: "Add",
  },
  {
    id: "2",
    avatar: Avatar,
    name: "Amelia Clark",
    btn: "Add",
  },
  {
    id: "3",
    avatar: Avatar,
    name: "Maria Sanoid",
    btn: "Add",
  },
  {
    id: "4",
    avatar: Avatar,
    name: "Jessica Alba",
    btn: "Add",
  },
];

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "INPROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
]

const issueTypeOptions = [
  { value: "PAYMENT", label: "Payment" },
  { value: "BUG", label: "Bug" },
  { value: "ISSUE_NAME", label: "Issue Name" },
  { value: "WRONG_INFORMATION", label: "Wrong Information" },
  { value: "OTHER", label: "Other" },
]

const HelpDesk = () => {
  const action = useCustomHook();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<any>({
    id: '1',
  })

  const [activelabel, setactivelabel] = useState<any>({})
  const [state, setState] = useState<any>({
    history: false,
    search: null,
    openModal: false,
    priority: null,
    issueType: null,
    date: null,
    status: null,
    details: null,
    selectedRole: null,
    editStatus: null,
  })

  const csvAllColum = ["ID", "Subject", "Type", "ReportedBy", "Role", "Priority", "Date", "Assigned", "Status"]
  const { getHelpDeskList,
    helpDeskList,
    getHistoryDetail,
    loading,
    viewHelpDeskDetails }: any = useCustomHook();

  useEffect(() => {
    getHelpDeskList(activelabel, state)
  }, [activelabel, state.search])

  const handleHistoryModal = (id: any) => {
    setState({ ...state, history: true })
    getHistoryDetail(id)
  }

  const handleDetailsModal = (item: any) => {
    setState({ ...state, openModal: true, details: item })
    viewHelpDeskDetails(item.id)
  }

  const menu2 = (item: any) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => handleDetailsModal(item)}>
          View Details
        </Menu.Item>
        <Menu.Item key="2">Add Flag</Menu.Item>
        <Menu.Item key="3">Unassign</Menu.Item>
        <Menu.Item key="4" onClick={() => handleHistoryModal(item.id)}>History</Menu.Item>
      </Menu >
    )
  }

  const priorityOptions = [
    { value: "LOW", label: 'Low' },
    { value: "MEDIUM", label: 'Medium' },
    { value: "HIGH", label: 'High' },
    { value: "HIGHEST", label: 'Highest' }
  ]


  const newHelpDeskData = helpDeskList !== 'No Data Found' && helpDeskList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        ID: index + 1,
        Subject: item.subject,
        Type: <span className="capitalize">{item?.type?.toLowerCase()?.replace("_", " ")}</span>,
        ReportedBy: `${item.reportedBy?.firstName} ${item?.reportedBy?.lastName}`,
        Role: <span className="capitalize">{item?.reportedBy?.role?.toLowerCase()}</span>,
        priority: <PriorityDropDown priorityOptions={priorityOption} activeId={item.id} activeValue={item.priority} />,
        Date: dayjs(item.date).format("YYYY-MM-DD"),
        status: <PriorityDropDown priorityOptions={statusOptions} activeId={item.id} activeValue={item.status} show={true} />,
        Assigned: item.assignedUsers?.length > 1 ? <Avatar.Group
          maxCount={1}
          size="small"
          className="flex items-center"
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
        >
          <p className="mr-3">
            {`${item.assignedUsers[0]?.assignedTo.firstName} ${item.assignedUsers[0]?.assignedTo.lastName}`}
          </p>
          {item.assignedUsers?.slice(1)?.map((val: any) => {
            return <Tooltip title="Ant User" placement="top">
              <p>{`${val.assignedTo?.firstName} ${val.assignedTo?.lastName}`}</p>
            </Tooltip>
          })}
        </Avatar.Group>
          :
          `${item?.assignedUsers[0]?.assignedTo.firstName} ${item?.assignedUsers[0]?.assignedTo.lastName}`,
        action: <Space size="middle">
          <CustomDroupDown menu1={menu2(item)} />
        </Space>
      }
    )
  })

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: loading ? <Loader /> : <AllData tableData={newHelpDeskData} state={state} setState={setState} />,
    },
    {
      key: "2",
      label: `Unassigned`,
      children: loading ? <Loader /> : <UnassignedData tableData={newHelpDeskData} />,
    },
    {
      key: "3",
      label: `Assigned`,
      children: loading ? <Loader /> : <AssignedData tableData={newHelpDeskData} />,
    },
    {
      key: "4",
      label: `Resolved`,
      children: loading ? <Loader /> : <ResolvedData tableData={newHelpDeskData} state={state} setState={setState} />,
    },
  ];

  const handleTabChange = (activeKey: any) => {
    setActiveTab({ ...activeTab, id: activeKey })
    switch (activeKey) {
      case '1': return setactivelabel(null)
      case '2': return setactivelabel('UNASSIGNED')
      case '3': return setactivelabel('ASSIGNED')
      case '4': return setactivelabel('RESOLVED')
      default: return setactivelabel(null)
    }
  }

  const handleClick = () => {
    setOpenDrawer(true);
  };

  const handleChangeSelect = (value: string) => {
    setState({ ...state, priority: value })
  };

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser.filter((user: any) => user.id !== id));
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser.find((u: any) => u.id === user.id)
      ? true
      : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
    }
  };

  const downloadPdfCsv = () => {
    if (activeTab === "1") {
      return tableDataAll
    } else if (activeTab === "2") {
      return tableDataUnassigned
    } else if (activeTab === "3") {
      return tableDataAssigned
    } else if (activeTab === "4") {
      return tableDataResolved
    } else {
      null
    }
  }

  const filterApplyHandler = () => {
    getHelpDeskList(activelabel, state)
  }
  const resetHandler = () => {
    setState({
      ...state,
      priority: null,
      issueType: null,
      date: null,
      status: null
    })
  }

  return (
    <div className="help-desk">
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Issue Type</label>
          <div className="mt-2">
            <Select
              placeholder="Select"
              className="w-[100%]"
              value={state.issueType}
              onChange={(value: any) => setState({ ...state, issueType: value })}
              options={issueTypeOptions}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Priority</label>
          <div className="mt-2 ">
            <Select
              placeholder="Select"
              className="w-[100%]"
              value={state.priority}
              onChange={handleChangeSelect}
              options={priorityOptions}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Date</label>
          <CommonDatePicker
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
            setValue={(val: any) => setState({ ...state, date: val })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Status</label>
          <div className="mt-2">
            <Select
              placeholder="Select"
              className="w-[100%]"
              value={state.status}
              onChange={(val: any) => setState({ ...state, status: val })}
              options={statusOptions}
            />
          </div>
        </div>

        <div>
          {filterData.map((item: any, index) => {
            return (
              <div key={index}>
                <div className="mb-2 text-primary-color font-medium text-base">
                  {item.title}
                </div>
                <div className="flex flex-wrap mb-6">
                  {item.userRole.map((items: any, index: any) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setState({ ...state, selectedRole: items.toUpperCase() })}
                        className={`
                        bg-red rounded-xl text-sm
                        font-normal p-1 pr-3 pl-3
                        mr-2 mb-2 cursor-pointer
                        ${items.toUpperCase() === state.selectedRole && 'text-input-bg-color'}`}
                      >
                        {items}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="mb-2 text-teriary-color font-medium text-base">
            Assigned To
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {assignUser.map((user) => (
              <div className="flex items-center text-sm font-normal gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                {user.name}
                <CloseCircleFilled
                  style={{ color: "#A3AED0", fontSize: "20px" }}
                  onClick={() => handleRemoveUser(user.id)}
                />
              </div>
            ))}
          </div>

          <BoxWrapper className="border-2">
            <div className="mb-4">
              <SearchBar size="small" handleChange={() => { }} />
            </div>
            <div className="assign-users h-52">
              {drawerAssignToData.map((item: any, index: any) => {
                return (
                  <div className="flex justify-between mb-8 ">
                    <div key={index} className="flex">
                      <div className="mr-2">
                        <img src={item.avatar} alt="icon" />
                      </div>
                      <div className="text-secondary-color text-base font-normal">
                        {item.name}
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddUser(item)}
                      className="cursor-pointer light-grey-color text-xs"
                    >
                      {item.btn}
                    </div>
                  </div>
                );
              })}
            </div>
          </BoxWrapper>
        </div>

        <div className="mt-4 justify-end flex">
          <Button
            onClick={resetHandler}
            className="activity-log-drawer-reset-btn teriary-color hover:teriary-color mr-4 w-28">
            Reset
          </Button>
          <Button
            onClick={filterApplyHandler}
            className="activity-log-drawer-apply-btn teriary-bg-color hover:white-color white-color w-28">
            Apply
          </Button>
        </div>
      </Drawer>

      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="text-2xl font-semibold primary-color">Help Desk</div>
        </Col>

        <Divider />

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[20, 20]}>
            <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
              <SearchBar placeholder="Search by subject" size="middle" handleChange={(e: any) => setState({ ...state, search: e })} />
            </Col>

            <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
              <FiltersButton label="Filter" onClick={handleClick} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { action.downloadPdfOrCsv(event, csvAllColum, downloadPdfCsv(), "Help Desk Detail") }}
              />
            </Col>

            <Col xs={24}>
              <BoxWrapper>
                <AppTabs items={items} onChange={handleTabChange} />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HelpDesk;
