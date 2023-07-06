import { useEffect, useState } from "react";
import {
  GlobalTable, PageHeader, BoxWrapper,
  InternsCard, ToggleButton, DropDown, NoDataFound, Loader
} from "../../components";
import { Link, useNavigate } from 'react-router-dom';
import { CardViewIcon, GlassMagnifier, More, TableViewIcon } from "../../assets/images"
import { Col, MenuProps, Row, Input } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";



const Interns = () => {
  const [listandgrid, setListandgrid] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Date of Birth"];

  const { getAllInterns, getAllInternsData,
    downloadPdfOrCsv, debouncedSearch, isLoading }: any = useCustomHook()

  useEffect(() => {
    getAllInternsData(searchValue);
  }, [searchValue])

  const PopOver = (props: any) => {
    const { data } = props;
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <Link
            rel="noopener noreferrer"
            to={`${ROUTES_CONSTANTS.STUDENTPROFILE}/${data?.id}`}>
            Profile
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link
            rel="noopener noreferrer"
            to={`
            
            `}>
            Evaluate
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link
            rel="noopener noreferrer"
            to={`${ROUTES_CONSTANTS.CHAT}/${data?.id}`}>
            Chat
          </Link>
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
      title: "No.",
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

  const newTableData = getAllInterns?.map((item: any, index: number) => {
    const joiningDate = dayjs(item?.joiningDate)?.format('DD/MM/YYYY');
    const dob = dayjs(item?.userDetail?.DOB)?.format('DD/MM/YYYY');
    return (
      {
        key: index,
        no: getAllInterns?.length < 10 ? `0${index + 1}` : `${index + 1}`,
        posted_by:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
          >
            {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
          </Avatar>,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob,
        actions: <PopOver data={item} />
      }
    )
  })

  // handle search interns 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  return (
    <>
      <PageHeader title="Interns" />
      <Row gutter={[20, 20]}>
        <Col xl={6} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search by name"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <div className="flex justify-between gap-4">
            <DropDown
              options={[
                'PDF',
                'Excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Managers Interns")
              }}
            />
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => { setListandgrid(!listandgrid) }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />

          </div>
        </Col>
        <Col xs={24}>
          {isLoading ?
            !listandgrid ?
              getAllInterns?.length === 0 ? <NoDataFound /> : <div className="flex flex-wrap gap-5">
                {
                  getAllInterns?.map((item: any, index: any) => {
                    return (
                      <InternsCard
                        key={index}
                        item={item}
                        id={item?.id}
                        // statusBtn={item?.status}
                        name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                        posted_by={<Avatar size={64}
                          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}>
                          {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
                        </Avatar>}
                        // title={item?.title}
                        department={item?.internship?.department?.name}
                        joining_date={dayjs(item?.createdAt)?.format('DD/MM/YYYY')}
                        date_of_birth={dayjs(item?.userDetail?.DOB)?.format('DD/MM/YYYY')}
                        pupover={<PopOver data={item} />}
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
            : <Loader />}
        </Col>
      </Row>
    </>
  );
};

export default Interns;
