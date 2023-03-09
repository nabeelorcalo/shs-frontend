import { Button, Space } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { SearchBar } from "../../components";
import "./style.scss";
import { FileAddFilled } from "@ant-design/icons";
import GlobalTable from "../../components/Table/Table";
import { Alert } from "../../components";
import EmojiMoodRating from "../../components/EmojiMoodRating";

const Internships = () => {

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
      status:"active",

    },
    {
      Actions: 'fduhguisd',
      Position: 'gjdifsdu',
      Status: 'fjgvifd',
      company: 'kljdasfhuasd',
      dateApplied: '01/07 /2022',
      internshipType: 'nice',
      natureOfWork: 'asduhfuiyasdg',
      no: '02',
      typeOfWork: 'New York No. 1 Lake Park'
    }
  ]
  return (
    <>
      <PageHeader title="Internships" />
      <div className="flex flex-row justify-between">
        <SearchBar
          className=""
          handleChange={() => { }}
          name="search bar"
          placeholder="search"
          size="large"
        />
        <div>
          <Button
            label="Button"
            onClick={() => { }}
            type="primary"
          />
          <Button
            label="New Internshipsd"
            color="#4a9d77"
            icon={<FileAddFilled />}
            onClick={() => { }}
            size="middle"
            type="primary"
          />
        </div>

      </div>
      <div className="pt-3">
        <GlobalTable
          columns={columns}
          expandable={{
            expandedRowRender: () => { },
            rowExpandable: function noRefCheck() { }
          }}
          tableData={tableData}
        />
        <Alert showHide={true} type="warning"  okBtntxt="OK" cancelBtntxt="Cancel">
          <p>This is a placeholer text just to show the default size and weight for body text typography in a popup.</p>
        </Alert>
        <EmojiMoodRating title='How are you feeling today?'/>
      </div>


    </>
  )
}

export default Internships