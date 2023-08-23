import { useEffect, useState } from "react";
import { Button, Col, Divider, Menu, Row, Select, Space, TabsProps, Tooltip, Avatar, Checkbox, TablePaginationConfig, Dropdown, MenuProps } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton, BoxWrapper, NoDataFound } from "../../../components";
import AppTabs from "../../../components/Tabs";
import AllData from "./allData";
import Drawer from "../../../components/Drawer";
import { CloseCircleFilled } from "@ant-design/icons";
import useCustomHook from '../actionHandler';
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import PriorityDropDown from "./priorityDropDown/priorityDropDown";
import dayjs from "dayjs";
import { Flag, More } from "../../../assets/images";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { getRoleBaseUsersData, helpDeskFilters, helpDeskPaginationState } from "../../../store";
import "./style.scss";

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
  const [tableParams, setTableParams]: any = useRecoilState(helpDeskPaginationState);
  const [filter, setFilter] = useRecoilState<any>(helpDeskFilters);
  const [loading, setLoading] = useState(false)
  const resetList = useResetRecoilState(helpDeskFilters);
  const resetTableParams = useResetRecoilState(helpDeskPaginationState);
  const [state, setState] = useState<any>({
    history: false,
    openModal: false,
  })

  const csvAllColum = ["ID", "Subject", "Type", "ReportedBy", "Role", "Priority", "Date", "Assigned", "Status"]
  const { getHelpDeskList,
    helpDeskData,
    getHistoryDetail,
    getRoleBaseUser,
    downloadPdfOrCsv,
    EditHelpDeskDetails,
  }: any = useCustomHook();

  const helpDeskList = helpDeskData?.data;
  const adminUsersList = useRecoilValue(getRoleBaseUsersData)
  const [selectArrayData, setSelectArrayData] = useState<any>(adminUsersList);

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getHelpDeskList(args, setLoading)
  }, [filter.search, filter.assigned, filter.page])

  useEffect(() => { getRoleBaseUser() }, [])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const handleHistoryModal = (id: any) => {
    setState({ ...state, history: true })
    getHistoryDetail(id)
  }

  const handleAddFlag = (item: any) => {
    let args = removeEmptyValues(filter)
    EditHelpDeskDetails(args, setLoading, item.id, item.priority, item.status, item.type, null, "true")
  }

  const handleUnFlag = (item: any) => {
    let args = removeEmptyValues(filter)
    EditHelpDeskDetails(args, setLoading, item.id, item.priority, item.status, item.type, null, "false")
  }

  const PopOver = (props: any) => {
    const { item } = props
    let items: MenuProps['items'] = [
      {
        key: "1",
        label: <a onClick={() => setState({ ...state, openModal: true, details: item })}>View Details</a>
      },
      {
        key: '2',
        label: <a onClick={() => item.isFlaged ? handleUnFlag(item)
          :
          handleAddFlag(item)}>{item.isFlaged ? 'Un' : 'Add'} Flag</a>
      },
      {
        key: "3",
        label: <a onClick={() => handleUnAssign(item)}>Unassign</a>,
      },
      {
        key: "4",
        label: <a onClick={() => handleHistoryModal(item.id)}>History</a>
      },
    ];



    if (item.assignedUsers?.length === 0) {
      items = items?.slice(0, 2)?.concat(items.slice(3))
      console.log("items are", items?.slice(0, 2));
    }

    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
      </Dropdown>
    )
  }

  const priorityOptions = [
    { value: "LOW", label: 'Low' },
    { value: "MEDIUM", label: 'Medium' },
    { value: "HIGH", label: 'High' },
    { value: "HIGHEST", label: 'Highest' }
  ]

  const handleUnAssign = (item: any) => {
    let args = removeEmptyValues(filter)
    EditHelpDeskDetails(args, setLoading, item.id, item.priority, item.status, item.type, [''])
  }
  
  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      page: current,
    }));
  };

  const newHelpDeskData = helpDeskList !== 'No Data Found' && helpDeskList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        ID: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        Subject: <>
          {item.isFlaged && <Flag />}
          {item.subject}
        </>,
        Type: item?.type?.toLowerCase()?.replace("_", " ") ?? 'N/A',
        ReportedBy: `${item.reportedBy?.firstName} ${item?.reportedBy?.lastName}`,
        Role: item?.reportedBy?.role?.toLowerCase().replace("_", " "),
        priority: <PriorityDropDown
          args={removeEmptyValues(filter)}
          setLoading={setLoading}
          priorityOptions={priorityOption}
          activeId={item.id}
          activeValue={item.priority} />,

        Date: dayjs(item.date).format("DD/MM/YYYY"),

        status: <PriorityDropDown
          args={removeEmptyValues(filter)}
          setLoading={setLoading}
          priorityOptions={statusOptions}
          activelabel={filter.assigned}
          activeId={item.id}
          activeValue={item.status}
          setFilter={setFilter}
          filter={filter}
          show={true} />,
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
          <PopOver item={item} />
        </Space>
      }
    )
  })

  //for download
  const downloadPdfCsvData = helpDeskList !== 'No Data Found' && helpDeskList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        ID: index + 1,
        Subject: item.subject,
        Type: item?.type?.toLowerCase()?.replace("_", " ") ?? 'N/A',
        ReportedBy: `${item.reportedBy?.firstName} ${item?.reportedBy?.lastName}`,
        Role: item?.reportedBy?.role?.toLowerCase().replace("_", " "),
        priority: item.priority,
        Date: dayjs(item.date).format("DD/MM/YYYY"),
        Assigned: item.assignedUsers[0]?.assignedTo.firstName ?
          `${item.assignedUsers[0]?.assignedTo.firstName} ${item.assignedUsers[0]?.assignedTo.lastName}` : 'N/A',
        status: item.status,
      }
    )
  })

  const TabChildren = <AllData
    loading={loading}
    label={filter.assigned}
    tableParams={tableParams}
    pagination={tableParams?.pagination}
    tableData={newHelpDeskData}
    state={state}
    setState={setState}
    setLoading={setLoading}
    args={removeEmptyValues(filter)}
    pagesObj={helpDeskData?.pagination}
    handleTableChange={handleTableChange}
  />

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: TabChildren
    },
    {
      key: "2",
      label: `Unassigned`,
      children: TabChildren
    },
    {
      key: "3",
      label: `Assigned`,
      children: TabChildren
    },
    {
      key: "4",
      label: `Resolved`,
      children: TabChildren
    },
  ];

  const handleTabChange = (activeKey: any) => {
    setActiveTab({ ...activeTab, id: activeKey })
    switch (activeKey) {
      case '1': return setFilter({ ...filter, assigned: 'ALL', status: '' })
      case '2': return setFilter({ ...filter, assigned: 'UNASSIGNED', status: '' })
      case '3': return setFilter({ ...filter, assigned: 'ASSIGNED', status: '' })
      case '4': return setFilter({ ...filter, assigned: '', status: 'RESOLVED' })
      default: return setFilter({ ...filter, assigned: '', status: '' })
    }
  }

  const handleClick = () => {
    setOpenDrawer(true);
  };

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser.filter((user: any) => user.value !== id));
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser?.find((u: any) => u.value === user.value)
      ? true
      : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
      setFilter({ ...filter, assignedUsers: [...filter.assignedUsers, user?.value] })
    }
  };

  const filterApplyHandler = () => {
    let args = removeEmptyValues(filter)
    getHelpDeskList(args, setLoading)
    setOpenDrawer(false)
  }

  const resetHandler = () => {
    let args = removeEmptyValues(filter)
    args.priority = null,
      args.type = null,
      args.date = null,
      args.status = null,
      args.roles = [],
      args.isFlaged = false,
      args.assignedUsers = []
    getHelpDeskList(args, setLoading)
    setFilter({
      ...filter,
      priority: null,
      type: null,
      date: null,
      status: '',
      roles: [],
      isFlaged: false,
      assignedUsers: []
    })
    setAssignUser([])
  }

  const internsSearchHandler = (e: any) => {
    if (e.trim() === '') setSelectArrayData(adminUsersList)
    else {
      const searchedData = selectArrayData?.filter((emp: any) => emp?.label?.toLowerCase()?.includes(e))
      setSelectArrayData(searchedData)
    }
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
              value={filter.type}
              onChange={(value: any) => setFilter({ ...filter, type: value })}
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
              value={filter.priority}
              onChange={(value: any) => setFilter({ ...filter, priority: value })}
              options={priorityOptions}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Date</label>
          <CommonDatePicker
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
            setValue={(val: any) => setFilter({ ...filter, date: val })}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 text-teriary-color font-medium text-base">Status</label>
          <div className="mt-2">
            <Select
              placeholder='Select'
              className="w-[100%]"
              value={filter.status}
              onChange={(val: any) => setFilter({ ...filter, status: val })}
              options={statusOptions}
            />
          </div>
        </div>
        <div className="mb-6">
          <Checkbox
            checked={filter.isFlaged}
            defaultChecked={false}
            onChange={(e) => setFilter({ ...filter, isFlaged: e.target.checked })}
          >
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
                        onClick={() => setFilter({ ...filter, roles: items.toUpperCase() })}
                        className={`
                        bg-red rounded-xl text-sm
                        font-normal p-1 pr-3 pl-3
                        mr-2 mb-2 cursor-pointer
                        ${items.toUpperCase() === filter.roles && 'text-input-bg-color'}`}
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
            {assignUser?.map((user) => (
              <div className="flex items-center text-sm font-normal gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                {user?.label}
                <CloseCircleFilled
                  style={{ color: "#A3AED0", fontSize: "20px" }}
                  onClick={() => handleRemoveUser(user.value)}
                />
              </div>
            ))}
          </div>

          <BoxWrapper className="border-2">
            <div className="mb-4">
              <SearchBar size="small" handleChange={(e: any) => internsSearchHandler(e)} />
            </div>
            <div className="assign-users h-52">
              {selectArrayData?.length === 0 ? <NoDataFound /> : selectArrayData?.map((item: any, index: any) => {
                return (
                  <div className="flex items-center justify-between mb-8 ">
                    <div key={index} className="flex items-center">
                      <div className="mr-2">
                        <Avatar size='small' src={item?.avatar} >
                          <span className="text-sm">{item?.avatarPlaceholder}</span>
                        </Avatar>
                      </div>
                      <div className="text-secondary-color text-base font-normal">
                        {item?.label}
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
              <SearchBar placeholder="Search by subject" size="middle"
                handleChange={(e: any) => setFilter({ ...filter, search: e })} />
            </Col>

            <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
              <FiltersButton label="Filters" onClick={handleClick} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { downloadPdfOrCsv(event, csvAllColum, downloadPdfCsvData, "Help Desk Detail") }}
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
