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
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../assets/images"
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
      name: "Research Analyst",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
    },
    {
      no: "02",
      name: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "01",
      name: "Research Analyst",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
    },
    {
      no: "02",
      name: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "01",
      name: "Research Analyst",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
    },
    {
      no: "02",
      name: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
    },
    {
      no: "02",
      name: "Business Analyst",
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
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search by name" size="middle" />
          </div>
          <div className="flex flex-row gap-4">
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
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => { setListandgrid(!listandgrid) }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />

          </div>
        </div>

        <div className="pt-3">
          {
            // className="flex flex-row flex-wrap gap-6"
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
                <GlobalTable columns={columns} tableData={newTableData} />
              </BoxWrapper>
          }
        </div>


      </div>
    </>
  );
};

export default Interns;
