import { useEffect, useState } from "react";
import {
  GlobalTable, SearchBar, PageHeader, BoxWrapper,
  InternsCard, ToggleButton, DropDown
} from "../../components";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, More, TableViewIcon } from "../../assets/images"
import { Col, MenuProps, Row,Spin } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";
import "./style.scss";

const Interns = () => {
  const [listandgrid, setListandgrid] = useState(false)
  const csvAllColum = ["No", "Title", "Department", "Joining Date", "Date of Birth"]
  const navigate = useNavigate();
  const { getAllInterns, getAllInternsData,changeHandler,
    downloadPdfOrCsv,isLoading } = useCustomHook()

  useEffect(() => {
    getAllInternsData()
  }, [])

  const PopOver = () => {
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
  
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Avatar",
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
 
  const newTableData = getAllInterns.map((item:any, index:number) => {
    const joiningDate = dayjs(item.joiningDate).format('DD/MM/YYYY');
    const dob = dayjs(item.userDetail?.DOB).format('DD/MM/YYYY');
    return (
      {
        no: getAllInterns.length<10?`0${index+1}`:`${index+1}`,
        posted_by:
          <Avatar  src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} />,
        name: <p>{item.userDetail?.firstName} {item.userDetail?.lastName}</p>,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob,
        actions: <PopOver />
      }
    )
  })
  return (
    <>
      <PageHeader title="Interns" />
      <Row gutter={[20, 20]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={changeHandler} name="search bar" placeholder="Search by name" />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
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
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Interns")
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
           {isLoading ? 
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
          :<Spin tip="Processing...." />}
        </Col>
      </Row>
    </>
  );
};

export default Interns;
