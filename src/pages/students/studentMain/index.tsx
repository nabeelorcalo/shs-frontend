import { useState } from "react";
import { GlobalTable, SearchBar,PageHeader,BoxWrapper,  InternsCard, ToggleButton, DropDown, CommonDatePicker} from "../../../components";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, More, TableViewIcon } from "../../../assets/images"
import { MenuProps } from 'antd';
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
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
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
  // const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)

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
  return (
    <>
      <PageHeader title="Students" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-xl:flex-col">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={() => { }}
              name="search bar"
              placeholder="Search"
              size="middle"
            />
          </div>
          <div className="flex flex-row max-xl:flex-col gap-4">
            <div className="flex flex-row max-sm:flex-col gap-4">
              <CommonDatePicker
                name="Date Picker"
                open={openDatePicker}
                onBtnClick={() => {console.log("date picker clicked")}}
                setOpen={setOpenDatePicker}
                setValue={function noRefCheck() { }}
              />
              <DropDown
                name="this month"
                options={[
                  'Power Source',
                  'DevSpot',
                  'Abacus',
                  'Orcalo Holdings',
                  'Coding Hub'
                ]}
                setValue={(e:any) => { setMonth(e.target.value) }}
                showDatePickerOnVal="custom"
                value={month}
              />
            </div>
            <div className="flex flex-row gap-4">
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
          </div>
        </div>

        <div className="pt-3">
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
    </>
  );
};

export default StudentMain;
