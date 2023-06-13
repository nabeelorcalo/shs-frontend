import { useEffect, useState } from "react";
import { Button, Col, Divider, Row } from "antd";
import {
  CommonDatePicker,
  DropDown, SearchBar,
  FiltersButton, Loader,
  BoxWrapper, GlobalTable,
  Drawer
} from "../../../components";
import useCustomHook from "../actionHandler"
import "./style.scss";
import dayjs from "dayjs";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "key",
    minWidth: 300,
  },
  {
    title: "Users",
    dataIndex: "Users",
    key: "Users",
  },
  {
    title: "User Role",
    dataIndex: "UserRole",
    key: "UserRole",
  },

  {
    title: "Activity",
    dataIndex: "Activity",
    key: "Activity",
  },
  {
    title: "Performed By",
    dataIndex: "PerformedBy",
    key: "PerformedBy",
  },
  {
    title: "Performer Role",
    dataIndex: "PerformerRole",
    key: "PerformerRole",
  },
  {
    title: "Date & Time",
    dataIndex: "DateTime",
    key: "Date&Time",
  },
];
const userRoles = ['Company Admin', 'Intern', 'Student', 'Company Manager'];
const activities = [
  'User Sign Up',
  'Addassement',
  'Create Internship',
  'Create Company Manager',
  'Intern Stage Change To Interviewes',
  'Intern Stage Change To Recommended']

const ActivityLog = () => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [state, setState] = useState<any>({
    search: '',
    role: '',
    activity: '',
    performerRole: '',
    dateTime: null,
    active: ''
  });
  const { loading, downloadPdfOrCsv, logDetails, getLogDetails } = useCustomHook();

  useEffect(() => {
    getLogDetails(state)
  }, [state.search])

  const resetHandler = () => {
    getLogDetails(null)
    setState({
      activity: '',
      role: '',
      performerRole: '', dateTime: null
    })
  }

  const logsTableData = logDetails?.map((item: any, index: number) => {
    const dateTime = dayjs(item.createdAt).format("DD/MM/YYYY, hh:mm A");
    return (
      {
        key: index,
        ID: logDetails?.length < 10 && `0 ${index + 1}`,
        Users: `${item?.user?.firstName} ${item?.user?.lastName}`,
        UserRole: item?.user?.role?.replace("_", " ").toLowerCase(),
        Activity: item?.activity,
        PerformedBy: `${item?.performedByuser?.firstName} ${item?.performedByuser?.lastName}`,
        PerformerRole: item?.performedByuser?.role?.replace("_", " ").toLowerCase(),
        DateTime: dateTime
      }
    )
  })

  return (
    <div className="activity-log">
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        <div className="mb-2 text-primary-color font-medium text-base">
          User Role
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {userRoles?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color capitalize rounded-xl text-sm font-normal cursor-pointer border-none py-0.5 px-3 ${state.role === item && state.active}`}
                value={item}
                onClick={() => setState({ ...state, role: item, active: 'active' })}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div className="mb-2 text-primary-color font-medium text-base">
          Activity
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {activities?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color capitalize rounded-xl text-sm font-normal cursor-pointer border-none py-0.5 px-3 ${state.activity === item && state.active}`}
                value={item}
                onClick={() => setState({ ...state, activity: item, active: 'active' })}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div className="mb-2 text-primary-color font-medium text-base">
          Performer Role
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {userRoles?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color capitalize rounded-xl text-sm font-normal cursor-pointer border-none py-0.5 px-3 ${state.performerRole === item && state.active}`}
                value={item}
                onClick={() => setState({ ...state, performerRole: item, active: 'active' })}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div>
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
            setValue={(e: any) => setState({ ...state, dateTime: e })}
          />
        </div>

        <div className="mt-4 justify-end flex">
          <Button onClick={resetHandler} className="activity-log-drawer-reset-btn teriary-color hover:teriary-color mr-4 w-28">
            Reset
          </Button>
          <Button onClick={() => { getLogDetails(state), setOpenDrawer(false) }} className="activity-log-drawer-apply-btn teriary-bg-color hover:white-color white-color w-28">
            Apply
          </Button>
        </div>
      </Drawer >

      <Row>
        <Col xs={24}>
          <div className="text-2xl font-semibold text-[#363565]">
            Activity Log
          </div>
        </Col>
        <Divider />
        <Col xs={24} className='logs-content'>
          <Row gutter={[20, 30]}>
            <Col xl={6} lg={9} md={24} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={(e: any) => setState({ ...state, search: e })} />
            </Col>

            <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
              <FiltersButton label="Filters" onClick={() => setOpenDrawer(true)} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { downloadPdfOrCsv(event, columns, logsTableData, "Activity Log Detail") }}
              />
            </Col>
            <Col xs={24}>
              <BoxWrapper>
                {loading ? <Loader /> :
                  <GlobalTable columns={columns} tableData={logsTableData} />
                }
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </div >
  );
};

export default ActivityLog;
