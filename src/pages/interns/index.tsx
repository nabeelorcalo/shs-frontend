import { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  DropDown
} from "../../components";

import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, More, TableViewIcon } from "../../assets/images"
import { Col, MenuProps, Row } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "./actionHandler";

const PopOver = () => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("profile");
          }}
        >
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("chat");
          }}
        >
          Chat
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

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Interns = () => {
  // const navigate = useNavigate()
  // const [value, setValue] = useState("")
  // const [showDrawer, setShowDrawer] = useState(false)
  // const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)

  const action = useCustomHook()
  const csvAllColum = ["No", "Title", "Department", "Joining Date", "Date of Birth"]

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
    },
    {
      no: "02",
      name: "Andrea Hiyahiya",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "BBinaco Lalme",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "01",
      name: "Cody Nguyen",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
    },
    {
      no: "02",
      name: "Kristian Warren",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "Angel Loane",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "01",
      name: "Bessie Howard",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
    },
    {
      no: "02",
      name: "Adi Chen",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "Shira Chen",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
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
        actions: <PopOver />
      }
    )
  })
  return (
    <>
      <PageHeader title="Interns" />
      <div className="flex flex-col gap-5">
        <Row gutter={[20, 20]}>
          <Col xl={6} md={24} sm={24} xs={24}>
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search by name" size="middle" />
          </Col>
          <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <div className="flex gap-4 justify-between">
              {listandgrid ? <DropDown
                options={[
                  'pdf',
                  'excel'
                ]}
                requiredDownloadIcon
                setValue={() => {
                  action.downloadPdfOrCsv(event, csvAllColum, tableData, "Company Admin Interns")
                }}
                value=""
              /> : null}
              <ToggleButton
                isToggle={listandgrid}
                onTogglerClick={() => { setListandgrid(!listandgrid) }}
                FirstIcon={CardViewIcon}
                LastIcon={TableViewIcon}
                className='w-[88px]'
              />
              {!listandgrid ? <DropDown
                options={[
                  'pdf',
                  'excel'
                ]}
                requiredDownloadIcon
                setValue={() => {
                  action.downloadPdfOrCsv(event, csvAllColum, tableData, "Company Admin Interns")
                }}
                value=""
              /> : null}
            </div>
          </Col>
        </Row>
        <div className="pt-3">
          {
            !listandgrid ? <div className="flex flex-row flex-wrap max-sm:flex-col">
              {
                newTableData.map((items: any, idx: any) => {
                  return (
                    <InternsCard
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
                  tableData={newTableData}
                  hideTotal={true}
                />
              </BoxWrapper>
          }
        </div>


      </div>
    </>
  );
};

export default Interns;
