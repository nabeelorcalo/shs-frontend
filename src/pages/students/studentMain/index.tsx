import { useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, ToggleButton, DropDown, CommonDatePicker } from "../../../components";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, More, TableViewIcon } from "../../../assets/images"
import { MenuProps, Row, Col } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "../actionHandler";
import "./style.scss";

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
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      overlayStyle={{ width: 180 }}
    >
      <More />
    </Dropdown>
  );
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const StudentMain = () => {
  const action = useCustomHook()
  // const navigate = useNavigate()
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [month, setMonth] = useState("")
  // const [showDrawer, setShowDrawer] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  const [state, setState] = useState({
    time_period: ""
  })

  const csvAllColum = ["No", "Name", "Title", "Company Rep", "Date of Joining"]

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "avatar",
      key: "avatar",
      title: "Avatar",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "companyrep",
      key: "companyrep",
      title: "Company Rep",
    },
    {
      dataIndex: "date_of_joining",
      key: "date_of_joining",
      title: "Date of Joining",
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
      name: "Deing Jing Me",
      title: "Business Analyst",
      companyrep: "Anika john",
      company: "Power source",
      date_of_joining: "01/07/2022",
    },
    {
      no: "02",
      name: "Ronald Richard",
      title: "Scientist Analyst",
      companyrep: "Borsa Lewa",
      company: "CodingHub",
      date_of_joining: "01/07/2021",
    },
    {
      no: "02",
      name: "Selan Klien",
      title: "Scientist Analyst",
      companyrep: "Pablo pau",
      company: "Dev spot",
      date_of_joining: "01/07/2021",
    },
    {
      no: "01",
      name: "Deing Jing Me",
      title: "Business Analyst",
      companyrep: "Anika john",
      company: "Orcalo Holdings",
      date_of_joining: "01/07/2022",
    },
    {
      no: "02",
      name: "Ronald Richard",
      title: "Scientist Analyst",
      companyrep: "Borsa Lewa",
      company: "Dev spot",
      date_of_joining: "01/07/2021",
    },
    {
      no: "02",
      name: "Selan Klien",
      title: "Scientist Analyst",
      companyrep: "Pablo pau",
      company: "CodingHub",
      date_of_joining: "01/07/2021",
    },
  ];
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        avatar:
          <Avatar
            src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
          />,
        name: item.name,
        title: item.title,
        companyrep: item.companyrep,
        company: item.company,
        date_of_joining: item.date_of_joining,
        actions: <PopOver />
      }
    )
  })
  const updateTimePeriod = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      time_period: value
    }))
  }
  return (
    <>
      <PageHeader title="Students"/>
      <Row gutter={[20,20]} className="mt-5">
        <Col xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={() => { }}
            name="search bar"
            placeholder="Search"
            size="middle"
          />
        </Col>
        <Col xl={18} lg={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-wrap gap-4 justify-end">
              <CommonDatePicker
                name="Date Picker"
                open={openDatePicker}
                onBtnClick={() => { console.log("date picker clicked") }}
                setOpen={setOpenDatePicker}
                setValue={function noRefCheck() { }}
              />
              <DropDown
                name="this month"
                options={[
                  'This week',
                  'Last week',
                  'This month',
                  'Last month',
                  'All'
                ]}
                setValue={() => { updateTimePeriod(event) }}
                showDatePickerOnVal="custom"
                value={state.time_period}
              />
            <div className="flex justify-between gap-4">
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

                  action.downloadPdfOrCsv(event, csvAllColum, tableData, "Activity Log Detail")
                }}
                value=""
              />
            </div>
        </Col>
        <Col xs={24}>
        {
            listandgrid ? <div className="flex flex-row flex-wrap max-sm:flex-col">
              {
                newTableData.map((items: any, idx: any) => {
                  return (
                    <InternsCard
                      posted_by={items.avatar}
                      title={items.name}
                      department={items.title}
                      joining_date={items.date_of_joining}
                      date_of_birth={items.companyrep}
                      company={items.company}
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
                />
              </BoxWrapper>
          }
        </Col>
      </Row>
    </>
  );
};

export default StudentMain;
