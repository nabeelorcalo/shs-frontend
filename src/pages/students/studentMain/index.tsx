import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  GlobalTable,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  DropDown,
  NoDataFound,
  Notifications,
  SearchBar,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import {
  CardViewIcon,
  More,
  TableViewIcon,
  CalendarIcon,
} from "../../../assets/images";
import { MenuProps, Row, Col, DatePicker, TablePaginationConfig } from "antd";
import { Dropdown, Avatar, Select } from "antd";
import useStudentsCustomHook from "../actionHandler";
import { companiesListState, currentUserState, universityInternFilterState, universityInternPagginationState } from "../../../store";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import type { DatePickerProps } from "antd";
import constants from "../../../config/constants";
import "./style.scss";

const StudentMain = () => {
  const [listandgrid, setListandgrid] = useState(false);

  // Table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(universityInternPagginationState);
  const [filter, setFilter] = useRecoilState(universityInternFilterState);
  const resetList = useResetRecoilState(universityInternFilterState);
  const resetTableParams = useResetRecoilState(universityInternPagginationState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };

  const [currentUser] = useRecoilState(currentUserState);
  const companies = useRecoilValue(companiesListState);

  const csvAllColum = [
    "No",
    "Name",
    "Title",
    "Company Rep",
    "Company",
    "Date of Joining",
  ];

  const {
    getUniInternsTableData,
    allUniversityInternsData,
    downloadPdfOrCsv,
    getCompaniesData,
    getProfile,
  } = useStudentsCustomHook();

  const uniId = currentUser?.userUniversity?.id;

  useEffect(() => {
    let args = removeEmptyValues(filter);
    args.page = listandgrid ? args.page : 1;
    args.limit = listandgrid ? 10 : 1000;
    getCompaniesData(uniId);
    getUniInternsTableData(uniId, args, setLoading);
  }, [filter.search, filter.page, listandgrid, filter.companyId, filter.joiningDate]);

  // to reset page 
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const universityIntersData = allUniversityInternsData?.data

  const PopOver = (props: any) => {
    const { details } = props;
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              getProfile(details?.userId);
            }}
          >
            Profile
          </a>)
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              navigate(`chat/${details?.id}`);
            }}
          >
            Chat
          </a>
        )
      },
    ];
    return (
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
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
      title: <div className="text-center">Actions</div>,
    },
  ];

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = universityIntersData?.map((item: any, index: any) => {
    const dateOfJoining = dayjs(item?.joiningDate)?.format("DD/MM/YYYY");
    return {
      id: index + 1,
      no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
      avatar: (
        <Avatar
          size={50}
          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
        >
          {item?.userDetail?.firstName?.charAt(0)}
          {item?.userDetail?.lastName?.charAt(0)}
        </Avatar>
      ),
      name: `${item?.userDetail?.firstName}${item?.userDetail?.lastName}`,
      title: item?.internship?.title,
      companyrep: item?.company?.ownerName,
      company: item?.company?.businessName,
      date_of_joining: dateOfJoining,
      actions: <PopOver details={item} />,
    };
  });

  const downloadCSVFile = universityIntersData?.map(
    (item: any, index: number) => {
      const dateOfJoining = dayjs(item?.joiningDate)?.format("DD/MM/YYYY");
      return {
        id: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
        name: `${item?.userDetail?.firstName}${item?.userDetail?.lastName}`,
        title: item?.internship?.title,
        companyrep: item?.company?.ownerName,
        company: item?.company?.businessName,
        date_of_joining: dateOfJoining,
      };
    }
  );

  const onDateChange: DatePickerProps["onChange"] = (date: any) => {
    setFilter({
      ...filter,
      joiningDate: date,
    });
  };

  const handleProfile = (item: any) => {
    getProfile(item?.userId);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <>
      <PageHeader title="Students" />
      <Row gutter={[20, 20]} className="mt-5 students-main">
        <Col xl={6} lg={6} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            className="search-bar"
            placeholder="Search by name"
            handleChange={(e: any) => setFilter({ ...filter, search: e })}
          />
        </Col>
        <Col
          xl={18}
          lg={18}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col flex-wrap gap-4 justify-end"
        >
          <div>
            <DatePicker
              className="datePicker"
              placeholder="Joining"
              suffixIcon={
                <img
                  height={20}
                  width={20}
                  src={CalendarIcon}
                  alt="calander_icon"
                />
              }
              onChange={onDateChange}
              value={filter.joiningDate}
              format="DD/MM/YYYY"
              inputReadOnly={true}
            />
          </div>
          <div className="company">
            <Select
              className="w-full sm:w-[200px]"
              placeholder="Company"
              value={filter.companyId}
              options={companies}
              onChange={(event: any) => {
                setFilter({ ...filter, companyId: event });
              }}
            />
          </div>
          <div className="flex justify-between gap-4">
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => {
                setListandgrid(!listandgrid);
              }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className="w-[88px]"
            />
            <DropDown
              options={["PDF", "Excel"]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(
                  event,
                  csvAllColum,
                  downloadCSVFile,
                  "University Students"
                );
                Notifications({
                  title: "Success",
                  description: "Students list downloaded",
                  type: "success",
                });
              }}
              value=""
            />
          </div>
        </Col>
        <Col xs={24}>
          {
            listandgrid ? (
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  tableData={newTableData}
                  loading={loading}
                  pagination={tableParams?.pagination}
                  handleTableChange={handleTableChange}
                  pagesObj={allUniversityInternsData?.pagination}
                />
              </BoxWrapper>
            ) : universityIntersData?.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="flex flex-wrap gap-7">
                {universityIntersData?.map((item: any, index: number) => {
                  return (
                    <InternsCard
                      key={index}
                      id={item?.id}
                      item={item}
                      posted_by={
                        <Avatar
                          size={64}
                          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
                        >
                          {item?.userDetail?.firstName?.charAt(0)}
                          {item?.userDetail?.lastName?.charAt(0)}
                        </Avatar>
                      }
                      name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                      department={item?.internship?.title}
                      joining_date={`${dayjs(item?.joiningDate).format(
                        "DD/MM/YYYY"
                      )}`}
                      company_rep={item?.company?.ownerName}
                      company={item?.company?.businessName}
                      handleProfile={() => {
                        handleProfile(item);
                      }}
                    />
                  );
                })}
              </div>
            )
          }
        </Col>
      </Row>
    </>
  );
};

export default StudentMain;
