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
  Loader,
  Notifications,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import {
  CardViewIcon,
  GlassMagnifier,
  More,
  TableViewIcon,
  CalendarIcon,
} from "../../../assets/images";
import { MenuProps, Row, Col, Input, DatePicker } from "antd";
import { Dropdown, Avatar, Select } from "antd";
import useStudentsCustomHook from "../actionHandler";
import { companiesListState, currentUserState } from "../../../store";
import { useRecoilState, useRecoilValue } from "recoil";
import type { DatePickerProps } from "antd";
import constants from "../../../config/constants";
import "./style.scss";

const StudentMain = () => {
  const [searchValue, setSearchValue] = useState("");
  const [listandgrid, setListandgrid] = useState(false);
  const [states, setState] = useState({
    company: undefined,
    joiningDate: undefined,
  });

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
    getUniIntersTableData,
    universityIntersData,
    downloadPdfOrCsv,
    debouncedSearch,
    isLoading,
    getProfile,
    getCompaniesData,
  } = useStudentsCustomHook();

  const uniId = currentUser?.userUniversity?.id;

  useEffect(() => {
    getCompaniesData(uniId);
    getUniIntersTableData(currentUser?.userUniversity?.id, searchValue, states);
  }, [searchValue, states.company, states.joiningDate]);

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
          </a>
        ),
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
        ),
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

  const newTableData = universityIntersData?.map((item: any, index: any) => {
    const dateOfJoining = dayjs(item?.joiningDate)?.format("DD/MM/YYYY");
    return {
      id: index + 1,
      no: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
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

  const handleSearch = (e: any) => {
    debouncedSearch(e.target.value, setSearchValue);
  };

  const onDateChange: DatePickerProps["onChange"] = (date: any) => {
    setState({
      ...states,
      joiningDate: date,
    });
  };

  const handleProfile = (item: any) => {
    getProfile(item?.userId);
  };

  return (
    <>
      <PageHeader title="Students" />
      <Row gutter={[20, 20]} className="mt-5 students-main">
        <Col xl={6} lg={6} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className="search-bar"
            placeholder="Search by name"
            onChange={handleSearch}
            prefix={<GlassMagnifier />}
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
              value={states.joiningDate}
              format="DD/MM/YYYY"
              inputReadOnly={true}
            />
          </div>
          <div className="company">
            <Select
              className="w-full sm:w-[200px]"
              placeholder="Company"
              value={states.company}
              options={companies}
              onChange={(event: any) => {
                setState({ ...states, company: event });
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
          {!isLoading ? (
            listandgrid ? (
              <BoxWrapper>
                <GlobalTable columns={columns} tableData={newTableData} />
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
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  );
};

export default StudentMain;
