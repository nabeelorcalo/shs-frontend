import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  DropDown, SearchBar, GlobalTable, PageHeader,
  BoxWrapper, FiltersButton
} from "../../components";
import Drawer from "../../components/Drawer";
import { Avatar, Button, Dropdown, Row, Col } from "antd";
import type { MenuProps } from 'antd';
import { InternshipsIcon, More } from "../../assets/images";
import { ROUTES_CONSTANTS } from "../../config/constants";
import useCustomHook from "./actionHandler";
import "./style.scss";

const Internships = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    status: "",
    value: "",
    showDrawer: false,
    location: "",
    department: ""
  })
  const { getAllInternshipsData, internshipData, changeHandler,getDuplicateInternship } = useCustomHook();

  useEffect(() => {
    getAllInternshipsData(state.status)
  }, [])
  const handleDublicate=(id:any)=>{
    getDuplicateInternship(id)
  }
  console.log(internshipData);

  const PopOver = (props: any) => {
    const { id } = props
    console.log("my id is", id);

    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate(ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS, { state: id }) }}>
            View details
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => {handleDublicate(id) }}>
            Duplicate
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
        <More />
      </Dropdown>
    )
  }

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "posting_date",
      key: "posting_date",
      title: "Posting Date",
    },
    {
      dataIndex: "closing_date",
      key: "closing-_date",
      title: "Closing Date",
    },
    {
      dataIndex: "location",
      key: "location",
      title: "Location",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]

  const newTableData = internshipData.map((item: any, index: number) => {
    const postingDate = dayjs(item.createdAt).format('DD/MM/YYYY');
    const closingDate = dayjs(item.closingDate).format('DD/MM/YYYY');
    return (
      {
        no: index + 1,
        title: item.title,
        department: item.department.name,
        posting_date: postingDate,
        closing_date: closingDate,
        location: item.location ? item.location?.name : "___",
        status:
          <Button
            size="small"
            className={
              `${item.status === "PUBLISHED" ?
                `text-success-bg-color`
                :
                item.status === "PENDING" ?
                  `text-warning-bg-color`
                  :
                  item.status === "CLOSED" ?
                    `text-info-bg-color`
                    :
                    item.status === "REJECTED" ?
                      `text-error-bg-color`
                      : item.status === "DRAFT" ?
                        `text-secondary-bg-disabled-color` : `light-sky-blue-bg`
              }  
                text-[#fff] status-btn`
            }
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Button>,
        posted_by: <Avatar
          src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
        />,
        actions: <PopOver id={item.id} />
      }
    )
  })

  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }

  const updateLocation = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      location: value
    }))
  }

  const updateDepartment = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      department: value
    }))
  }

  return (
    <>
      <PageHeader title="Internships" bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={changeHandler} name="search bar" placeholder="Search" />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <FiltersButton
            label="Filters"
            onClick={handleDrawer}
          />
          <Drawer
            closable
            open={state.showDrawer}
            onClose={handleDrawer}
            title="Filters"
          >
            <React.Fragment key=".0">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                  <p>Location</p>
                  <DropDown
                    name="name"
                    options={[
                      "EidinBurg",
                      "Glasgow",
                      "London",
                      "Virtual",
                      "All"
                    ]}
                    setValue={() => { updateLocation(event) }}
                    showDatePickerOnVal="custom"
                    startIcon=""
                    value={state.location}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p>Department</p>
                  <DropDown
                    name="name"
                    options={[
                      "Business analyst",
                      "Research analyst",
                      "Accountant",
                      "Administrator",
                      "HR Cordinator",
                      "All"
                    ]}
                    setValue={() => { updateDepartment(event) }}
                    showDatePickerOnVal="custom"
                    startIcon=""
                    value={state.department}
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <Button type="default" size="middle" className="button-default-tertiary" onClick={() => navigate("#")}>Reset</Button>
                  <Button type="primary" size="middle" className="button-tertiary" onClick={() => navigate("#")}>Apply</Button>
                </div>
              </div>
            </React.Fragment>
          </Drawer>
          <Button
            type="primary"
            size="middle"
            icon={<InternshipsIcon />}
            className="button-tertiary"
            onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP); }}
          >
            New Internship
          </Button>
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <div className="Internships-table">
              <GlobalTable columns={columns} tableData={newTableData} />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </>
  );
};

export default Internships;
