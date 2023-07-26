import { useEffect, useState } from "react";
import { Button, Col, Divider, Menu, Row, Select, Space, TabsProps, Tooltip, Avatar, Checkbox } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton, Loader, } from "../../../components";
import AppTabs from "../../../components/Tabs";
import AllData from "./allData";
// import ResolvedData from "./Resolved";
// import AssignedData from "./AssignedData";
// import UnassignedData from "./UnassignedData";
import Drawer from "../../../components/Drawer";
import { CloseCircleFilled } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
import useCustomHook from '../actionHandler';
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import PriorityDropDown from "./priorityDropDown/priorityDropDown";
import dayjs from "dayjs";
import constants from "../../../config/constants";
import "./style.scss";
import { Flag } from "../../../assets/images";

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
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
    isFlaged: false,
    details: null,
    selectedRole: null,
    editStatus: null,
    assignedTo: [],
    assign: null,
  })

  const csvAllColum = ["ID", "Subject", "Type", "ReportedBy", "Role", "Priority", "Date", "Assigned", "Status"]
  const { getHelpDeskList,
    helpDeskList,
    getHistoryDetail,
    getRoleBaseUser,
    roleBaseUsers,
    loading,
    downloadPdfOrCsv,
    EditHelpDeskDetails,
  }: any = useCustomHook();

  useEffect(() => {
    getHelpDeskList(activelabel, state)
    getRoleBaseUser()
  }, [activelabel, state.search])

  const handleHistoryModal = (id: any) => {
    setState({ ...state, history: true })
    getHistoryDetail(id)
  }

  const handleDetailsModal = (item: any) => {
    setState({ ...state, openModal: true, details: item })
  }

  const handleAddFlag = (item: any) => {
    EditHelpDeskDetails(item.id, activelabel, item.priority, item.status, item.type, null, "true")
  }

  const handleUnFlag = (item: any) => {
    EditHelpDeskDetails(item.id, activelabel, item.priority, item.status, item.type, null, "false")
  }

  const menu2 = (item: any) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => handleDetailsModal(item)}>
          View Details
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => item.isFlaged ? handleUnFlag(item)
            :
            handleAddFlag(item)}>
          {item.isFlaged ? 'Un' : 'Add'} Flag</Menu.Item>
        <Menu.Item key="4" onClick={() => handleUnAssign(item)}>Unassign</Menu.Item>
        <Menu.Item key="5" onClick={() => handleHistoryModal(item.id)}>History</Menu.Item>
      </Menu >
    )
  }

  const priorityOptions = [
    { value: "LOW", label: 'Low' },
    { value: "MEDIUM", label: 'Medium' },
    { value: "HIGH", label: 'High' },
    { value: "HIGHEST", label: 'Highest' }
  ]
  const handleUnAssign = (item: any) => {
    EditHelpDeskDetails(item.id, item.priority, item.status, item.type, [''])
  }

  const newHelpDeskData = helpDeskList !== 'No Data Found' && helpDeskList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        ID: helpDeskList.length < 10 ? `0${index + 1}` : index + 1,
        Subject: <>
          {item.isFlaged && <Flag />}
          {item.subject}
        </>,
        Type: item?.type?.toLowerCase()?.replace("_", " "),
        ReportedBy: `${item.reportedBy?.firstName} ${item?.reportedBy?.lastName}`,
        Role: item?.reportedBy?.role?.toLowerCase().replace("_", " "),
        priority: <PriorityDropDown priorityOptions={priorityOption} activelabel={activelabel} activeId={item.id} activeValue={item.priority} />,
        Date: dayjs(item.date).format("DD/MM/YYYY"),
        status: <PriorityDropDown priorityOptions={statusOptions} activelabel={activelabel} activeId={item.id} activeValue={item.status} show={true} />,
        Assigned: item.assignedUsers?.length === 0 ? <span className="text-primary-disabled-color font-normal">Not Assigned</span>
          :
          item.assignedUsers?.length > 1 ? <Avatar.Group
            maxCount={1}
            size="small"
            className="flex items-center"
            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
          >
            <p className="mr-3">
              {`${item.assignedUsers[0]?.assignedTo.firstName} ${item.assignedUsers[0]?.assignedTo.lastName}`}
            </p>
            {item.assignedUsers?.slice(1)?.map((val: any) => {
              return <Tooltip placement="bottom">
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
      children: loading ? <Loader />
        :
        <AllData label={activelabel} pagination={helpDeskList.pagination} tableData={newHelpDeskData} state={state} setState={setState} />,
    },
    {
      key: "2",
      label: `Unassigned`,
      children: loading ? <Loader />
        :
        <AllData label={activelabel} tableData={newHelpDeskData} state={state} setState={setState} />,
    },
    {
      key: "3",
      label: `Assigned`,
      children: loading ? <Loader />
        :
        <AllData label={activelabel} tableData={newHelpDeskData} state={state} setState={setState} />,
    },
    {
      key: "4",
      label: `Resolved`,
      children: loading ? <Loader />
        :
        <AllData label={activelabel} tableData={newHelpDeskData} state={state} setState={setState} />,
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
      setState({ ...state, assignedTo: user.id })
    }
  };

  // const downloadPdfCsv = () => {
  //   if (activeTab === "1") {
  //     return tableDataAll
  //   } else if (activeTab === "2") {
  //     return tableDataUnassigned
  //   } else if (activeTab === "3") {
  //     return tableDataAssigned
  //   } else if (activeTab === "4") {
  //     return tableDataResolved
  //   } else {
  //     null
  //   }
  // }

  const filterApplyHandler = () => {
    getHelpDeskList(activelabel, state)
    setOpenDrawer(false)
  }
  const resetHandler = () => {
    setState({
      ...state,
      priority: null,
      issueType: null,
      date: null,
      status: null,
      isFlaged: false,
      selectedRole: null,
      assignedTo: null
    })
    setAssignUser([])
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
        <div className="mb-6">
          <Checkbox
            checked={state.isFlaged && true}
            onChange={(e) => setState({ ...state, isFlaged: e.target.checked })}>
            Is Flaged
          </Checkbox>
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
                {`${user.firstName} ${user.lastName}`}
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
              {roleBaseUsers.map((item: any, index: any) => {
                return (
                  <div className="flex justify-between mb-8 ">
                    <div key={index} className="flex">
                      <div className="mr-2">
                        <Avatar size='small' src={`${constants.MEDIA_URL}/${item?.profileImage?.mediaId}.${item?.profileImage?.metaData?.extension}`} >
                          <span className="text-sm">{`${item.firstName?.charAt(0)} ${item.lastName?.charAt(0)}`}</span>
                        </Avatar>
                      </div>
                      <div className="text-secondary-color text-base font-normal">
                        {`${item.firstName} ${item.lastName}`}
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddUser(item)}
                      className="cursor-pointer light-grey-color text-xs"
                    >
                      Add
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
              <FiltersButton label="Filters" onClick={handleClick} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { downloadPdfOrCsv(event, csvAllColum, newHelpDeskData, "Help Desk Detail") }}
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
