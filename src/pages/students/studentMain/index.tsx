import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader, BoxWrapper, InternsCard,
  ToggleButton, DropDown, NoDataFound, Loader
} from "../../../components";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, GlassMagnifier, More, TableViewIcon, CalendarIcon } from "../../../assets/images"
import { MenuProps, Row, Col, Input, DatePicker } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useStudentsCustomHook from "../actionHandler";
import { currentUserState } from '../../../store';
import { useRecoilState } from "recoil";
import UserSelector from "../../../components/UserSelector";
import type { DatePickerProps } from 'antd';
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


const StudentMain = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listandgrid, setListandgrid] = useState(false);
  const [states, setState] = useState({
    company: "Company",
    joiningDate: undefined
  })
  const [currentUser] = useRecoilState(currentUserState);
  const csvAllColum = ["No", "Name", "Title", "Company Rep", "Date of Joining"];

  const { getUniIntersTableData, universityIntersData,
    downloadPdfOrCsv, debouncedSearch, isLoading } = useStudentsCustomHook()

  useEffect(() => {
    getUniIntersTableData(currentUser?.userUniversity?.universityId, searchValue,
      states)
  }, [searchValue, states.company, states.joiningDate])

  console.log('interns data', universityIntersData);


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
  const newTableData = universityIntersData?.map((item: any, index: any) => {
    return (
      {
        no: universityIntersData?.length < 10 ? `0${index + 1}` : `${index + 1}`,
        avatar:
          <Avatar size={50} src={item?.avatar}>
            {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
          </Avatar>,
        name: `${item?.userDetail?.firstName}${item?.userDetail?.lastName}`,
        title: item?.internship?.title,
        companyrep: item?.userDetail?.firstName,
        company: item?.company?.businessName,
        date_of_joining: `${dayjs(item?.joiningDate).format('DD/MM/YYYY')}`,
        actions: <PopOver />
      }
    )
  })

  const handleSearch = (e: any) => {
    debouncedSearch(e.target.value, setSearchValue)
  };

  const companiesData = universityIntersData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: `${item?.company?.id}`,
        label: `${item?.company?.businessName}`,
      }
    )
  })

  const onDateChange: DatePickerProps['onChange'] = (date: any) => {
    setState({
      ...states,
      joiningDate: date
    })
  };
  return (
    <>
      <PageHeader title="Students" />
      <Row gutter={[20, 20]} className="mt-5">
        <Col xl={6} lg={6} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search by name"
            onChange={handleSearch}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} lg={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-wrap gap-4 justify-end">
          <div>
            <DatePicker
              placeholder="Joining"
              suffixIcon={<img height={20} width={20} src={CalendarIcon} alt="calander_icon" />}
              onChange={onDateChange}
              value={states.joiningDate}
              format='DD/MM/YYYY'
            />
          </div>
          <div>
            <UserSelector
              className=""
              placeholder="Company"
              value={states.company}
              onChange={(event: any) => {
                setState({
                  ...states,
                  company: event
                })
              }}
              options={companiesData}
            />
          </div>
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
                'PDF',
                'Excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "University Students")
              }}
              value=""
            />
          </div>
        </Col>
        <Col xs={24}>
          {!isLoading ?
            listandgrid ?
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  tableData={newTableData}
                />
              </BoxWrapper>
              : universityIntersData?.length === 0 ? <NoDataFound /> :
                <div className="flex flex-wrap gap-5">
                  {
                    universityIntersData?.map((items: any, idx: any) => {
                      return (
                        <InternsCard
                          posted_by={<Avatar size={50} src={items?.avatar}>
                            {items?.userDetail?.firstName?.charAt(0)}{items?.userDetail?.lastName?.charAt(0)}
                          </Avatar>}
                          title={`${items?.userDetail?.firstName}${items?.userDetail?.lastName}`}
                          department={items?.internship?.department?.name}
                          joining_date={`${dayjs(items?.joiningDate).format('DD/MM/YYYY')}`}
                          company_rep={items?.company?.ownerName}
                          company={items?.company?.businessName}
                        // id={items?.no}
                        />
                      )
                    })
                  }
                </div> : <Loader />

          }
        </Col>
      </Row>
    </>
  );
};

export default StudentMain;
