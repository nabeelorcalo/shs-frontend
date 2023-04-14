import React, { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  DropDown,
  FiltersButton,
  Drawer,
  PopUpModal,
  Alert
} from "../../../components";
import { TextArea } from "../../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../../assets/images"
import { Dropdown, Avatar, Button, MenuProps } from 'antd';
import useCustomHook from "./actionHandler";
// import Complete from "../complete";




const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const InternsCompanyAdmin = () => {
  const navigate = useNavigate()
  // const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  // const [state, setState] = useState(false)
  const [assignManager, setAssignManager] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const [complete, setComplete] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  // const [isToggle, setIsToggle] = useState(false)

  const action = useCustomHook()
  const csvAllColum = ["No", "Title", "Department", "Joining Date", "Date of Birth"]


  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      "Completed": "primary-bg-color",
      "Employed": "text-success-bg-color",
      "Terminated": "secondary-bg-color",
    }
    return (
      <p>
        <span
          className={`px-2 py-1 rounded-lg white-color ${btnStyle[props.status]}`}
        >
          {props.status}
        </span>
      </p>
    )
  }

  const PopOver = () => {
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setAssignManager(true)
            }}
          >
            Assign Manager
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setTerminate(true)
            }}
          >
            Terminate
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setComplete(true)
            }}
          >
            Complete Internship
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
        <More />
      </Dropdown>
    );
  };

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "joining_date",
      key: "joining_date",
      title: "Joining Date",
    },
    {
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      title: "Date of Birth",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
    },
  ];
  const tableData = [
    {
      no: "01",
      name: "Maria Sanoid",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Terminated"
    },
    {
      no: "02",
      name: "Andrea Hiyahiya",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Terminated"
    },
    {
      no: "02",
      name: "Binaca Lalema",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed"
    },
    {
      no: "01",
      name: "Cody Nguyen",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Completed"
    },
    {
      no: "02",
      name: "Kristin Warren",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Employed"
    },
    {
      no: "02",
      name: "Mino Marina",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Terminated"
    },
    {
      no: "01",
      name: "Tom Hanks",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Employed"
    },
    {
      no: "02",
      name: "Wade Johnson",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Terminated"
    },
    {
      no: "02",
      name: "Julia Roberts",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Employed"
    }
  ];
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        posted_by:
          <Avatar
            src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
          />,
        name: item.name,
        department: item.department,
        joining_date: item.joining_date,
        date_of_birth: item.date_of_birth,
        status: <ButtonStatus status={item.status} />,
        actions: <PopOver />
      }
    )
  })



  return (
    <>
      <PageHeader title="Interns" />
      <div className="flex flex-col gap-5 intern-main">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={() => { }}
              name="search bar"
              placeholder="Search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4 right-sec">
            <FiltersButton
              label="Filters"
              onClick={() => {
                setShowDrawer(true);
              }}
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters"
            >
              <React.Fragment key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Manager</p>
                    <DropDown
                      name="Select"
                      options={["David miller", "Amila Clark", "Maria sanaid", "Mino Marino"]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Status</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Employed",
                        "Completed",
                        "Terminated",
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Department</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Business analyst",
                        "Research analyst",
                        "Accountant",
                        "Administrator",
                        "HR Cordinator",
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>University</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Power source",
                        "Dev spot",
                        "Abacus",
                        "Orcalo Holdings",
                        "Coding Hub",
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Joining Date</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Power source",
                        "Dev spot",
                        "Abacus",
                        "Orcalo Holdings",
                        "Coding Hub",
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle" className="button-default-tertiary" onClick={() => { }}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary" onClick={() => { }}>Apply</Button>
                  </div>
                </div>
              </React.Fragment>
            </Drawer>
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => { setListandgrid(!listandgrid) }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, tableData, "Company Admin Interns")
              }}
              value=""
            />
          </div>
        </div>

        <div className="pt-3">
          <p className="font-semibold pb-4">Total Interns: 40</p>
          {
            listandgrid ? <div className="flex flex-row flex-wrap max-sm:flex-col">
              {
                newTableData.map((items: any, idx: any) => {
                  return (
                    <InternsCard
                      pupover={<PopOver />}
                      statusBtn={items.status}
                      name={items.name}
                      posted_by={items.posted_by}
                      title={items.title}
                      department={items.department}
                      joining_date={items.joining_date}
                      date_of_birth={items.date_of_birth}
                    />
                  )
                })
              }
            </div>
              :
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  expandable={{
                    expandedRowRender: () => { },
                    rowExpandable: function noRefCheck() { }
                  }}
                  tableData={newTableData}
                />
              </BoxWrapper>
          }
        </div>

      </div>
      <PopUpModal
        open={assignManager}
        width={600}
        close={() => { setAssignManager(false) }}
        title="Assign Manager"
        children={
          <div className="flex flex-col gap-2">
            <p>Manager</p>
            <DropDown
              name="Select"
              options={[
                "Maria Sanoid",
                "Jenate Samson",
                "Alen Juliet",
              ]}
              setValue={() => { }}
              showDatePickerOnVal="custom"
              startIcon=""
              value=""
            />
          </div>
        }
        footer={
          <>
            <Button type="default" size="middle" className="button-default-tertiary" onClick={() => setAssignManager(false)}>Cancel</Button>
            <Button type="primary" size="middle" className="button-tertiary">Assign</Button>
          </>
        }
      />
      <Alert
        width={600}
        type="error"
        state={terminate}
        setState={setTerminate}
        okBtntxt="Terminate"
        cancelBtntxt="Cancel"
        children={
          <div style={{ height: '50vh' }}>
            <p>Are you sure you want to terminate this intern?</p>
            <div>
              <p className="text-md">Reason</p>
              <TextArea
                rows={3}
                placeholder="write your reason"
                disable={false}
              />
            </div>
          </div>
        }
        footer={
          <>
            <Button type="default" size="middle" className="button-default-error" onClick={() => setTerminate(false)}>Cancel</Button>
            <Button type="primary" size="middle" className="button-error">Terminate</Button>
          </>
        }
      />
      <Alert
        width={700}
        type="success"
        state={complete}
        setState={setComplete}
        okBtntxt="Complete"
        cancelBtntxt="Cancel"
        children={
          <>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
          </>
        }
        footer={
          <>
            <Button type="default" size="middle" className="button-default-tertiary" onClick={() => setComplete(false)}>Cancel</Button>
            <Button type="primary" size="middle" className="button-tertiary" onClick={() => { alert("hello") }}>Complete</Button>
          </>
        }
      />
    </>
  );
};

export default InternsCompanyAdmin;
