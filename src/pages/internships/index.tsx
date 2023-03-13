import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { SearchBar } from "../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import GlobalTable from "../../components/Table/Table";
import { Avatar, Button } from 'antd';
import { More } from "../../assets/images"
import { FilterIcon } from "../../assets/images";
import { ArrowToRight } from "../../assets/images";
import { InternshipsIcon } from "../../assets/images";





const Internships = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
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
      status: 'Pending',
      posted_by: 'T',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Active',
      posted_by: 'U',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Rejected',
      posted_by: 'U',
      actions: <More />

    },
    {
      no: "01",
      title: "Research Analyst",
      department: "Business Analyst",
      posting_date: "01/07/2022",
      closing_date: "01/07/2022",
      location: "virtual",
      status: 'Pending',
      posted_by: 'T',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Active',
      posted_by: 'U',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Rejected',
      posted_by: 'U',
      actions: <More />

    },
    {
      no: "01",
      title: "Research Analyst",
      department: "Business Analyst",
      posting_date: "01/07/2022",
      closing_date: "01/07/2022",
      location: "virtual",
      status: 'Pending',
      posted_by: 'T',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Active',
      posted_by: 'U',
      actions: <More />

    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      posting_date: "01/07/2023",
      closing_date: "01/07/2021",
      location: "Onsite",
      status: 'Rejected',
      posted_by: 'U',
      actions: <More />

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
        status: <Button
          size="small"
          style={{
            backgroundColor: item.status === "Active" ? '#4ED185' : item.status === "Pending" ? '#FFC15E' : item.status === "Closed" ? '#4783FF' : item.status === "Rejected" ? '#D83A52' : '#C4C4CA',
            color: '#fff',
            padding: "5px 20px"
          }}
        >
          {item.status}
        </Button>,
        posted_by: <Avatar>{item.posted_by}</Avatar>,
        actions: <More />
      }
    )
  })

  console.log(value)
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
        <div className="flex flex-row gap-4">
          <Button
            size="middle"
            onClick={() => { }}
            className="flex gap-2 bg-[#E6F4F9]"
            
          >
            <FilterIcon/>
            Filters
            <ArrowToRight/>
          </Button>
          <Button
            size="middle"
            className="flex gap-2 bg-[#4A9D77] text-[#fff]"
          onClick={()=>{navigate("new-internship");}}
          >
            <InternshipsIcon />
            New Internship
          </Button>
        </div>

      </div>
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


    </>
  )
}

export default Internships