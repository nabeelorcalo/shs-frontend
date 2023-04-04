import { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  DropDown,
  CommonDatePicker,
} from "../../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../../assets/images"
import { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';

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
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  );
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const StudentMain = () => {
  // const navigate = useNavigate()
  // const [value, setValue] = useState("")
  // const [showDrawer, setShowDrawer] = useState(false)
  // const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  console.log(isToggle)
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
      date_of_joining: "01/07/2022",
      location: "virtual",
      status: "Pending",
      avatar: "T",
    },
    {
      no: "02",
      name: "Ronald Richard",
      title: "Scientist Analyst",
      companyrep: "Borsa Lewa",
      date_of_joining: "01/07/2021",
      location: "Onsite",
      status: "Active",
      avatar: "U",
    },
    {
      no: "02",
      name: "Selan Klien",
      title: "Scientist Analyst",
      companyrep: "Pablo pau",
      date_of_joining: "01/07/2021",
      location: "Onsite",
      status: "Rejected",
      avatar: "U",
    },
    {
      no: "01",
      name: "Deing Jing Me",
      title: "Business Analyst",
      companyrep: "Anika john",
      date_of_joining: "01/07/2022",
      location: "virtual",
      status: "Pending",
      avatar: "T",
    },
    {
      no: "02",
      name: "Ronald Richard",
      title: "Scientist Analyst",
      companyrep: "Borsa Lewa",
      date_of_joining: "01/07/2021",
      location: "Onsite",
      status: "Active",
      avatar: "U",
    },
    {
      no: "02",
      name: "Selan Klien",
      title: "Scientist Analyst",
      companyrep: "Pablo pau",
      date_of_joining: "01/07/2021",
      location: "Onsite",
      status: "Rejected",
      avatar: "U",
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
        date_of_joining: item.date_of_joining,
        location: item.location,
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


            <SearchBar
              className=""
              handleChange={() => { }}
              name="search bar"
              placeholder="search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4">
            <CommonDatePicker
              name="Date Picker"
              onBtnClick={() => { }}
              setOpen={function noRefCheck() { }}
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
              setValue={() => { }}
              showDatePickerOnVal="custom"
              value=""
            />
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
              setValue={() => { }}
              value=""
            />
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            {
              listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                {
                  cardDummyArray.map((items: any, idx: any) => {
                    return (
                      <InternsCard />
                    )
                  })
                }
              </div>
                :
                <GlobalTable
                  columns={columns}
                  expandable={{
                    expandedRowRender: () => { },
                    rowExpandable: function noRefCheck() { }
                  }}
                  tableData={newTableData}
                />
            }
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default StudentMain;
