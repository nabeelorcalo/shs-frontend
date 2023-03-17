import React, { useState } from "react";

import { DropDown, SearchBar,PageHeader,LeaveRequest ,FiltersButton} from "../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import GlobalTable from "../../components/Table/Table";
import { Avatar, Button, Popover, Divider } from 'antd';
import { More } from "../../assets/images"
import { InternshipsIcon } from "../../assets/images";

import EmojiEvaluation from "../../components/EmojiEvaluation";
import CreateFolderModal from "../../components/CreateFolderModal";
import EditGoalTask from "../../components/EditGoalTask";
import AddRequestMessage from "../../components/AddRequestMessage";
import SetaGoal from "../../components/SetaGoal";
import { PopUpModal } from "../../components/Model";
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";
import Drawer from "../../components/Drawer";
import SignatureAndUploadModal from "../../components/SignatureAndUploadModal";
import { STATUS_CONSTANTS } from "../../config/constants";

const { ACTIVE, PENDING, CLOSED, REJECTED } = STATUS_CONSTANTS

const PopOver = () => {
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" onClick={() => { navigate("view-internship-details") }}>
          View details
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" onClick={() => { navigate("view-internship-details") }}>
          Duplicate
        </a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  )
}

const Internships = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [state, setState] = useState(false)

  const columns = [
    {
      dataIndex: 'no',
      key: 'no',
      title: 'No.'
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title'
    },
    {
      dataIndex: 'department',
      key: 'department',
      title: 'Department'
    },
    {
      dataIndex: 'posting_date',
      key: 'posting_date',
      title: 'Posting Date'
    },
    {
      dataIndex: 'closing_date',
      key: 'closing-_date',
      title: 'Closing Date'
    },
    {
      dataIndex: 'location',
      key: 'location',
      title: 'Location'
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status'
    },
    {
      dataIndex: 'posted_by',
      key: 'posted_by',
      title: 'Posted By'
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]

  const tableData = [
    {
      no: "01",
      title: "Research Analyst",
      department: "Business Analyst",
      posting_date: "01/07/2022",
      closing_date: "01/07/2022",
      location: "virtual",
      status: 'pending',
      posted_by: 'T',

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'active',
      posted_by: 'U',

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'rejected',
      posted_by: 'U',

    }
  ]

  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        title: item.title,
        department: item.department,
        posting_date: item.posting_date,
        closing_date: item.closing_date,
        location: item.location,
        status:
          <Button
            size="small"
            className={`${item.status === ACTIVE ? `bg-[#4ED185]` : item.status === PENDING ? `bg-[#FFC15E]` : item.status === CLOSED ? `bg-[#4783FF]` : item.status === REJECTED ? `bg-[#D83A52]` : null}  text-[#fff]`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Button>,
        posted_by: <Avatar>{item.posted_by}</Avatar>,
        actions: <PopOver />
      }
    )
  })
  console.log(value)
  return (
    <>
      <PageHeader title="Internships" />
      <Divider />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <SearchBar
            className=""
            handleChange={() => { }}
            name="search bar"
            placeholder="search"
            size="middle"
          />
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => { setShowDrawer(true) }}
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => { setShowDrawer(false) }}
              title="Filters"
            >
              <React.Fragment key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Location</p>
                    <DropDown
                      name="name"
                      options={[
                        'EidinBurg',
                        'Glasgow',
                        'London',
                        'Virtual'
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
                      name="name"
                      options={[
                        'Business analyst',
                        'Research analyst',
                        'Accountant',
                        'Administrator',
                        'HR Cordinator'
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      size="middle"
                      className="flex gap-2 bg-[#fff] text-[#4A9D77]"
                      onClick={() => { navigate("new-internship"); }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="middle"
                      className="flex gap-2 bg-[#4A9D77] text-[#fff]"
                      onClick={() => { navigate("new-internship"); }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </Drawer>
            <Button
              size="middle"
              className="flex gap-2 bg-[#4A9D77] text-[#fff]"
              onClick={() => { navigate("new-internship"); }}
            >
              <InternshipsIcon />
              New Internship
            </Button>
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            <GlobalTable
              columns={columns}
              expandable={{
                expandedRowRender: () => { },
                rowExpandable: function noRefCheck() { }
              }}
              tableData={newTableData}
            />
          </div>
        </BoxWrapper>
      </div>
      <div className="flex gap-3 my-3">
        <SignatureAndUploadModal state={state} setState={setState} okBtntxt="Upload" cancelBtntxt="Cancel" width={600} />
        <LeaveRequest title="Leave Request" />
        <EmojiEvaluation title={`Performance Report - ${name}`} />
        <CreateFolderModal title="Create New Folder" />
        <EditGoalTask title="Edit Goal Task" />
        <AddRequestMessage title="Add Request Message" />
        <SetaGoal title="Set a Goal" />
      </div>
      <div className="flex gap-3 my-3">
        <PopUpModal
          title="Modal Title Customizable"
          width={800}
          state={false}
          okBtnFunc={() => { console.log("call back function called") }}
          cancelBtntxt="Cancel"
          okBtntxt="Submit"
        >
          <p>Write your JSX here / Import Components</p>
        </PopUpModal>
      </div>
    </>
  )
}

export default Internships