import { useEffect, useState } from "react";
import {
  GlobalTable, PageHeader, BoxWrapper,
  InternsCard, ToggleButton, DropDown, NoDataFound, Notifications, SearchBar
} from "../../components";
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, More, TableViewIcon } from "../../assets/images"
import { Col, MenuProps, Row, TablePaginationConfig } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ExternalChatUser, currentUserState, evaluatedUserDataState,
  internPaginationState, internsFilterState
} from "../../store";
import "./style.scss";

const { CHAT } = ROUTES_CONSTANTS;

const Interns = () => {
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const currentUser = useRecoilState(currentUserState);
  const [listandgrid, setListandgrid] = useState(false);
  const setEvaluatedUserData = useSetRecoilState(evaluatedUserDataState);
  // Table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(internPaginationState);
  const [filter, setFilter] = useRecoilState(internsFilterState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };

  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Date of Birth"];

  const { allInternsData, getAllInternsData,
    downloadPdfOrCsv, getProfile }: any = useCustomHook()

  useEffect(() => {
    let args = removeEmptyValues(filter);
    args.limit = listandgrid ? 10 : 1000;
    getAllInternsData(args, setLoading, currentUser[0]?.managerId);
  }, [filter.search, filter.page, listandgrid]);

  const PopOver = (props: any) => {
    const { data } = props;
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a rel="noopener noreferrer"
            onClick={() => getProfile(data?.userId)}>
            Profile
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a rel="noopener noreferrer"
            onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${data?.userId}`,
                { state: { from: 'fromInterns', data } });
              setEvaluatedUserData({
                name: `${data?.userDetail?.firstName} ${data?.userDetail?.lastName}`,
                avatar: `${constants.MEDIA_URL}/${data?.userDetail?.profileImage?.mediaId}.${data?.userDetail?.profileImage?.metaData.extension}`,
                role: data?.userDetail?.role,
                date: dayjs(data?.userDetail?.updatedAt).format("MMMM D, YYYY")
              })
            }}>
            Evaluate
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a rel="noopener noreferrer"
            onClick={() => { navigate(`${ROUTES_CONSTANTS.CHAT}/${data?.id}`) }}>
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

  const getAllInterns = allInternsData?.data

  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      completed: "primary-bg-color",
      employed: "text-success-bg-color",
      terminated: "secondary-bg-color",
    };
    return (
      <p>
        <span
          className={`px-2 py-1 rounded-lg white-color capitalize ${btnStyle[props.status]
            }`}
        >
          {props.status}
        </span>
      </p>
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
      title: <div className="text-center">Actions</div>,
    },
  ];

  const newTableData = getAllInterns?.map((item: any, index: number) => {
    const joiningDate = dayjs(item?.joiningDate)?.format('DD/MM/YYYY');
    const dob = dayjs(item?.userDetail?.DOB)?.format('DD/MM/YYYY');
    return (
      {
        key: index,
        no: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
        posted_by:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
          >
            {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
          </Avatar>,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob === 'Invalid Date' ? "N/A" : dob,
        actions: <PopOver data={item} />
      }
    )
  });

  const downloadCSVFile = getAllInterns?.map(
    (item: any, index: number) => {
      const joiningDate = dayjs(item?.joiningDate).format("DD/MM/YYYY");
      const dob = dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY");
      return {
        no: getAllInterns?.length < 10 ? `0${index + 1}` : index + 1,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob === 'Invalid Date' ? "N/A" : dob,
      };
    }
  );

  const handleProfile = (item: any) => {
    getProfile(item?.userId)
  }

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
      <PageHeader title="Interns" />
      <Row gutter={[20, 20]}>
        <Col xl={6} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            className="search-bar"
            placeholder="Search by name"
            handleChange={(e: any) => setFilter({ ...filter, search: e })}
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
                downloadPdfOrCsv(event, csvAllColum, downloadCSVFile, "Managers Interns");
                Notifications({
                  title: "Success",
                  description: "Intern list downloaded",
                  type: "success",
                });
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
          {
            !listandgrid ?
              getAllInterns?.length === 0 ? <NoDataFound /> : 
              <div className="flex flex-wrap gap-5">
                {
                  getAllInterns?.map((item: any, index: any) => {
                    return (
                      <InternsCard
                        key={index}
                        item={item}
                        id={item?.id}
                        status={<ButtonStatus status={item?.internStatus} />}
                        name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                        posted_by={<Avatar size={64}
                          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}>
                          {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
                        </Avatar>}
                        department={item?.internship?.department?.name}
                        joining_date={dayjs(item?.createdAt)?.format('DD/MM/YYYY')}
                        date_of_birth={dayjs(item?.userDetail?.DOB)?.format('DD/MM/YYYY')}
                        pupover={<PopOver data={item} />}
                        handleProfile={() => handleProfile(item)}
                        navigateToChat={() => {
                          setChatUser(item?.userDetail);
                          navigate(`${CHAT}/${item?.userId}`);
                        }}
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
                  loading={loading}
                  pagination={tableParams?.pagination}
                  handleTableChange={handleTableChange}
                  pagesObj={allInternsData?.pagination}
                />
              </BoxWrapper>
          }
        </Col>
      </Row>
    </>
  );
};

export default Interns;
